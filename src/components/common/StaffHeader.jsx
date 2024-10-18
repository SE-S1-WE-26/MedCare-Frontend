import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../constants/images';
import icons from '../../constants/icons';

const StaffHeader = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;
  const profileImage = user?.image;
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const handleScanQR = () => {
    navigate('/staff/scan-qr');
  }

  const sections = [
    { title: "Home", link: "/staff" },
    { title: "Patients", link: "/staff/patients" },
    { title: "Staff", link: "/staff/staff" },
  ];

  const renderMenu = sections.map((section, index) => (
    <div key={index} onClick={() => handleMenuClick(section.link)} className="cursor-pointer w-full">
      <button className={`w-full px-4 py-2 border rounded-lg border-light-blue bg-dark-blue ${selected === section.link ? "bg-light-blue" : ""}`}>
        <p className={`font-medium ${selected === section.link ? "text-black" : "text-white"}`}>
          {section.title}
        </p>
      </button>
    </div>
  ));

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">
      {renderMenu}
      <div className="flex flex-row gap-2 w-full justify-between">
        <button 
          className="flex-1 p-2 bg-light-blue rounded-lg w-10 flex items-center justify-center" 
          onClick={handleScanQR}
        > 
          <img src={icons.scan} alt="QR" className="w-6 h-6" />
        </button>
        <button className="flex-1 border-2 rounded-full w-14">
          <img
            src={profileImage}
            alt="Profile"
            className="object-cover w-full h-full rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default StaffHeader;
