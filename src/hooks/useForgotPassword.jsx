import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axiosInstance'
import Swal from 'sweetalert2'

export default function useForgotPassword() {
    return useMutation({
        mutationFn: async (email) => {
            const response = await axiosInstance.post('/auth/forgot-password', { email })
            return response.data
        },
        onSuccess: (data, email) => {
            localStorage.setItem('email', email)
            Swal.fire({
                title: 'Success!',
                text: 'Code sent successfully!',
                icon: 'success'
            })
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