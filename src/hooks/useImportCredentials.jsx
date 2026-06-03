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

            // بناء الكريدنشلز مع تشفير الحقول غير الفارغة فقط
            const processed = await Promise.all(
                credentials.map(async (cred) => {
                    const title = cred.title || cred.name || ''
                    const username = cred.username || cred.email || ''
                    const password = cred.password || ''
                    const notes = cred.notes || ''
                    const website = cred.website || cred.url || ''
                    const category = cred.category || 'Other'
                    const tags = cred.tags ? cred.tags.split(';').filter(Boolean) : []

                    return {
                        title,
                        website,
                        username: username ? await encrypt(username, masterPassword) : '',
                        password: password ? await encrypt(password, masterPassword) : '',
                        notes: notes ? await encrypt(notes, masterPassword) : '',
                        category,
                        tags,
                        _valid: !!(title && username && password)
                    }
                })
            )

            // فلتر الكريدنشلز الغير صالحة
            const validCredentials = processed
                .filter(c => c._valid)
                .map(({ _valid, ...rest }) => rest)

            if (validCredentials.length === 0) {
                throw new Error(t('No valid credentials found in the file'))
            }

            const response = await AuthAxiosInstance.post('/vault/credentials/import', {
                credentials: validCredentials
            })
            return response.data
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['credential'] })

            const summary = data?.summary

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
                text: error?.response?.data?.message || error?.message || t('Something went wrong'),
                background: 'rgb(1,6,46)', color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK')
            })
        }
    })
}