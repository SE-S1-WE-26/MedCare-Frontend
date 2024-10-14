import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { Typography, Button } from '@material-tailwind/react';
import PatientHeader from './PatientHeader';
import StaffHeader from './StaffHeader';
import { HiOutlineX } from "react-icons/hi"; // Import the icon
import { HiMenu } from "react-icons/hi";

const Header = ({ userRole, setUserRole }) => {
  const parentId = 1;
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
          <Typography className='text-lg ml-2 text-white lg:text-2xl font-poppins font-medium'>MedCare</Typography>
        </div>
        <div className="flex items-center md:hidden">
          {/* Hamburger icon or Close icon for mobile */}
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <HiOutlineX className='h-8 w-8 text-white' />
            ) : (
              <HiMenu className='h-8 w-8 text-white'/>
            )}
          </button>
          {/* Logout button next to hamburger in mobile view
          {userRole && (
            <button className='ml-2' onClick={handleLogout}>
              <img src={icons.logout} alt="logout" className='lg:w-10 lg:h-10 w-8 h-8' />
            </button>
          )} */}
        </div>
      </div>

      {/* Popover for mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 bg-dark-blue shadow-lg rounded-lg p-4 z-10 md:hidden">
          {userRole ? (
            <div className='flex flex-col w-full'>
              {userRole === "patient" && <PatientHeader patientId={parentId} />}
              {userRole === "staff" && <StaffHeader />}
              <Button style={{ textTransform: "none" }} className='mt-2 p-2 bg-red-500 text-white rounded' onClick={handleLogout}>
               <Typography className='text-sm font-poppins font-medium'>Logout</Typography>
              </Button>
            </div>
          ) : (
            <Button style={{ textTransform: "none" }} className='p-2 bg-blue-500 text-white rounded' onClick={handleLogin}>
            <Typography className='text-sm font-poppins font-medium'>Login</Typography>
            </Button>
          )}
        </div>
      )}

      {/* Desktop menu rendering */}
      <div className="hidden md:flex md:flex-row md:items-center md:gap-4 py-4 items-center">
        {userRole ? (
          <>
            {userRole === "patient" && <PatientHeader patientId={parentId}/>}
            {userRole === "staff" && <StaffHeader />}
            <Button style={{ textTransform: "none" }} className='p-2 bg-red-500 px-8 text-white rounded-lg lg:mr-6' onClick={handleLogout}>
            <Typography className='text-lg font-poppins font-medium'>Logout</Typography>
            </Button>
          </>
        ) : (
          <Button style={{ textTransform: "none" }} className='p-2 px-8 bg-blue-500 text-white rounded-lg lg:mr-6' onClick={handleLogin}>
          <Typography className='text-lg font-poppins font-medium'>Login</Typography>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
