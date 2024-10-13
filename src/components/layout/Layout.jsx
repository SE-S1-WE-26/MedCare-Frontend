import React, { useState, useEffect } from 'react';
import { Header, Footer } from '..';
import AppRoutes from '../../components/common/AppRoutes'; // Make sure this import is correct

const Layout = () => {
  const [userRole, setUserRole] = useState(null); // State to hold user role

  useEffect(() => {
    // Retrieve user role from localStorage on component mount
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  const handleSetUserRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role); // Save role to localStorage
  };

  return (
    <div className='bg-light-blue h-screen w-screen flex flex-col'>
      <Header userRole={userRole} setUserRole={handleSetUserRole} /> {/* Pass props */}
      <AppRoutes setUserRole={handleSetUserRole} /> {/* Pass setUserRole here */}
      <Footer />
    </div>
  );
};

export default Layout;
