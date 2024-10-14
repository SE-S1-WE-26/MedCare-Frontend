import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffHeader = () => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    { title: "Home", link: "/staff" },
    { title: "Appointments", link: "/staff/patients" },
    { title: "Services", link: "/staff/staff" },
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
    <div className='flex flex-col md:flex-row gap-2 w-full'>
      {renderMenu}
      <div className="flex flex-row gap-2 w-full justify-between"> {/* Changed to flex-col for mobile view */}
        <button className="flex-1 p-2 bg-light-blue rounded-lg w-20 justify-center"> {/* Ensure full width for both buttons */}
          <Typography className='font-poppins text-xs'>Scan QR</Typography>
        </button>
        <button className="flex-1 border-2 rounded-full">Profile</button>
      </div>
    </div>
  );
};

export default StaffHeader;
