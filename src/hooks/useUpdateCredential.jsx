import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthAxiosInstance from '../api/AuthAxiosInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { encrypt } from '../crypto';
import useVaultStore from '../store/useVaultStore';

export default function useUpdateCredential({ id }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const masterPassword = useVaultStore((state) => state.masterPassword);

    return useMutation({
        mutationFn: async (data) => {
            const encryptedData = {
                ...data,
                username: JSON.stringify(await encrypt(data.username, masterPassword)),
                password: JSON.stringify(await encrypt(data.password, masterPassword)),
                notes: data.notes ? JSON.stringify(await encrypt(data.notes, masterPassword)) : '',
            };
            const response = await AuthAxiosInstance.put(`/vault/credentials/${id}`, encryptedData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["credential"] });
            Swal.fire({ icon: "success", title: "Update!", text: "Credential updated successfully ✅" })
                .then(() => navigate('/dashboard'));
        },
        onError: (error) => {
            Swal.fire({ icon: 'error', title: 'Error', text: error?.response?.data?.message || 'Failed to update credential ❌' });
        },
    });
}