// useUpdateCredential.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { encrypt } from '../crypto'
import useVaultStore from '../store/useVaultStore'
import { useTranslation } from 'react-i18next'

export default function useUpdateCredential({ id }) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const masterPassword = useVaultStore((state) => state.masterPassword)
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (data) => {
            const encryptedData = {
                ...data,
                username: await encrypt(data.username, masterPassword),
                password: await encrypt(data.password, masterPassword),
                notes: data.notes ? await encrypt(data.notes, masterPassword) : '',
            };
            const response = await AuthAxiosInstance.put(`/vault/credentials/${id}`, encryptedData)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["credential"] })
            Swal.fire({
                icon: "success", title: t('Update!'), text: t('Credential updated successfully'), confirmButtonText: t('OK')
            })
                .then(() => navigate('/dashboard'))
        },
        onError: (error) => {
            Swal.fire({ icon: 'error', title: t('Error'), text: error?.response?.data?.message || t('Failed to update credential'),  confirmButtonText: t('OK') })
        },
    })
}