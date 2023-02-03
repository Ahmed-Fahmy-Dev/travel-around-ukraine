import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../layout/footer/components';
import { Header } from '../../layout/header/components';

const AppLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default AppLayout;
