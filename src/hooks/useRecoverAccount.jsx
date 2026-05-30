import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axiosInstance'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { deriveAuthHash, generateRecoveryKey, hashValue, decrypt, encrypt } from '../crypto'
import { useTranslation } from 'react-i18next'
import useAuthStore from '../store/useAuthStore'
import useVaultStore from '../store/useVaultStore'

export default function useRecoverAccount() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const logout = useAuthStore((state) => state.logout)
    const { masterPassword, clearMasterPassword } = useVaultStore()

    return useMutation({
        mutationFn: async ({ email, recoveryKey, newPassword }) => {
            // 1. جيب الـ KDF params
            const kdfRes = await axiosInstance.get(`/auth/kdf-params/${email}`)
            const { masterPasswordSeed, kdfIterations } = kdfRes.data.data

            // 2. اشتق الـ auth hash الجديد
            const newAuthHash = await deriveAuthHash(newPassword, masterPasswordSeed, kdfIterations)

            // 3. ولّد recovery key جديد
            const { recoveryKey: newRecoveryKey, recoveryKeyHash: newRecoveryKeyHash } = await generateRecoveryKey()

            // 4. hash الـ recovery key القديم
            const hashedRecoveryKey = await hashValue(recoveryKey)

            // 5. ابعت للـ backend
            await axiosInstance.post('/auth/recover-account', {
                email,
                recoveryKey: hashedRecoveryKey,
                newPassword: newAuthHash,
                newMasterPasswordSeed: masterPasswordSeed,
                newRecoveryKeyHash
            })

            // 6. لو عندنا masterPassword القديم — اعمل login وأعد تشفير الكريدنشلز
            if (masterPassword) {
                try {
                    const loginRes = await axiosInstance.post('/auth/login', {
                        email,
                        password: newAuthHash
                    })

                    const accessToken = loginRes.data?.accessToken
                    if (!accessToken) throw new Error('No token')

                    const credRes = await axiosInstance.get('/vault/credentials', {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })
                    const credentials = credRes.data?.data || []

                    await Promise.all(
                        credentials.map(async (cred) => {
                            try {
                                const res = await axiosInstance.get(`/vault/credentials/${cred._id}`, {
                                    headers: { Authorization: `Bearer ${accessToken}` }
                                })
                                const full = res.data?.data

                                const decryptedUsername = await decrypt(full.username, masterPassword).catch(() => '')
                                const decryptedPassword = await decrypt(full.password, masterPassword).catch(() => '')
                                const decryptedNotes = full.notes ? await decrypt(full.notes, masterPassword).catch(() => '') : ''

                                await axiosInstance.put(`/vault/credentials/${cred._id}`, {
                                    title: full.title,
                                    website: full.website || '',
                                    category: full.category || 'Other',
                                    tags: full.tags || [],
                                    username: await encrypt(decryptedUsername, newPassword),
                                    password: await encrypt(decryptedPassword, newPassword),
                                    notes: await encrypt(decryptedNotes, newPassword),
                                }, {
                                    headers: { Authorization: `Bearer ${accessToken}` }
                                })
                            } catch { }
                        })
                    )
                } catch { }
            }

            return { newRecoveryKey }
        },

        onSuccess: async ({ newRecoveryKey }) => {
            clearMasterPassword()
            logout()

            await Swal.fire({
                title: t('Account Recovered!'),
                background: 'rgb(1, 6, 46)', color: '#fff', width: 500,
                html: `
                    <p style="color:rgba(255,255,255,0.5);font-size:13px;margin-bottom:16px">
                        ${t('Save your new recovery key — you won\'t see it again.')}
                    </p>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:16px;border-radius:10px;font-family:monospace;font-size:15px;color:rgb(53,241,119);letter-spacing:2px;text-align:center;margin-bottom:16px">${newRecoveryKey}</div>
                    <div style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);padding:12px;border-radius:8px;color:#f87171;font-size:12px;line-height:1.6;margin-bottom:16px">
                        ${t('If you lose this key and your password, your data cannot be recovered.')}
                    </div>
                    <div style="display:flex;justify-content:center;gap:10px">
                        <button id="copyBtn" style="background:rgb(53,241,119);border:none;padding:10px 14px;border-radius:8px;color:white;cursor:pointer;font-weight:600;">📋 ${t('Copy')}</button>
                        <button id="downloadBtn" style="background:rgb(53,241,119);border:none;padding:10px 14px;border-radius:8px;color:white;cursor:pointer;font-weight:700;">💾 ${t('Download')}</button>
                    </div>
                `,
                confirmButtonText: t('I saved it'),
                confirmButtonColor: 'rgb(48,168,90)',
                allowOutsideClick: false,
                didOpen: () => {
                    document.getElementById('copyBtn').addEventListener('click', async function () {
                        await navigator.clipboard.writeText(newRecoveryKey)
                        this.innerText = t('Copied!')
                        setTimeout(() => this.innerText = t('Copy'), 1500)
                    })
                    document.getElementById('downloadBtn').addEventListener('click', () => {
                        const a = document.createElement('a')
                        a.href = URL.createObjectURL(new Blob([newRecoveryKey], { type: 'text/plain' }))
                        a.download = 'recovery-key.txt'
                        a.click()
                    })
                }
            })

            navigate('/login')
        },

        onError: (error) => {
            Swal.fire({
                title: t('Recovery Failed'),
                text: error?.response?.data?.message || t('Something went wrong'),
                icon: 'error',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK'),
                background: 'rgb(1,6,46)',
                color: '#fff'
            })
        }
    })
}