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
            Swal.fire({ title: t('Updated!'), text: data.message, icon: 'success', confirmButtonColor: '#7c3aed' })
        },
        onError: (error) => {
            Swal.fire({ title: t('Error'), text: error.response?.data?.message || t('Something went wrong'), icon: 'error' })
        }
    })
}