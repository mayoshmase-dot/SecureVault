import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useAICredentialParser() {
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (text) => {
            const response = await AuthAxiosInstance.post('/vault/magic-import', { text })
            return response.data
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: t('Error'),
                text: error?.response?.data?.message || error?.message || t('Something went wrong'),
                background: 'rgb(1,6,46)', color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK')
            })
        }
    })
}