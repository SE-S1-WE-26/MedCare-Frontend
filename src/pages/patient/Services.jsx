import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import PageTitle from '../../components/pagecomponents/PageTitle';
import icons from '../../constants/icons';

const Services = () => {

  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    {
      title: "Checkups",
      link: "/patient/checkups",
      color: "bg-purple-800", // Purple background
      icon: icons.checkups,
    },
    {
      title: "Emergency Guidance",
      link: "/patient/emergency",
      color: "bg-blue-800", // Dark blue background
      icon: icons.emergency,
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
        className={`w-full px-6 py-10 border-2 rounded-3xl border-light-blue flex justify-center items-center ${
          selected === section.link ? "bg-light-blue" : section.color
        }`}
      >
        <img
          src={section.icon}
          alt={section.title}
          className="w-24 h-24 invert"
        />
        <p
          className={`font-medium text-2xl text-center ${
            selected === section.link ? "text-black" : "text-white"
          }`}
        >
          {section.title}
        </p>
      </Card>
    </div>
  ));

  return (
    <div className='w-full'>
      <PageTitle label="Services" />
      <div className="flex w-full items-center justify-center">
      <div className="w-full md:w-1/2 flex flex-col gap-6">{renderMenu}</div>
      </div>
    </div>
  )
}

export default Services