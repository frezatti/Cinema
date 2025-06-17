import React from 'react';
import { AppNavbar as Navbar } from '@/components/navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default Layout;
