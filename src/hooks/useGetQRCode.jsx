import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'

export default function useGetQRCode() {
    return useMutation({
        mutationFn: async () => {
            const response = await AuthAxiosInstance.post('/auth/2fa/setup')
            return response.data
        },
    })
}