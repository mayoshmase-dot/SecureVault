import { useQuery } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'

export default function useProfile() {
  return useQuery({
    queryKey:['profile'],
    queryFn:async()=>{
        const response = await AuthAxiosInstance.get('/auth/me');
        return response.data
    },
  })
}
