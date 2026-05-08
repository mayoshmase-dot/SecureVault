import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import useAuthStore from '../store/useAuthStore'

export default function useVerify2FACode() {
  return useMutation({
    mutationFn: async ({ code, token }) => {
      const response = await AuthAxiosInstance.post(
        '/auth/2fa/verify',
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

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