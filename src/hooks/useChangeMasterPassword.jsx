import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import Swal from "sweetalert2";
import useVaultStore from "../store/useVaultStore";
import { decrypt, encrypt, safeParse } from "../crypto";

export default function useChangeMasterPassword() {
    const queryClient = useQueryClient();
    const masterPassword = useVaultStore((state) => state.masterPassword);
    const setMasterPassword = useVaultStore((state) => state.setMasterPassword);

    return useMutation({
        mutationFn: async ({ currentPassword, newPassword }) => {

            const credRes = await AuthAxiosInstance.get('/vault/credentials')
            const credentials = credRes.data?.data || []

            const reEncrypted = await Promise.all(
                credentials.map(async (cred) => {
                    try {
                        const decryptedPassword = await decrypt(safeParse(cred.encryptedPassword), currentPassword)
                        const decryptedUsername = await decrypt(safeParse(cred.encryptedUsername), currentPassword)
                        const decryptedNotes = await decrypt(safeParse(cred.encryptedNotes), currentPassword)
                        const newEncryptedPassword = await encrypt(decryptedPassword, newPassword)
                        const newEncryptedUsername = await encrypt(decryptedUsername, newPassword)
                        const newEncryptedNotes = await encrypt(decryptedNotes || '', newPassword)

                        return {
                            id: cred._id,
                            encryptedPassword: newEncryptedPassword,
                            encryptedUsername: newEncryptedUsername,
                            encryptedNotes: newEncryptedNotes

                        }

                    } catch {
                        return null
                    }
                })
            )

            // 3. غير الباسورد على السيرفر
            const response = await AuthAxiosInstance.put('/auth/change-password', {
                currentPassword,
                newPassword
            })

            // 4. ارفع الـ credentials المشفرة بالجديد
            await Promise.all(
                reEncrypted
                    .filter(Boolean)
                    .map(({ id, encryptedPassword, encryptedUsername }) =>
                        AuthAxiosInstance.put(`/vault/credentials/${id}`, {
                            encryptedPassword,
                            encryptedUsername
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
                title: "Success",
                text: data?.message || "Password updated successfully",
                confirmButtonColor: "#7c3aed"
            })
        },

        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data?.message || "Request failed",
                confirmButtonColor: "#dc2626"
            })
        }
    });
}