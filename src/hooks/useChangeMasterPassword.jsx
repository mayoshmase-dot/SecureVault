import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";
import useVaultStore from "../store/useVaultStore";
import { decrypt, encrypt, safeParse, deriveAuthHash } from "../crypto";
import { useTranslation } from "react-i18next";

export default function useChangeMasterPassword() {
    const queryClient = useQueryClient();
    const setMasterPassword = useVaultStore((state) => state.setMasterPassword);
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async ({ currentPassword, newPassword }) => {
            const profileRes = await AuthAxiosInstance.get('/auth/me')
            const email = profileRes.data?.data?.email

            const kdfRes = await axiosInstance.get(`/auth/kdf-params/${email}`)
            const { masterPasswordSeed, kdfIterations } = kdfRes.data.data

            const currentAuthHash = await deriveAuthHash(currentPassword, masterPasswordSeed, kdfIterations)
            const newAuthHash = await deriveAuthHash(newPassword, masterPasswordSeed, kdfIterations)

            const credRes = await AuthAxiosInstance.get('/vault/credentials')
            const credentials = credRes.data?.data || []

            const reEncrypted = await Promise.all(
                credentials.map(async (cred) => {
                    try {
                        const res = await AuthAxiosInstance.get(`/vault/credentials/${cred._id}`)
                        const full = res.data?.data
                        const decryptedPassword = await decrypt(safeParse(full.password), currentPassword)
                        const decryptedUsername = await decrypt(safeParse(full.username), currentPassword)
                        const decryptedNotes = await decrypt(safeParse(full.notes), currentPassword)
                        return {
                            id: cred._id,
                            password: await encrypt(decryptedPassword, newPassword),
                            username: await encrypt(decryptedUsername, newPassword),
                            notes: await encrypt(decryptedNotes || '', newPassword)
                        }
                    } catch {
                        return null
                    }
                })
            )

            const response = await AuthAxiosInstance.put('/auth/change-password', {
                currentPassword: currentAuthHash,
                newPassword: newAuthHash
            })

            await Promise.all(
                reEncrypted
                    .filter(Boolean)
                    .map(({ id, password, username, notes }) =>
                        AuthAxiosInstance.put(`/vault/credentials/${id}`, {
                            password, username, notes
                        })
                    )
            )

            return response.data
        },

        onSuccess: (data, { newPassword }) => {
            setMasterPassword(newPassword)
            queryClient.invalidateQueries({ queryKey: ['credential'] })
            Swal.fire({
                icon: "success",
                title: t('Success'),
                text: data?.message || t('Update Password success'),
                confirmButtonColor: "#7c3aed",
                confirmButtonText: t('OK')

            })
        },

        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: t('Error'),
                text: error?.response?.data?.message || t('Something went wrong'),
                confirmButtonColor: "#dc2626"
            })
        }
    });
}