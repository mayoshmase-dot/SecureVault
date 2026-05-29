import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useRestorePasswordFromHistory(
    credentialId
) {

    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({

        mutationFn: async (historyId) => {

            const response =
                await AuthAxiosInstance.post(

                    `/vault/credentials/${credentialId}/restore-password`,

                    { historyId }
                )

            return response.data
        },

        onSuccess: async () => {

            await queryClient.invalidateQueries({
                queryKey: ['credential', credentialId]
            })

            await queryClient.invalidateQueries({
                queryKey: ['passwordHistory', credentialId]
            })

            Swal.fire({
                icon: 'success',
                title: t('Password Restored'),
                text: t('Password restored successfully'),
                background: 'rgb(1,6,46)',
                color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK'),
            })
        },

        onError: (error) => {

            Swal.fire({
                icon: 'error',
                title: t('Error'),
                text:
                    error?.response?.data?.message ||
                    t('Something went wrong'),
                background: 'rgb(1,6,46)',
                color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK'),
            })
        }
    })
}