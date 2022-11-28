import React from 'react';
import Hero from './Heros';
import Sidebar from './Sidebar';

function Layout({ children }) {
    return (
        <>
            <Hero />
            <Sidebar />
            <main>
                {children}
            </main>
        </>
    );
}

export default Layout;