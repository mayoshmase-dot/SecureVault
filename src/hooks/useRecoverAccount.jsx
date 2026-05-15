import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axiosInstance'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import { deriveAuthHash, generateRecoveryKey } from '../crypto'

export default function useRecoverAccount() {

    const navigate = useNavigate()

    // =========================
    // HASH RECOVERY KEY
    // =========================
async function hashRecoveryKey(key) {

    const encoder = new TextEncoder()

    // ⚠️ IMPORTANT: لا تحذف "-" لأن الباك غالباً خزّنها
    const normalized = key.trim().toUpperCase()

    const hashBuffer = await crypto.subtle.digest(
        'SHA-256',
        encoder.encode(normalized)
    )

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

    return useMutation({

        mutationFn: async ({
            email,
            recoveryKey,
            newPassword
        }) => {

            console.log("🚀 RECOVERY START")
            console.log("📧 Email:", email)
            console.log("🔑 Raw Recovery Key:", recoveryKey)

            // 1. get KDF params
            const kdfRes = await axiosInstance.get(
                `/auth/kdf-params/${email}`
            )

            const {
                masterPasswordSeed,
                kdfIterations
            } = kdfRes.data.data

            console.log("📦 KDF RESPONSE:", kdfRes.data.data)

            // 2. generate NEW auth hash
            const newAuthHash = await deriveAuthHash(
                newPassword,
                masterPasswordSeed,
                kdfIterations
            )

            console.log("🔐 newAuthHash:", newAuthHash)

            // 3. generate NEW recovery key
            const {
                recoveryKey: newRecoveryKey,
                recoveryKeyHash: newRecoveryKeyHash
            } = await generateRecoveryKey()

            console.log("🆕 newRecoveryKey:", newRecoveryKey)
            console.log("🧾 newRecoveryKeyHash:", newRecoveryKeyHash)

            // 4. HASH USER INPUT RECOVERY KEY (IMPORTANT FIX)
            const hashedRecoveryKey = await hashRecoveryKey(recoveryKey)

            console.log("🔒 hashedRecoveryKey (sent to backend):", hashedRecoveryKey)

            // 5. call backend
            const response = await axiosInstance.post(
                '/auth/recover-account',
                {
                    email,
                    recoveryKey: hashedRecoveryKey, // ✅ FIXED HERE
                    newPassword: newAuthHash,
                    newMasterPasswordSeed: masterPasswordSeed,
                    newRecoveryKeyHash
                }
            )

            console.log("📩 RESPONSE:", response.data)

            return {
                data: response.data,
                newRecoveryKey
            }
        },

        onSuccess: async ({ newRecoveryKey }) => {

           await Swal.fire({
    title: '🔐 Account Recovered Successfully',
    background: 'rgb(1, 6, 46)', // primary.main
    color: '#fff',
    width: 600,

    html: `
      <div style="
        background: rgb(1, 6, 46); /* primary */
        border: 1px solid rgba(255,255,255,0.08);
        padding: 20px;
        border-radius: 12px;
        font-family: monospace;
        color: rgb(53, 241, 119); /* secondary.dark */
        text-align: center;
        letter-spacing: 2px;
        font-size: 16px;
        margin-bottom: 16px;
      ">
        ${newRecoveryKey}
      </div>

      <div style="
        background: rgba(0,0,0,0.25);
        border: 1px solid rgba(255,255,255,0.08);
        padding: 14px;
        border-radius: 10px;
        color: #f87171;
        font-size: 13px;
        line-height: 1.5;
        margin-bottom: 14px;
      ">
        ⚠️ <b>Important Warning</b><br/>
        Save this now. We cannot reset your account without it.<br/>
        If you lose this and your password, your data is gone forever.
      </div>

      <div style="
        display:flex;
        justify-content:center;
        gap:10px;
      ">
        <button id="copyBtn"
          style="
            background: rgb(53, 241, 119); /* secondary.main */
            border:none;
            padding:10px 14px;
            border-radius:8px;
            color:white;
            cursor:pointer;
            font-weight:600;
          ">
          📋 Copy
        </button>

        <button id="downloadBtn"
          style="
            background: rgb(53, 241, 119); /* secondary.dark */
            border:none;
            padding:10px 14px;
            border-radius:8px;
            color:white;
            cursor:pointer;
            font-weight:700;
          ">
          💾 Download
        </button>
      </div>
    `,

    confirmButtonText: 'I saved it',
    confirmButtonColor: 'rgb(53, 241, 119)', // secondary.main
    allowOutsideClick: false,

    didOpen: () => {

        const copyBtn = document.getElementById('copyBtn')
        const downloadBtn = document.getElementById('downloadBtn')

        copyBtn.addEventListener('click', async () => {
            await navigator.clipboard.writeText(newRecoveryKey)
            copyBtn.innerText = '✅ Copied'
            setTimeout(() => copyBtn.innerText = '📋 Copy', 1500)
        })

        downloadBtn.addEventListener('click', () => {
            const blob = new Blob([newRecoveryKey], { type: 'text/plain' })
            const url = URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = 'recovery-key.txt'
            a.click()

            URL.revokeObjectURL(url)
        })
    }
})

            navigate('/login')
        },

        onError: (error) => {

            console.log("❌ RECOVERY FAILED")
            console.log("📩 ERROR:", error?.response?.data)

            Swal.fire({
                title: 'Recovery Failed',
                text:
                    error?.response?.data?.message ||
                    'Something went wrong',
                icon: 'error',
                confirmButtonColor: 'var(--secondary-main, #7c3aed)'
            })
        }
    })
}