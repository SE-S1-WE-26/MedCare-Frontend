import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowCircleLeft,HiPlusSm } from "react-icons/hi";

const BackNavigation = ({ defaultRoute = -1, label, className = "",  btn, btnTitle, link, btnStyle }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (defaultRoute === -1) {
      navigate(-1);  // Go to the previous page
    } else {
      navigate(defaultRoute);  // Navigate to the provided route
    }
  };

  const handleNavigation = () => {
    navigate(link);
  };

  return (
    <div className='flex flex-row items-start items-center justify-between mb-4 p-2'>
      <button 
      onClick={handleGoBack} 
      className={`flex items-center p-2 ${className}`} // Include additional class if provided
    >
      <HiOutlineArrowCircleLeft className='w-10 h-10 mr-2 md:w-12 md:h-12' /> {/* Larger icon for larger screens */}
      <p className='text-lg md:text-2xl font-bold'>{label}</p> {/* Responsive text size */}
    </button>
    {btn ? (
        <button
          className={`${btnStyle} flex flex-row items-center gap-2 px-4 py-2 md:px-6 md:py-2 rounded-lg text-sm md:text-base`}
          onClick={handleNavigation}
        >
          {/* Icon visible at all sizes */}
          <HiPlusSm className='w-8 h-8'/>
          {/* Hide text on mobile (sm) and show on md and larger */}
          <p className='hidden md:block font-medium'>{btnTitle}</p>
        </button>
      ) : null}
    </div>
  );
};

export default BackNavigation;
