import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useConfirmEmailChange() {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (code) => {
            const response = await AuthAxiosInstance.post('/auth/confirm-email-change', { code })
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            Swal.fire({ title: t('Email Updated!'), text: data.message, icon: 'success', confirmButtonColor: '#7c3aed', confirmButtonText: t('OK') })
        },
        onError: (error) => {
            Swal.fire({
                title: t('Error'), text: error.response?.data?.message || t('Something went wrong'), icon: 'error', confirmButtonText: t('OK')
            })
        }
    })
}