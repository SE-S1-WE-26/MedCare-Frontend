import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const BackNavigation = ({ defaultRoute = -1, label, className = "" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (defaultRoute === -1) {
      navigate(-1);  // Go to the previous page
    } else {
      navigate(defaultRoute);  // Navigate to the provided route
    }
  };

  return (
    <button 
      onClick={handleGoBack} 
      className={`flex flex-row items-center mb-8 ${className}`} // Include additional class if provided
    >
      <HiOutlineArrowCircleLeft className='w-10 h-10 mr-2 md:w-12 md:h-12' /> {/* Smaller icon for mobile */}
      <p className='text-2xl font-bold md:text-3xl'>{label}</p> {/* Responsive text size */}
    </button>
  );
};

export default BackNavigation;
