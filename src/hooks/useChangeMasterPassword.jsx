import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";
import useVaultStore from "../store/useVaultStore";
import { decrypt, encrypt, deriveAuthHash } from "../crypto";
import { useTranslation } from "react-i18next";
import useAuthStore from "../store/useAuthStore";

export default function useChangeMasterPassword() {
    const queryClient = useQueryClient();
    const { setMasterPassword, clearMasterPassword } = useVaultStore();
    const logout = useAuthStore((state) => state.logout);
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async ({ currentPassword, newPassword }) => {
            // 1. جيب الـ email
            const profileRes = await AuthAxiosInstance.get('/auth/me')
            const email = profileRes.data?.data?.email

            // 2. جيب الـ KDF params
            const kdfRes = await axiosInstance.get(`/auth/kdf-params/${email}`)
            const { masterPasswordSeed, kdfIterations } = kdfRes.data.data

            // 3. اشتق الـ hashes
            const currentAuthHash = await deriveAuthHash(currentPassword, masterPasswordSeed, kdfIterations)
            const newAuthHash = await deriveAuthHash(newPassword, masterPasswordSeed, kdfIterations)

            // 4. جيب كل الكريدنشلز وافك تشفيرهم بالقديم
            const credRes = await AuthAxiosInstance.get('/vault/credentials')
            const credentials = credRes.data?.data || []

            const reEncrypted = await Promise.all(
                credentials.map(async (cred) => {
                    try {
                        const res = await AuthAxiosInstance.get(`/vault/credentials/${cred._id}`)
                        const full = res.data?.data

                        const decryptedUsername = await decrypt(full.username, currentPassword).catch(() => '')
                        const decryptedPassword = await decrypt(full.password, currentPassword).catch(() => '')
                        const decryptedNotes = full.notes ? await decrypt(full.notes, currentPassword).catch(() => '') : ''

                        return {
                            id: cred._id,
                            title: full.title,
                            website: full.website || '',
                            category: full.category || 'Other',
                            tags: full.tags || [],
                            username: await encrypt(decryptedUsername, newPassword),
                            password: await encrypt(decryptedPassword, newPassword),
                            notes: decryptedNotes ? await encrypt(decryptedNotes, newPassword) : '',
                        }
                    } catch {
                        return null
                    }
                })
            )

            // 5. غير كلمة المرور بالـ backend
            const response = await AuthAxiosInstance.put('/auth/change-password', {
                currentPassword: currentAuthHash,
                newPassword: newAuthHash
            })

            // 6. حدّث كل الكريدنشلز بالتشفير الجديد
            await Promise.all(
                reEncrypted
                    .filter(Boolean)
                    .map(({ id, ...data }) =>
                        AuthAxiosInstance.put(`/vault/credentials/${id}`, data)
                    )
            )

            // 7. امسح كل الـ password history — مشفر بكلمة المرور القديمة
            await AuthAxiosInstance.delete('/vault/credentials/password-history/all')

            return response.data
        },

        onSuccess: (_, { newPassword }) => {
            setMasterPassword(newPassword)
            queryClient.invalidateQueries({ queryKey: ['credential'] })
            queryClient.invalidateQueries({ queryKey: ['vaultAudit'] })
            queryClient.invalidateQueries({ queryKey: ['passwordHistory'] })

            Swal.fire({
                icon: "success",
                title: t('Update!'),
                text: t('Credential updated successfully'),
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK'),
                background: 'rgb(1,6,46)',
                color: '#fff'
            }).then(() => {
                clearMasterPassword()
                logout()
            })
        },

        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: t('Error'),
                text: error?.response?.data?.message || t('Something went wrong'),
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK'),
                background: 'rgb(1,6,46)',
                color: '#fff'
            })
        }
    });
}