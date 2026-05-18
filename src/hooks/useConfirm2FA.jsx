import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useConfirm2FA() {
    const {t} = useTranslation()
    return useMutation({
        mutationFn: async (code) => {
            const response = await AuthAxiosInstance.post('/auth/2fa/confirm' , {code})
            return response.data
        },
        onError: (error) => {
            Swal.fire({
                title: t('Error!'),
                text: error.response?.data?.message || t('Something went wrong'),
                icon: 'error'
            })
        }
    })
}