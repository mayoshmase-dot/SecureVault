import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import useVaultStore from '../store/useVaultStore'
import { encrypt } from '../crypto'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useImportCredentials() {
    const queryClient = useQueryClient()
    const { masterPassword } = useVaultStore()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (file) => {
            const text = await file.text()
            const rows = text.trim().split('\n')
            const headers = rows[0].split(',').map(h => h.replace(/"/g, '').trim())

            const credentials = rows.slice(1).map(row => {
                const values = row.match(/(".*?"|[^,]+)/g)?.map(v =>
                    v.replace(/^"|"$/g, '').replace(/""/g, '"')
                ) || []
                const obj = {}
                headers.forEach((h, i) => obj[h] = values[i] || '')
                return obj
            })

            const encrypted = await Promise.all(
                credentials.map(async (cred) => ({
                    title: cred.title || cred.name || '',
                    website: cred.website || cred.url || '',
                    username: await encrypt(cred.username || cred.email || '', masterPassword),
                    password: await encrypt(cred.password || '', masterPassword),
                    notes: await encrypt(cred.notes || '', masterPassword),
                    category: cred.category || 'Other',
                    tags: cred.tags ? cred.tags.split(';').filter(Boolean) : []
                }))
            )

            const response = await AuthAxiosInstance.post('/vault/credentials/import', {
                credentials: encrypted
            })
            return response.data
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['credential'] })

            const summary = data?.summary
            const skipped = data?.errors?.length || 0

            Swal.fire({
                icon: summary?.failed > 0 ? 'warning' : 'success',
                title: t('Import Successful'),
                html: `
            <p style="color:rgba(255,255,255,0.8);font-size:14px">
                ✅ ${t('Imported')}: <b>${summary?.success ?? 0}</b>
                &nbsp;|&nbsp;
                ⚠️ ${t('Failed')}: <b>${summary?.failed ?? 0}</b>
            </p>
        `,
                background: 'rgb(1,6,46)', color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK'),
            })
        },

        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: t('Error'),
                text: error?.response?.data?.message || t('Something went wrong'),
                background: 'rgb(1,6,46)', color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK')

            })
        }
    })
}