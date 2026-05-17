import AuthAxiosInstance from '../api/AuthAxiosInstance';
import { useQuery } from '@tanstack/react-query';

export default function useCheckPasswordExpiry() {
    return useQuery({
        queryKey: ['passwordExpiry'],
        queryFn: async () => {
            const response = await AuthAxiosInstance.get('/auth/password-expiry');
            return response.data;
        }
    });
}