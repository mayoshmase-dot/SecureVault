// useUpdateName.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useUpdateName() {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (name) => {
            const response = await AuthAxiosInstance.put('/auth/update-name', { name })
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            Swal.fire({ title: t('Update!'), text: data.message, icon: 'success', confirmButtonColor: '#7c3aed' ,confirmButtonText: t('OK')
 })
        },
        onError: (error) => {
            Swal.fire({ title: t('Error'), text: error.response?.data?.message || t('Something went wrong'), icon: 'error', confirmButtonText: t('OK') })
        }
    })
}