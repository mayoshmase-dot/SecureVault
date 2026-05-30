import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useBulkDeleteCredentials() {
    const { t } = useTranslation()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (ids) => {
            const response = await AuthAxiosInstance.post('/vault/credentials/bulk-delete', { ids })
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['credential'] })
            Swal.fire({
                title: t('Deleted!'),
                text: `${t('Deleted')} ${data.deletedCount} ${t('credentials')}`,
                icon: 'success',
                background: 'rgb(1,6,46)', color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK')
            })
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