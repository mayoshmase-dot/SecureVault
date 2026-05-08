import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'

export default function useDisable2FA() {
    return useMutation({
        mutationFn: async () => {
            const response = await AuthAxiosInstance.post('/auth/2fa/disable' )
            return response.data
        },
        onError: (error) => {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Something went wrong',
                icon: 'error'
            })
        }
    })
}