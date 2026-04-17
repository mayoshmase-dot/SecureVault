import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function useVerify2FA() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const setToken = useAuthStore((state) => state.setToken);

    return useMutation({
        mutationFn: async (code) => {
            const tempToken = localStorage.getItem("tempToken");

            const response = await axios.post(
                "https://backend-project-nwve.onrender.com/api/auth/2fa/verify",
                { code },
                {
                    headers: {
                        Authorization: `Bearer ${tempToken}`, 
                    },
                }
            );

            return response.data;
        },

        onSuccess: (data) => {
            localStorage.removeItem("tempToken");

            setToken(data.token);
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            Swal.fire({
                icon: "success",
                title: "Verified",
                text: "2FA verification successful"
            }).then(() => {
                navigate("/dashboard");
            });
        },

        onError: (error) => {
            const message =
                error.response?.data?.message || "Invalid verification code";

            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
            });
        }
    });
}