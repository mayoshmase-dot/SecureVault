import AuthAxiosInstance from '../api/AuthAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useVaultStore from '../store/useVaultStore'
import { decrypt, isEncrypted } from '../crypto'

const decryptField = async (field, masterPassword) => {
    if (!field) return ''
    if (isEncrypted(field)) {
        return await decrypt(field, masterPassword)
    }
    return field
}

export default function useCredentialDetails({ id }) {
    
    const { masterPassword } = useVaultStore()
    const navigate = useNavigate()
    const [decryptedData, setDecryptedData] = useState(null)
    const [isDecrypting, setIsDecrypting] = useState(false)
    const [decryptError, setDecryptError] = useState(null)

    useEffect(() => {
        if (!masterPassword) navigate('/login')
    }, [masterPassword])

    const query = useQuery({
        queryKey: ['credential', id],
        queryFn: async () => {
            const response = await AuthAxiosInstance.get(`/vault/credentials/${id}`)
            return response.data
        },
    })

    useEffect(() => {
        const credential = query.data?.data
        if (!credential || !masterPassword) return

        const decryptCredential = async () => {
            setIsDecrypting(true)
            setDecryptError(null)
            try {
                const [username, password, notes] = await Promise.all([
                    decryptField(credential.username, masterPassword),
                    decryptField(credential.password, masterPassword),
                    decryptField(credential.notes, masterPassword),
                ])
                setDecryptedData({ ...credential, username, password, notes })
            } catch (error) {
                setDecryptError(error)
            } finally {
                setIsDecrypting(false)
            }
        }

        decryptCredential()
    }, [query.data, masterPassword])

    return { ...query, decryptedData, isDecrypting, decryptError }
}