import AuthAxiosInstance from '../api/AuthAxiosInstance'
import { useQuery } from '@tanstack/react-query'



export default function useGetBackupCodes() {
    const query = useQuery({
        queryKey: ['backupCodes'],
        queryFn: async () => {
            const response = await AuthAxiosInstance.get(`/auth/2fa/backup-codes`)
            return response.data
        },
    })

    return query
}

