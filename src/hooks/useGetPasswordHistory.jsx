import AuthAxiosInstance from '../api/AuthAxiosInstance'
import { useQuery } from '@tanstack/react-query'

export default function useGetPasswordHistory(id) {

    return useQuery({

        queryKey: ['passwordHistory', id],

        queryFn: async () => {

            const response =
                await AuthAxiosInstance.get(
                    `/vault/credentials/${id}/password-history`
                )

            return response.data
        },

        enabled: !!id
    })
}