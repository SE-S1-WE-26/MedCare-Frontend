import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientHeader = () => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    {
      title: "Home",
      link: "/patient",
    },
    {
      title: "Appointments",
      link: "/patient/appointments",
    },
    {
      title: "Services",
      link: "/patient/services",
    },
  ];

  const renderMenu = sections.map((section, index) => (
    <div
      key={index}
      onClick={() => handleMenuClick(section.link)}
      className="cursor-pointer"
    >
      <button
        className={`px-4 py-2 border-2 rounded-lg border-light-blue bg-dark-blue ${
          selected === section.link ? "bg-light-blue " : ""
        }`}
      >
        <div className={`flex items-center`}>
          <p
            className={`font-medium ${
              selected === section.link ? "text-black" : "text-white"
            }`}
          >
            {section.title}
          </p>
        </div>
      </button>
    </div>
  ));

  return (
    <div className="flex flex-row gap-2">
      {renderMenu}
      <button className="button">QR</button>
      <button className="button mr-6">Profile</button>
    </div>
  );
};

export default PatientHeader;
