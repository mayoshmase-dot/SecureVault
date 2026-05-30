import AuthAxiosInstance from '../api/AuthAxiosInstance'
import useVaultStore from '../store/useVaultStore'
import { decrypt } from '../crypto'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

export default function useExportCredentials() {
    const { masterPassword } = useVaultStore()
    const { t } = useTranslation()

    const exportCredentials = async () => {
        try {
            const response = await AuthAxiosInstance.get('/vault/credentials/export')
            const data = response.data?.data || []

            const decrypted = await Promise.all(
                data.map(async (cred) => {
                    try {
                        return {
                            title: cred.title || '',
                            website: cred.website || '',
                            username: await decrypt(cred.encryptedUsername, masterPassword),
                            password: await decrypt(cred.encryptedPassword, masterPassword),
                            notes: cred.encryptedNotes ? await decrypt(cred.encryptedNotes, masterPassword) : '',
                            category: cred.category || '',
                            tags: Array.isArray(cred.tags) ? cred.tags.join(';') : ''
                        }
                    } catch {
                        return {
                            title: cred.title || '',
                            website: cred.website || '',
                            username: '', password: '', notes: '',
                            category: cred.category || '',
                            tags: Array.isArray(cred.tags) ? cred.tags.join(';') : ''
                        }
                    }
                })
            )

            const headers = ['title', 'website', 'username', 'password', 'notes', 'category', 'tags']
            const csv = [
                headers.join(','),
                ...decrypted.map(row =>
                    headers.map(h => `"${(row[h] || '').replace(/"/g, '""')}"`).join(',')
                )
            ].join('\n')

            const blob = new Blob([csv], { type: 'text/csv' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'securevault-export.csv'
            a.click()
            URL.revokeObjectURL(url)

            Swal.fire({
                icon: 'success',
                title: t('Export Successful'),
                text: t('Your credentials have been exported'),
                background: 'rgb(1,6,46)', color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK')

            })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: t('Error'),
                text: t('Something went wrong'),
                background: 'rgb(1,6,46)', color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK')

            })
        }
    }

    return { exportCredentials }
}