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

  const sections = [
    { title: "Home", link: "/staff" },
    { title: "Patients", link: "/staff/patients" },
    { title: "Staff", link: "/staff/staff" },
  ];

  const renderMenu = sections.map((section, index) => (
    <div key={index} onClick={() => handleMenuClick(section.link)} className="cursor-pointer w-full">
      <button className={`w-full px-4 py-2 border rounded-lg border-light-blue bg-dark-blue ${selected === section.link ? "bg-light-blue" : ""}`}>
        <p className={`font-medium text-xs ${selected === section.link ? "text-black" : "text-white"}`}>
          {section.title}
        </p>
      </button>
    </div>
  ));

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full"> {/* Matches PatientHeader styling */}
      <div className="flex flex-col md:flex-row flex flex-row gap-2 w-full">{renderMenu}</div> {/* Consistent gap */}
      <div className="flex flex-row items-center gap-2"> {/* Consistent gap and alignment */}
        <button 
          className="bg-light-blue p-1 rounded-lg flex items-center justify-center w-8 h-8" 
          onClick={handleScanQR}
        > 
          <img src={icons.scan} alt="QR" className="w-6 h-6" /> {/* Consistent image size */}
        </button>
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
