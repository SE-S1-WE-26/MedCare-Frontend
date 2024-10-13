import React from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../constants/images';
import { Typography } from '@material-tailwind/react';
import PatientHeader from './PatientHeader';
import StaffHeader from './StaffHeader';

const Header = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleLogout = () => {
    setUserRole(null); // Clear the role on logout
    localStorage.removeItem('userRole'); // Remove role from localStorage
    navigate('/'); // Redirect to landing page
  };

  return (
    <div className='bg-dark-blue flex flex-row items-center justify-between'>
      <div className='flex flex-row items-center px-6 py-8'>
        <img src={images.logo} alt="logo" className='w-10' />
        <Typography className='ml-2 text-white text-2xl font-poppins font-medium'>MedCare</Typography>
      </div>
      <div>
        {userRole ? (
          <div className='flex flex-row gap-4'>
            {userRole === "patient" && <PatientHeader />}
            {userRole === "staff" && <StaffHeader />}
            <button className='button mr-6' onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className='button mr-6' onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
