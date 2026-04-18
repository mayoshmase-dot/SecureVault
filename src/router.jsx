import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRouter from "./ProtectedRouter";
import AddCredentials from "./pages/credentials/AddCredentials";
import ProfileInfo from "./pages/profile/ProfileInfo";
import Profile2FA from "./pages/profile/Profile2FA";
import ProfileLanguage from "./pages/profile/ProfileLanguage";
import Profile from "./pages/profile/Profile";
import Verify2FA from "./pages/2FA/Verify2FA";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import CredentialDetails from "./pages/credentials/CredentialDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }, {
                path: 'verify2FA',
                element: (
                    <Verify2FA />
                )
            },
            {
                path: 'forgotPassword',
                element: (
                    <ForgotPassword />
                )
            },
            {
                path: 'dashboard',
                element:
                    <ProtectedRouter >
                        <Dashboard />
                    </ProtectedRouter>
            },
            {
                path: 'addCredentials',
                element:
                    <ProtectedRouter >
                        <AddCredentials />
                    </ProtectedRouter>
            },
            {
                path: 'credential/:id',
                element: <CredentialDetails />
            },
            {
                path: 'profile',
                element:
                    <ProtectedRouter>
                        <Profile />
                    </ProtectedRouter>,
                children: [
                    {
                        path: 'profileInfo',
                        element: <ProfileInfo />
                    },
                    {
                        path: '2FA',
                        element: <Profile2FA />
                    },

                    {
                        path: 'language',
                        element: <ProfileLanguage />
                    }
                ]
            },
        ]
    }
]);
export default router;