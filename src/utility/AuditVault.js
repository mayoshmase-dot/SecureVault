import { useQuery } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import useVaultStore from '../store/useVaultStore'
import { decrypt } from '../crypto'
import { passwordAnalyzer } from '../utility/PasswordAnalyzer'

const decryptField = async (field, masterPassword) => {
    if (!field) return ''
    try {
        return await decrypt(field, masterPassword)
    } catch {
        return ''
    }
}
export default function useVaultAudit() {
    const { masterPassword } = useVaultStore()

    return useQuery({
        queryKey: ['vaultAudit'],
        queryFn: async () => {
            const listRes = await AuthAxiosInstance.get('/vault/credentials')
            const credentials = listRes.data?.data || []

            if (!credentials.length) return { total: 0, strong: 0, weak: 0, reused: 0 }

            const decrypted = await Promise.all(
                credentials.map(async (cred) => {
                    try {
                        const res = await AuthAxiosInstance.get(`/vault/credentials/${cred._id}`)
                        const full = res.data?.data
                        const password = await decryptField(full.password, masterPassword)
                        return { ...cred, plainPassword: password }
                    } catch {
                        return { ...cred, plainPassword: '' }
                    }
                })
            )

            const passwordCount = {}
            decrypted.forEach(({ plainPassword }) => {
                if (!plainPassword) return
                passwordCount[plainPassword] = (passwordCount[plainPassword] || 0) + 1
            })

            let strong = 0, weak = 0, reused = 0
            decrypted.forEach(({ plainPassword }) => {
                if (!plainPassword) return
                const { isStrong } = passwordAnalyzer(plainPassword)
                if (passwordCount[plainPassword] > 1) reused++
                else if (isStrong) strong++
                else weak++
            })

            return { total: credentials.length, strong, weak, reused }
        },
        enabled: !!masterPassword
    })
}