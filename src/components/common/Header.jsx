import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { Typography } from '@material-tailwind/react';
import PatientHeader from './PatientHeader';
import StaffHeader from './StaffHeader';

const Header = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleLogout = () => {
    setUserRole(null); // Clear the role on logout
    localStorage.removeItem('userRole'); // Remove role from localStorage
    navigate('/'); // Redirect to landing page
  };

  return (
    <div className='bg-dark-blue flex flex-col md:flex-row items-center justify-between'>
      <div className='flex flex-row items-center px-6 py-4 w-full justify-between md:justify-start'>
        <div className='flex flex-row items-center'>
          <img src={images.logo} alt="logo" className='w-10' />
          <Typography className='ml-2 text-white text-2xl font-poppins font-medium'>MedCare</Typography>
        </div>
        <div className="flex md:hidden items-center">
          {/* Hamburger icon for mobile, positioned to the right */}
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            <img src={icons.menu} alt="menu" className='w-10 h-10 invert' />
          </button>
        </div>
      </div>
      <div className={`flex-col md:flex md:items-center md:gap-4 ${isMobileMenuOpen ? 'flex' : 'hidden'} md:block`}>
        {userRole ? (
          <div className='flex flex-col w-full md:flex-row gap-4'>
            {userRole === "patient" && <PatientHeader />}
            {userRole === "staff" && <StaffHeader />}
            <button className='mr-6' onClick={handleLogout}>
              <img src={icons.logout} alt="logout" className='w-12 h-12' /> 
            </button>
          </div>
        ) : (
          <button className='button mr-6' onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
