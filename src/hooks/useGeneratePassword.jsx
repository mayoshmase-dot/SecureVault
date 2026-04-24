import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'

export default function useGeneratePassword() {
    return useMutation({
        mutationFn: async (data) => {
            const response = await AuthAxiosInstance.post('/password/generate', data)
            return response.data
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.message || 'Failed to generate password ❌',
            });
        },
    });
}
