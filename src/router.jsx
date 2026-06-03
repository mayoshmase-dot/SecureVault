import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layout/MainLayout";
import ProtectedRouter from "./ProtectedRouter";
import Loader from "./ui/Loader";

/* ================== Lazy Pages ================== */
const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const HowItWorks = lazy(() => import("./pages/howItWorks/HowItWorks"));

const Login = lazy(() => import("./pages/auth/login/Login"));
const Register = lazy(() => import("./pages/auth/register/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/forgotPassword/ForgotPassword"));
const Verify2FA = lazy(() => import("./pages/2FA/Verify2FA"));

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const AddCredentials = lazy(() => import("./pages/credentials/AddCredentials"));
const CredentialDetails = lazy(() => import("./pages/credentials/CredentialDetails"));
const UpdateCredential = lazy(() => import("./pages/credentials/UpdateCredential"));
const MagicImport = lazy(() => import("./pages/credentials/MagicImport"));
const GeneratePassword = lazy(() => import("./pages/genaratePassword/GenaratePassword"));

const Profile = lazy(() => import("./pages/profile/Profile"));
const ProfileInfo = lazy(() => import("./pages/profile/ProfileInfo"));
const Profile2FA = lazy(() => import("./pages/profile/Profile2FA"));
const ChangePassword = lazy(() => import("./pages/profile/ChangePassword"));
const ProfileLanguage = lazy(() => import("./pages/profile/ProfileLanguage"));
const ProfileDelete = lazy(() => import("./pages/profile/ProfileDelete"));

/* ================== Router ================== */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "howItWorks", element: <HowItWorks /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "verify2FA", element: <Verify2FA /> },

      /* Protected Routes */
      {
        path: "dashboard",
        element: (
          <ProtectedRouter>
            <Dashboard />
          </ProtectedRouter>
        ),
      },
      {
        path: "generatePassword",
        element: (
          <ProtectedRouter>
            <GeneratePassword />
          </ProtectedRouter>
        ),
      },
      {
        path: "addCredentials",
        element: (
          <ProtectedRouter>
            <AddCredentials />
          </ProtectedRouter>
        ),
      },
      {
        path: "credential/:id",
        element: (
          <ProtectedRouter>
            <CredentialDetails />
          </ProtectedRouter>
        ),
      },
      {
        path: "update/:id",
        element: (
          <ProtectedRouter>
            <UpdateCredential />
          </ProtectedRouter>
        ),
      },
      {
        path: "magic-import",
        element: (
          <ProtectedRouter>
            <MagicImport />
          </ProtectedRouter>
        ),
      },

      /* Profile Nested Routes */
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
        children: [
          { index: true, element: <ProfileInfo /> },
          { path: "2FA", element: <Profile2FA /> },
          { path: "changePassword", element: <ChangePassword /> },
          { path: "language", element: <ProfileLanguage /> },
          { path: "deleteAccount", element: <ProfileDelete /> },
        ],
      },
    ],
  },
]);

export default router;