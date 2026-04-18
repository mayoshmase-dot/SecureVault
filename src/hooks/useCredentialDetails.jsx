import AuthAxiosInstance from '../api/AuthAxiosInstance'
import axiosInstance from '../api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export default function useCredentialDetails({ id }) {
    const getCredentialDetails = async () => {
        const response = await AuthAxiosInstance.get(`/vault/credentials/${id}`)
        return response.data
    }
    const query = useQuery({
        queryKey: ['credential', id],
        queryFn: getCredentialDetails,
        staleTime: 100 * 60 * 5
    })
    return query
}
