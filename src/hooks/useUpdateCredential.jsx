import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export default function useUpdateCredential({ id }) {
    const queryClient = useQueryClient();
    const navigate= useNavigate()
    return useMutation({
        mutationFn: async (data) => {
            const response = await AuthAxiosInstance.put(`/vault/credentials/${id}` , data)
            return response.data
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["credential"] });
            Swal.fire({
                icon: "success",
                title: "Update!",
                text: "Credential updated successfully ✅",
            }).then(() => navigate('/dashboard'))
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.message || 'Failed to updated credential ❌',
            });
        },
    });
}
