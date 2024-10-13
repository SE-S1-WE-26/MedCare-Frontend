import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";

const Dashboard = () => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    {
      title: "Medical Records",
      link: "/patient/medical-records",
      color: "bg-blue-800", // Dark blue background
      icon: icons.medical,
    },
    {
      title: "Lab Reports",
      link: "/patient/lab-reports",
      color: "bg-red-800", // Dark red background
      icon: icons.lab,
    },
    {
      title: "Medical Profile",
      link: "/patient/medical-profile",
      color: "bg-purple-800", // Purple background
      icon: icons.profile,
    },
  ];

  // Menu rendering
  const renderMenu = sections.map((section, index) => (
    <div
      key={index}
      onClick={() => handleMenuClick(section.link)}
      className="cursor-pointer w-full"
    >
      <button
        className={`w-full px-6 py-10 border-2 rounded-3xl border-light-blue flex justify-center items-center ${
          selected === section.link ? "bg-light-blue" : section.color
        }`}
      >
        <img src={section.icon} alt={section.title} className="w-36 h-36 invert mr-4" />
        <p
          className={`font-medium text-2xl ${
            selected === section.link ? "text-black" : "text-white"
          }`}
        >
          {section.title}
        </p>
      </button>
    </div>
  ));

  return (
    <div className="flex h-full w-full gap-6">
      {/* Left Menu */}
      <div className="w-1/2 flex flex-col gap-6">
        {renderMenu}
      </div>

      {/* Right Content Area */}
      <div className="w-1/2 bg-white rounded-3xl p-8 ">
        {/* This is the right-side content area */}
      </div>
    </div>
  );
};

export default Dashboard;
