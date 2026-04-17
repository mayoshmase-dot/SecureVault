import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function useAddCredentials() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: async (newCredential) => {
            const response = await AuthAxiosInstance.post(
                "/vault/credentials",
                newCredential
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["credentials"] });
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Credential added successfully ✅",

            }).then(() => {
                navigate("/dashboard");
            });
        },


        onError: (error) => {
            error.response?.data?.message || "Something went wrong";
            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
            })
        }
    })
    return mutation;
}