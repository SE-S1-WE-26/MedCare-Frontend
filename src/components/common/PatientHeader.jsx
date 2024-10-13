import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";

const PatientHeader = () => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    { title: "Home", link: "/patient" },
    { title: "Appointments", link: "/patient/appointments" },
    { title: "Services", link: "/patient/services" },
  ];

  const renderMenu = sections.map((section, index) => (
    <div key={index} onClick={() => handleMenuClick(section.link)} className="cursor-pointer w-full">
      <button
        className={`w-full px-4 py-2 border-2 rounded-lg border-light-blue bg-dark-blue ${selected === section.link ? "bg-light-blue" : ""}`}
      >
        <p className={`font-medium ${selected === section.link ? "text-black" : "text-white"}`}>
          {section.title}
        </p>
      </button>
    </div>
  ));

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">
      {renderMenu}
      <button className="p-2 bg-light-blue rounded-lg w-full"> {/* Ensure full width */}
        <img src={icons.qr} alt="QR" className="w-6 h-6" />
      </button>
      <button className="border-2 rounded-full w-full">Profile</button> {/* Ensure full width */}
    </div>
  );
};

export default PatientHeader;
