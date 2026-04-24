import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthAxiosInstance from "../api/AuthAxiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function useDeleteCredentials() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
   mutationFn: async (id) => {
    const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "Do you want to delete this credential?",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) throw new Error("cancelled");
    const response = await AuthAxiosInstance.delete(`/vault/credentials/${id}`);
    return response.data;
},
onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["credential"] });
    Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Credential deleted successfully ✅",
    }).then(() => navigate("/dashboard"));
},
onError: (error) => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
    });
}
    });
}