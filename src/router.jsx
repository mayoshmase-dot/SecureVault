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
import GeneratePassword from "./pages/genaratePassword/GenaratePassword";
import UpdateCredential from "./pages/credentials/UpdateCredential";
import ProfileDelete from "./pages/profile/ProfileDelete";
import ChangePassword from "./pages/profile/ChangePassword";

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
                path: 'generatePassword',
                element:
                    <ProtectedRouter >
                        <GeneratePassword />
                    </ProtectedRouter>
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
                element:
                    <ProtectedRouter>
                        <CredentialDetails />
                    </ProtectedRouter>
            },
            {
                path: 'update/:id',
                element:
                    <ProtectedRouter>
                        <UpdateCredential />
                    </ProtectedRouter>
            },
            {
                path: 'profile',
                element:
                    <ProtectedRouter>
                        <Profile />
                    </ProtectedRouter>,
                children: [
                    {
                        index: true,
                        element: <ProfileInfo />
                    },
                    {
                        path: '2FA',
                        element: <Profile2FA />
                    },
                    {
                        path: 'changePassword',
                        element: <ChangePassword />
                    },
                    {
                        path: 'language',
                        element: <ProfileLanguage />
                    },
                    {
                        path: 'deleteAccount',
                        element: <ProfileDelete />
                    }
                ]
            },
        ]
    }
]);
export default router;