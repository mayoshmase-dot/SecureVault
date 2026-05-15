import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'

export default function useUpdateName() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (name) => {
            const response = await AuthAxiosInstance.put('/auth/update-name', { name })
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            Swal.fire({ title: 'Updated!', text: data.message, icon: 'success', confirmButtonColor: '#7c3aed' })
        },
        onError: (error) => {
            Swal.fire({ title: 'Error!', text: error.response?.data?.message || 'Something went wrong', icon: 'error' })
        }
    })
}