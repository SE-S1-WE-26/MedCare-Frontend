import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { Typography, Button, Dialog, Card, CardBody, CardFooter } from '@material-tailwind/react';
import PatientHeader from './PatientHeader';
import StaffHeader from './StaffHeader';
import AdminHeader from './AdminHeader';
import { HiOutlineX, HiMenu, HiOutlineLogout } from "react-icons/hi";

const Header = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogin = () => navigate('/signin');

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
    setLogoutDialogOpen(false); // Close the dialog after logout
  };

  const renderHeaderContent = () => {
    if (userRole === "patient") {
      return <PatientHeader />;
    } else if (userRole === "staff") {
      return <StaffHeader />;
    }else if (userRole === "admin") {
      return <AdminHeader />;
    }
    return null;
  };

  return (
    <div className='bg-dark-blue flex flex-col md:flex-row items-center justify-between'>
      <div className='flex flex-row items-center px-6 py-4 w-full justify-between md:justify-start'>
        <div className='flex items-center'>
          <img src={images.logo} alt="logo" className='w-10' />
          <Typography className='text-lg ml-2 text-white lg:text-xl font-poppins font-medium'>MedCare</Typography>
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <HiOutlineX className='h-8 w-8 text-white' /> : <HiMenu className='h-8 w-8 text-white' />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 bg-dark-blue shadow-lg rounded-lg p-4 z-10 md:hidden">
          {userRole ? (
            <div className='flex flex-col w-full'>
              {renderHeaderContent()}
              <Button className='mt-2 p-2 bg-red-500 text-white rounded' onClick={() => setLogoutDialogOpen(true)}>
                <Typography className='text-sm font-poppins font-medium'>Logout</Typography>
              </Button>
            </div>
          ) : (
            <Button className='p-2 bg-blue-500 text-white rounded' onClick={handleLogin}>
              <Typography className='text-sm font-poppins font-medium'>Login</Typography>
            </Button>
          )}
        </div>
      )}

      <div className="hidden md:flex md:flex-row md:items-center md:gap-4 py-4 flex my-auto items-center h-full">
        {userRole ? (
          <>
            {renderHeaderContent()}
            <Button className='p-2 bg-red-500 px-2 text-white rounded-lg lg:mr-6' onClick={() => setLogoutDialogOpen(true)}>
              <HiOutlineLogout className='text-white w-4 h-4'/>
            </Button>
          </>
        ) : (
          <Button className='p-2 px-8 bg-blue-500 text-white rounded-lg lg:mr-6' onClick={handleLogin}>
            <Typography className='text-xs font-poppins font-medium'>Login</Typography>
          </Button>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog
        size="xs"
        open={isLogoutDialogOpen}
        handler={() => setLogoutDialogOpen(false)}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[16rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray" className='font-poppins text-xl'>
              Confirm Logout
            </Typography>
            <Typography className="mb-1 font-normal font-poppins text-sm" variant="paragraph" color="gray">
              Are you sure you want to logout?
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex justify-between">
            <Button variant="gradient" onClick={handleLogout} color='red'>
              Yes, Logout
            </Button>
            <Button variant="text" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default Header;
