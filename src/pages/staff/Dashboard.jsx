import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { Card, Typography } from "@material-tailwind/react";
import PageTitle from "../../components/pagecomponents/PageTitle";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StaffDashboard = () => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    {
      title: "Add New Patient",
      link: "/staff/patients",
      color: "bg-dark-blue",
      icon: icons.profile,
    },
    {
      title: "Medical Records",
      link: "/staff/medical-records",
      color: "bg-purple-800",
      icon: icons.medical,
    },
    {
      title: "Appointments",
      link: "/staff/appointments",
      color: "bg-blue-800",
      icon: icons.appointment,
    },
    {
      title: "Checkups",
      link: "/staff/checkups",
      color: "bg-red-800",
      icon: icons.checkups,
    },
  ];

  // Sample data for the bar chart
  const chartData = {
    labels: ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    datasets: [
      {
        label: "Peak Login Hours",
        data: [2, 5, 1, 10, 15, 12, 9, 4],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Logins",
        },
        beginAtZero: true,
      },
    },
  };

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
        <img
          src={section.icon}
          alt={section.title}
          className="w-12 h-12 sm:w-12 sm:h-12 invert"
        />
        <p
          className={`font-medium text-lg lg:text-xl ${
            selected === section.link ? "text-black" : "text-white"
          }`}
        >
          {section.title}
        </p>
      </Card>
    </div>
  ));

  return (
    <div className="flex flex-1 flex-col md:flex-row w-full gap-12">
      {/* Left Menu */}
      <div className="w-full md:w-1/3 rounded-3xl">
        <PageTitle label="Staff Dashboard" />
        <div className="w-full flex flex-col gap-6 mt-6">{renderMenu}</div>
      </div>

      {/* Right Content Area */}
      <Card className="hidden md:flex w-full md:w-2/3 bg-white rounded-3xl p-8 gap-4">
        <div className="">
          <Typography
            color="gray"
            className="text-4xl font-medium font-poppins flex flex-row"
          >
            <p className="text-blue-500 text-5xl">Caring</p>
            <p className="ml-3">for patients,</p>
          </Typography>
          <Typography
            color="gray"
            className="text-4xl font-medium font-poppins mt-2 flex flex-row"
          >
            changing{" "}
            <p className="text-blue-500 ml-4 text-5xl font-bold">lives.</p>
          </Typography>
        </div>
        <div className="flex flex-row w-full items-center gap-4 mt-4">
          <div className="w-full">
            <img src={images.art4} className="h-auto" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StaffDashboard;
