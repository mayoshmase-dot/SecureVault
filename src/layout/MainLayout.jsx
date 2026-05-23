import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import useInactivityLogout from '../hooks/useInactivityLogout';

export default function MainLayout() {
      useInactivityLogout()

  return (
    <>
      <Navbar  />
        <Outlet />     
      <Footer />
      </>
  )
};
