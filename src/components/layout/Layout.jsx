import React, { useState, useEffect } from 'react';
import { Header, Footer } from '..';
import AppRoutes from '../../components/common/AppRoutes'; 

const Layout = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  const handleSetUserRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  return (
    <div className='bg-light-blue min-h-screen min-w-screen flex flex-col'>
      <Header userRole={userRole} setUserRole={handleSetUserRole} />
      {/* Flex-1 to ensure this section takes the remaining space */}
      <div className='flex-1 flex p-3 lg:p-8 w-full h-full overflow-hidden'>
        <AppRoutes setUserRole={handleSetUserRole} />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
