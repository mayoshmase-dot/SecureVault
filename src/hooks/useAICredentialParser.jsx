import { useMutation } from '@tanstack/react-query'
import AuthAxiosInstance from '../api/AuthAxiosInstance'
import Swal from 'sweetalert2'

export default function useAICredentialParser() {

    return useMutation({

        mutationFn: async (text) => {

            console.log('SENDING =>', text)

            const response = await AuthAxiosInstance.post(
                '/vault/magic-import',
                { text }
            )

            console.log('RESPONSE =>', response.data)

            return response.data
        },

        onError: (error) => {

            console.log('FULL ERROR =>', error)

            console.log('ERROR RESPONSE =>', error?.response)

            console.log('ERROR DATA =>', error?.response?.data)

            Swal.fire({
                icon: 'error',
                title: 'Error',

                text:
                    error?.response?.data?.message ||
                    error?.message ||
                    'Server Error',

                background: 'rgb(1,6,46)',
                color: '#fff',
                confirmButtonColor: 'rgb(48,168,90)',
                confirmButtonText: t('OK')

            })
        }
    })
}