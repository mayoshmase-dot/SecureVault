import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'

export default function useConfirmEmailChange() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (code) => {
            const response = await AuthAxiosInstance.post('/auth/confirm-email-change', { code })
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            Swal.fire({ title: 'Email Updated!', text: data.message, icon: 'success', confirmButtonColor: '#7c3aed' })
        },
        onError: (error) => {
            Swal.fire({ title: 'Error!', text: error.response?.data?.message || 'Something went wrong', icon: 'error' })
        }
    })
}