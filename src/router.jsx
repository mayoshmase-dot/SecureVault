import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRouter from "./ProtectedRouter";
import AddCredentials from "./pages/credentials/AddCredentials";

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
        ]
    }
]);
export default router;