import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import PageTitle from '../../components/pagecomponents/PageTitle';
import icons from '../../constants/icons';
import {BookedServicesTable} from '../../components/pagecomponents/patient/BookedServicesTable.jsx';

const Services = () => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    {
      title: "X-ray",
      link: "/patient/services-form/6713e466c24782e1c6697ea1",
      color: "bg-blue-500", // Purple background
      icon: icons.xray,
    },
    {
      title: "Lab Test",
      link: "/patient/services-form/6713e495c24782e1c6697ea3",
      color: "bg-orange-300", // Dark blue background
      icon: icons.labtest,
    },
    {
      title: "Vaccine",
      link: "/patient/services-form/6713e4aac24782e1c6697ea5",
      color: "bg-green-500", // Dark blue background
      icon: icons.vaccine,
    },
    {
      title: "Scan",
      link: "/patient/services-form/6713e4d3c24782e1c6697ea7",
      color: "bg-gray-800", // Dark blue background
      icon: icons.bodyScan,
    },
  ];

  // Menu rendering
  const renderMenu = sections.map((section, index) => (
    <div
      key={index}
      onClick={() => handleMenuClick(section.link)}
      className="cursor-pointer"
    >
      <Card
        className={`px-6 py-5 mt-2 border-2 rounded-3xl border-light-blue flex flex-col justify-center items-center ${
          selected === section.link ? "bg-light-blue" : section.color
        }`}
      >
        <img
          src={section.icon}
          alt={section.title}
          className="w-20 h-20 invert"
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
      <div className="flex w-full justify-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {renderMenu}
        </div>
      </div>
      <div className="mt-12">
      <p className="text-lg md:text-xl lg:text-2xl font-bold mr-2 text-center mb-4">Booked Services</p>
      <BookedServicesTable/>
      </div>
    </div>
  );
};

export default Services;
