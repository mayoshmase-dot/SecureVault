import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axiosInstance'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { deriveAuthHash, generateRecoveryKey, hashValue } from '../crypto'
import { useTranslation } from 'react-i18next'

export default function useRecoverAccount() {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: async ({ email, recoveryKey, newPassword }) => {
            const kdfRes = await axiosInstance.get(`/auth/kdf-params/${email}`)
            const { masterPasswordSeed, kdfIterations } = kdfRes.data.data
            const newAuthHash = await deriveAuthHash(newPassword, masterPasswordSeed, kdfIterations)
            const { recoveryKey: newRecoveryKey, recoveryKeyHash: newRecoveryKeyHash } = await generateRecoveryKey()
            const hashedRecoveryKey = await hashValue(recoveryKey)
            const response = await axiosInstance.post('/auth/recover-account', {
                email, recoveryKey: hashedRecoveryKey,
                newPassword: newAuthHash, newMasterPasswordSeed: masterPasswordSeed, newRecoveryKeyHash
            })
            return { data: response.data, newRecoveryKey }
        },

        onSuccess: async ({ newRecoveryKey }) => {
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
                        <button id="copyBtn" style="background:rgba(53,241,119,0.15);border:1px solid rgba(53,241,119,0.3);padding:8px 16px;border-radius:8px;color:rgb(53,241,119);cursor:pointer;font-weight:600;font-size:13px">${t('Copy')}</button>
                        <button id="downloadBtn" style="background:rgba(53,241,119,0.15);border:1px solid rgba(53,241,119,0.3);padding:8px 16px;border-radius:8px;color:rgb(53,241,119);cursor:pointer;font-weight:600;font-size:13px">${t('Download')}</button>
                    </div>
                `,
                confirmButtonText: t('I saved it'),
                confirmButtonColor: 'rgb(48,168,90)',
                allowOutsideClick: false,
                didOpen: () => {
                    document.getElementById('copyBtn').addEventListener('click', async function() {
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
                icon: 'error', confirmButtonColor: 'rgb(48,168,90)'
            })
        }
    })
}