import useAuthStore from './store/useAuthStore'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({children}) {
    const token = useAuthStore((state)=>state.token)

    if(!token){
return <Navigate to='/login'/>
    }
  
  return children;
}

// import useAuthStore from './store/useAuthStore'
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRouter({ children }) {
//     const token = useAuthStore((state) => state.token)
//     const tempToken = useAuthStore((state) => state.tempToken)

//     if (!token && !tempToken) {
//         return <Navigate to="/login" />
//     }

//     if (!token && tempToken) {
//         return <Navigate to="/verify2FA" />
//     }
//     return children;
// }