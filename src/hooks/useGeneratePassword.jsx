// useGeneratePassword.js
import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useGeneratePassword() {
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (data) => {
            const response = await AuthAxiosInstance.post('/password/generate', data)
            return response.data
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: t('Error'),
                text: error?.response?.data?.message || t('Failed to generate password'),
            });
        },
    });
}