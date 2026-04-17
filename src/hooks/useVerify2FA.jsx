import axios from "axios";
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

            if (!tempToken) {
                throw new Error("No temporary token found. Please login again.");
            }

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
            // نمسح التوكن المؤقت ونحط التوكن الحقيقي في الـ store وـ localStorage
            localStorage.removeItem("tempToken");
            setToken(data.token);
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            Swal.fire({
                icon: "success",
                title: "Verified",
                text: "2FA verification successful",
                background: "rgb(1, 6, 46)",
                color: "white",
                confirmButtonColor: "rgb(48,168,90)",
            }).then(() => {
                navigate("/dashboard");
            });
        },

        onError: (error) => {
            // لو التوكن المؤقت انتهى أو مش موجود نرجعه للـ login
            if (error.message === "No temporary token found. Please login again.") {
                Swal.fire({
                    icon: "warning",
                    title: "Session Expired",
                    text: "Please login again",
                    background: "rgb(1, 6, 46)",
                    color: "white",
                    confirmButtonColor: "rgb(48,168,90)",
                }).then(() => {
                    navigate("/login");
                });
                return;
            }

            const message = error.response?.data?.message || "Invalid verification code";
            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
                background: "rgb(1, 6, 46)",
                color: "white",
                confirmButtonColor: "rgb(48,168,90)",
            });
        }
    });
}