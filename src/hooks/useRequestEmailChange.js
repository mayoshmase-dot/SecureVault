import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'

export default function useRequestEmailChange() {
    return useMutation({
        mutationFn: async ({ newEmail, password }) => {
            const response = await AuthAxiosInstance.post('/auth/request-email-change', { newEmail, password })
            return response.data
        },
        onError: (error) => {
            Swal.fire({ title: 'Error!', text: error.response?.data?.message || 'Something went wrong', icon: 'error' })
        }
    })
}