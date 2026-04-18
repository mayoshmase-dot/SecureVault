import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function useResetPassword() {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async ({ token, newPassword }) => {
            const response = await axiosInstance.post('/auth/reset-password', { token, newPassword })
            return response.data
        },
        onSuccess: () => {
            Swal.fire({
                title: 'Done!',
                text: 'Password reset successfully!',
                icon: 'success'
            }).then(() => navigate('/login'))
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