import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import images from "../../constants/images"; 
import { Card, Typography } from "@material-tailwind/react";
import PageTitle from "../../components/pagecomponents/PageTitle"; // Assuming you're using PageTitle here

const StaffDashboard = () => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    {
      title: "Medical Records",
      link: "/staff/medical-records",
      color: "bg-purple-800", // Purple background
      icon: icons.medical,
    },
    {
      title: "Appointments",
      link: "/staff/appointments",
      color: "bg-blue-800", // Dark blue background
      icon: icons.appointment,
    },
    {
      title: "Checkups",
      link: "/staff/checkups",
      color: "bg-red-800", // Dark red background
      icon: icons.checkups,
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
        <img src={section.icon} alt={section.title} className="w-12 h-12 sm:w-32 sm:h-32 invert" />
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
      <div className="w-full md:w-1/2 rounded-3xl p-8">
        <PageTitle label="Staff Dashboard" /> {/* Assuming you want to use PageTitle here */}
        <div className="w-full flex flex-col gap-6 mt-6">
          {renderMenu}
        </div>
      </div>

      {/* Right Content Area */}
      <Card className="hidden md:flex w-full md:w-1/2 bg-white rounded-3xl p-8 items-center">
        {/* This is the right-side content area */}
        <div className="absolute left-12 top-12">
          <Typography color="gray" className="text-4xl font-medium font-poppins flex flex-row"><p className="text-blue-500 text-5xl">Caring</p><p className="ml-3">for patients,</p></Typography>
          <Typography color="gray" className="text-4xl font-medium font-poppins mt-2 flex flex-row">changing <p className="text-blue-500 ml-4 text-5xl font-bold">lives.</p></Typography>
        </div>
        <img src={images.art5} alt="Staff Dashboard" className="w-full my-auto" />
      </Card>
    </div>
  );
};

export default StaffDashboard;
