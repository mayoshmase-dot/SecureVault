import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import Swal from "sweetalert2";

export default function useEnable2FA() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await AuthAxiosInstance.post("/auth/2fa/enable");
            return response.data;
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            Swal.fire({
                icon: "success",
                title: "2FA Enabled",
                text: "Scan the QR code to complete setup"
            });

            return data; 
        },

        onError: (error) => {
            const message =
                error.response?.data?.message || "Failed to enable 2FA";

            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
            });
        }
    });
}