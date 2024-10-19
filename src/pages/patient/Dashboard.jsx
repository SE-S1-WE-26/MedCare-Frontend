import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import images from "../../constants/images"; 
import { Card, Typography } from '@material-tailwind/react';
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
      color: "bg-blue-800",
      icon: icons.medical,
    },
    {
      title: "Lab Reports",
      link: "/patient/lab-reports",
      color: "bg-red-800",
      icon: icons.lab,
    },
    {
      title: "Medical Profile",
      link: "/patient/medical-profile",
      color: "bg-purple-800",
      icon: icons.profile,
    },
  ];

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Effect to update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    };

    updateDateTime(); // Initial call
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Menu rendering
  const renderMenu = sections.map((section, index) => (
    <div
      key={index}
      onClick={() => handleMenuClick(section.link)}
      className="cursor-pointer w-full"
    >
      <Card
        className={`w-full px-12 py-4 lg:py-8 border-2 rounded-3xl border-light-blue flex flex-row justify-between items-center ${
          selected === section.link ? "bg-light-blue" : section.color
        }`}
      >
        <img src={section.icon} alt={section.title} className="w-12 h-12 sm:w-14 sm:h-14 invert" />
        <p
          className={`font-medium ml-4 text-lg lg:text-xl ${
            selected === section.link ? "text-black" : "text-white"
          }`}
        >
          {section.title}
        </p>
      </Card>
    </div>
  ));

  return (
    <div className="flex flex-1 flex-col md:flex-row w-full gap-6 md:gap-12">
      {/* Left Menu */}
      <div className="w-full md:w-1/3 rounded-3xl">
        <PageTitle label="Patient Dashboard" />
        <div className="w-full flex flex-col gap-6 mt-6">
          {renderMenu}
        </div>
      </div>

      {/* Right Content Area */}
      <Card className="hidden lg:flex w-full md:w-2/3">
        {/* This is the right-side content area */}
        <div className="absolute left-4 top-4 md:left-12 md:top-12">
          <Typography color="gray" className="text-3xl md:text-4xl font-medium font-poppins flex flex-row">Your <p className="text-blue-500 ml-1">&nbsp;Health,</p></Typography>
          <Typography color="gray" className="text-4xl md:text-5xl font-medium font-poppins mt-2 flex flex-row">Your <p className="text-blue-500 ml-1 font-bold text-4xl md:text-5xl">&nbsp;Wealth.</p></Typography>
        </div>
        {/* Current Date and Time */}
        <div className="absolute left-4 bottom-4 md:left-12 md:bottom-12">
          <Typography color="blue" className="text-xl md:text-3xl font-medium font-poppins">
            {currentDate}
          </Typography>
          <Typography color="gray" className="text-3xl md:text-6xl font-medium font-poppins font-semibold">
            {currentTime}
          </Typography>
        </div>
        <img src={images.art4} alt="Staff Dashboard" className="max-w-48 md:max-w-64 my-auto absolute bottom-4 right-4 md:bottom-12 md:right-12" />
      </Card>
    </div>
  );
};

export default Dashboard;
