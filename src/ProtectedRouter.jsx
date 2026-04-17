import { Navigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";

export default function ProtectedRouter({ children }) {
    const token = useAuthStore((state) => state.token);

    // لو فيه بس tempToken (يعني في منتصف الـ 2FA) ما نخليه يدخل
    const tempToken = localStorage.getItem("tempToken");

    if (!token) {
        // لو عنده tempToken يرسله لـ verify2FA، غيره للـ login
        return <Navigate to={tempToken ? "/verify2FA" : "/login"} replace />;
    }

    return children;
}