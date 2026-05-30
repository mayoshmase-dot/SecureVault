import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'

export default function useDeleteCredentials() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (id) => {
            const result = await Swal.fire({
                icon: "warning",
                title: t('Are you sure?'),
                text: t('Do you want to delete this credential?'),
                showCancelButton: true,
                confirmButtonText: t('Yes, delete it'),
                cancelButtonText: t('Cancel'),
                confirmButtonColor: "#d33",
            });
            if (!result.isConfirmed) throw new Error("cancelled");
            const response = await AuthAxiosInstance.delete(`/vault/credentials/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["credential"] });
            Swal.fire({
                icon: "success",
                title: t('Deleted!'),
                text: t('Credential deleted successfully'),
                confirmButtonText: t('OK')
            }).then(() => navigate("/dashboard"));
        },
        onError: (error) => {
            if (error.message === 'cancelled') return
            Swal.fire({
                icon: "error",
                title: t('Error'),
                text: error.response?.data?.message || t('Something went wrong'),
                          confirmButtonText: t('OK')
            });
        }
    });
}