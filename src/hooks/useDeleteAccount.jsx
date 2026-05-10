import { useMutation } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import useAuthStore from "../store/useAuthStore";

export default function useDeleteAccount() {
    const logout = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: async (password) => {
            const response = await AuthAxiosInstance.delete('/auth/delete-account', {
                data: { password }
            });
            return response.data;
        },
        onSuccess: () => {
            logout();
             localStorage.clear();

  sessionStorage.clear();
        }
    });
}