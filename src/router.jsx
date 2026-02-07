import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

const router = createBrowserRouter([
    {
        path : '/',
        element : <MainLayout />,
        children : [
            {
                index : true ,
                element : <Home />
            },
            {
                path : 'login',
                element : <Login />
            },
            {
                path : 'register',
                element : <Register />
            },
        ] 
    }
]);
export default router ;