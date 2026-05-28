// useRequestEmailChange.js
import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import axiosInstance from '../api/axiosInstance'
import Swal from 'sweetalert2'
import { deriveAuthHash } from '../crypto'
import { useTranslation } from 'react-i18next'

export default function useRequestEmailChange() {
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async ({ newEmail, password }) => {
            const profileRes = await AuthAxiosInstance.get('/auth/me')
            const email = profileRes.data?.data?.email
            const kdfRes = await axiosInstance.get(`/auth/kdf-params/${email}`)
            const { masterPasswordSeed, kdfIterations } = kdfRes.data.data
            const authHash = await deriveAuthHash(password, masterPasswordSeed, kdfIterations)
            const response = await AuthAxiosInstance.post('/auth/request-email-change', { newEmail, password: authHash })
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