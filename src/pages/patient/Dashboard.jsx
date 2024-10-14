import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import { Card } from '@material-tailwind/react';
import PageTitle from "../../components/pagecomponents/PageTitle";

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
      <Card
        className={`w-full px-6 py-8 lg:py-10 border-2 rounded-3xl border-light-blue flex justify-center items-center ${
          selected === section.link ? "bg-light-blue" : section.color
        }`}
      >
        <img src={section.icon} alt={section.title} className="w-12 h-12 sm:w-32 sm:h-32  invert" />
        <p
          className={`font-medium text-lg lg:text-2xl ${
            selected === section.link ? "text-black" : "text-white"
          }`}
        >
          {section.title}
        </p>
      </Card>
    </div>
  ));

  return (
    <div className="flex flex-col md:flex-row h-full w-full gap-6">
      {/* Left Menu */}
      <PageTitle label="Patient Dashboard" />
      <div className="w-full md:w-1/2 flex flex-col gap-6 -mt-6">
        {renderMenu}
      </div>

      {/* Right Content Area */}
      <Card className="w-full md:w-1/2 bg-white rounded-3xl p-8">
        {/* This is the right-side content area */}
        {/* You can add content or components here as needed */}
      </Card>
    </div>
  );
};

export default Dashboard;
