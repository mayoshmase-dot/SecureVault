import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import useVaultStore from '../store/useVaultStore'
import { encrypt } from '../crypto'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

const parseCSVRow = (row) => {
    const values = []
    let current = ''
    let insideQuotes = false

    for (let i = 0; i < row.length; i++) {
        const char = row[i]
        if (char === '"') {
            if (insideQuotes && row[i + 1] === '"') {
                current += '"'
                i++
            } else {
                insideQuotes = !insideQuotes
            }
        } else if (char === ',' && !insideQuotes) {
            values.push(current.trim())
            current = ''
        } else {
            current += char
        }
    }
    values.push(current.trim())
    return values
}

const isTitleInvalid = (title) => {
    if (!title) return true
    if (title.includes('@')) return true
    const lower = title.toLowerCase()
    if (lower.startsWith('http') || lower.startsWith('www.')) return true
    return false
}

export default function useImportCredentials() {
    const queryClient = useQueryClient()
    const { masterPassword } = useVaultStore()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async (file) => {
            const text = await file.text()
            const rows = text.trim().split('\n')
            const headers = parseCSVRow(rows[0]).map(h => h.replace(/"/g, '').trim())

            const credentials = rows.slice(1)
                .map(row => {
                    const values = parseCSVRow(row)

                    // لو عدد القيم مش نفس عدد الـ headers — اتجاهل الصف
                    if (values.length !== headers.length) return null

                    const obj = {}
                    headers.forEach((h, i) => obj[h] = values[i] ?? '')
                    return obj
                })
                .filter(Boolean)

            const processed = await Promise.all(
                credentials.map(async (cred) => {
                    const title    = (cred.title    || cred.name  || '').trim()
                    const username = (cred.username || cred.email || '').trim()
                    const password = (cred.password || '').trim()
                    const notes    = (cred.notes    || '').trim()
                    const website  = (cred.website  || cred.url   || '').trim()
                    const category = cred.category || 'Other'
                    const tags     = cred.tags ? cred.tags.split(';').filter(Boolean) : []

                    // نفس الـ validation تبع الباك
                    const isValid =
                        title.length > 0 &&
                        username.length > 0 &&
                        password.length > 0 &&
                        !isTitleInvalid(title)

                    return {
                        title,
                        website,
                        username: username.length > 0 ? await encrypt(username, masterPassword) : '',
                        password: password.length > 0 ? await encrypt(password, masterPassword) : '',
                        notes:    notes.length    > 0 ? await encrypt(notes,    masterPassword) : '',
                        category,
                        tags,
                        _valid: isValid
                    }
                })
            )

            const validCredentials = processed
                .filter(c => c._valid)
                .map(({ _valid, ...rest }) => rest)

            const skippedCount = processed.length - validCredentials.length

            if (validCredentials.length === 0) {
                throw new Error(t('No valid credentials found in the file'))
            }

            const response = await AuthAxiosInstance.post('/vault/credentials/import', {
                credentials: validCredentials
            })

            return { ...response.data, _skippedCount: skippedCount }
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['credential'] })

            const summary = data?.summary
            const skippedByFrontend = data?._skippedCount || 0
            const totalFailed = (summary?.failed ?? 0) + skippedByFrontend

            Swal.fire({
                icon: totalFailed > 0 ? 'warning' : 'success',
                title: t('Import Successful'),
                html: `
                    <p style="color:rgba(255,255,255,0.8);font-size:14px">
                        ✅ ${t('Imported')}: <b>${summary?.success ?? 0}</b>
                        &nbsp;|&nbsp;
                        ⚠️ ${t('Failed')}: <b>${totalFailed}</b>
                    </p>
                    ${skippedByFrontend > 0 ? `
                        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:8px">
                            ${skippedByFrontend} ${t('skipped due to missing fields')}
                        </p>
                    ` : ''}
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