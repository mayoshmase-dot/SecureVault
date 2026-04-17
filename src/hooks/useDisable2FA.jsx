import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import Swal from "sweetalert2";

export default function useDisable2FA() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await AuthAxiosInstance.post("/auth/2fa/disable");
            return response.data;
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            Swal.fire({
                icon: "success",
                title: "2FA Disabled",
                text: "Two-factor authentication has been turned off"
            });

            return data;
        },

        onError: (error) => {
            const message =
                error.response?.data?.message || "Failed to disable 2FA";

            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
            });
        }
    });
}