import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";

const PatientHeader = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;
  const profileImage = user?.image;

  const [selected, setSelected] = useState("/patient");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const handleQR = () => {
    // Navigate to MyQR page with patientId as a URL parameter
    navigate(`/patient/my-qr/${userId}`);
  };

  const sections = [
    { title: "Home", link: "/patient" },
    { title: "Appointments", link: "/patient/appointments" },
    { title: "Services", link: "/patient/services" },
  ];

  const renderMenu = sections.map((section, index) => (
    <div
      key={index}
      onClick={() => handleMenuClick(section.link)}
      className="cursor-pointer w-full"
    >
      <button
        className={`w-full px-4 py-2 border rounded-lg border-light-blue bg-dark-blue ${
          selected === section.link ? "bg-light-blue" : ""
        }`}
      >
        <p
          className={`font-medium text-xs ${
            selected === section.link ? "text-black" : "text-white"
          }`}
        >
          {section.title}
        </p>
      </button>
    </div>
  ));

  return (
    <div className="flex flex-col md:flex md:flex-row items-center gap-4"> {/* Increased gap for better spacing */}
      <div className="flex flex-col md:flex md:flex-row flex flex-row gap-2">{renderMenu}</div> {/* Adjusted gap for clarity */}
      <div className="flex flex-row items-center gap-2">
      <button 
        className="bg-light-blue p-1 rounded-lg flex items-center justify-center w-8 h-8" 
        onClick={handleQR}
      > 
        <img src={icons.qr} alt="QR" className="w-6 h-6" /> {/* Increased image size */}
      </button>
      <button className="border-2 rounded-full flex items-center justify-center w-8 h-8">
        <img
          src={profileImage}
          className="object-cover rounded-full w-full h-full"
        />
      </button>
      </div>
    </div>
  );
};

export default PatientHeader;
