import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../constants/images';
import icons from '../../constants/icons';

const StaffHeader = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;
  const profileImage = user?.image;
  const [selected, setSelected] = useState("/staff");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const handleScanQR = () => {
    navigate('/staff/scan-qr');
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full"> {/* Matches PatientHeader styling */}
      <div className="flex flex-row items-center gap-2"> {/* Consistent gap and alignment */}
        <button className="border-2 rounded-full flex items-center justify-center w-8 h-8">
          <img
            src={profileImage}
            alt="Profile"
            className="object-cover rounded-full w-full h-full"
          />
        </button>
      </div>
    </div>
  );
};

export default StaffHeader;
