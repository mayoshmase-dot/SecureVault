import AuthAxiosInstance from '../api/AuthAxiosInstance';
import { useQuery } from '@tanstack/react-query';

export default function useSearchCredentials(query) {

    const SearchCredentials = async () => {
        const response = await AuthAxiosInstance.get( `/vault/credentials/search?query=${query}`);
        return response.data;
    };

    const queryResult = useQuery({
        queryKey: ['credential-search',query],
        queryFn: SearchCredentials,
        enabled: !!query, 
    });

    return queryResult;
}