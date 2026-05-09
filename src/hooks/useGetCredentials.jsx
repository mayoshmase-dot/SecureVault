import AuthAxiosInstance from '../api/AuthAxiosInstance';
import { useQuery } from '@tanstack/react-query';

export default function useGetCredentials() {
    
    const getCredentials = async () => {
        const response = await AuthAxiosInstance.get('/vault/credentials');
        return response.data;
    }

    const query = useQuery({
        queryKey: ['credential'],
        queryFn: getCredentials,
        staleTime: 1000 * 60 * 5
    });
    return query;
}