import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useVerify2FACode() {
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async ({ code, token }) => {
            const response = await AuthAxiosInstance.post('/auth/2fa/verify', { code },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            return response.data
        },
        onError: (error) => {
            Swal.fire({
                title: t('Error'),
                text: error.response?.data?.message || t('Something went wrong'),
                icon: 'error',
                confirmButtonText: t('OK')
            })
        }
    })
}