import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import {Box, Container } from '@mui/material';

export default function MainLayout() {
  return (
    <>
      <Navbar />
        <Outlet />     
      <Footer />
      </>
  )
};
