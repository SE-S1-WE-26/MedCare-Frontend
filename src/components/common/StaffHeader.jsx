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
      <button className={`w-full px-4 py-2 border-2 rounded-lg border-light-blue bg-dark-blue ${selected === section.link ? "bg-light-blue" : ""}`}>
        <p className={`font-medium ${selected === section.link ? "text-black" : "text-white"}`}>
          {section.title}
        </p>
      </button>
    </div>
  ));

  return (
    <div className='flex flex-col md:flex-row gap-2 w-full'>
      {renderMenu}
      <button className="button w-full">Scan QR</button> {/* Ensure full width */}
      <button className="border-2 rounded-full w-full">Profile</button> {/* Ensure full width */}
    </div>
  );
};

export default StaffHeader;
