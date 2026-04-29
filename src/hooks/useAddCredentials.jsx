import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useVaultStore from "../store/useVaultStore";
import { encrypt } from "../crypto";

export default function useAddCredentials() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { masterPassword } = useVaultStore();

    return useMutation({
        mutationFn: async (data) => {
            if (!masterPassword) {
                throw new Error("Master password not found");
            }

            const encryptedUsername = await encrypt(data.username, masterPassword);

            const encryptedPassword = await encrypt(
                data.password,
                masterPassword
            );

            const encryptedNotes = await encrypt(
                data.notes || "",
                masterPassword
            );

            const payload = {
                title: data.title,
                username: JSON.stringify(encryptedUsername),
                
                password: JSON.stringify(encryptedPassword),
                notes: JSON.stringify(encryptedNotes),
                website: data.website || "",
                tags: data.tags || "",
                category: data.category,
            };


            const response = await AuthAxiosInstance.post(
                "/vault/credentials",
                payload
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["credential"],
            });

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Credential added successfully ✅",
            }).then(() => navigate("/dashboard"));
        },

        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            });
        },
    });
}