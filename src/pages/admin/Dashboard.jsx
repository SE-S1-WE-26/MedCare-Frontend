import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
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
    <div className="flex flex-1 flex-col w-full gap-12">
        <div className="w-full rounded-3xl">
        <PageTitle label="Admin Dashboard" />
      </div>

      {/* Right Content Area */}
      <Card className="hidden flex w-full bg-white rounded-3xl p-8 gap-4">
        <div className="flex flex-row w-full items-center gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4 justify-center">
          <div className="flex flex-col gap-2">
          <Card className="p-4 max-w-[500px] flex flex-row justify-between items-center border-2 border-light-blue px-6">
              <Typography className="font-semibold text-dark-blue">
                No. of Users
              </Typography>
              <Typography className="font-semibold text-dark-blue text-2xl">
                10,578
              </Typography>
            </Card>
            <Card className="pt-14 p-8 pr-10 max-w-96 border-2 border-light-blue">
              <CardHeader className="py-4 px-6 items-center text-center">No. of Logins</CardHeader>
              <CardBody>
              <div>
                <Bar data={chartData} options={chartOptions} />
              </div>
              </CardBody>
            </Card>
            </div>
            <div className="flex flex-col gap-2">
            <Card className="p-4 max-w-[500px] flex flex-row justify-between items-center border-2 border-light-blue px-6">
              <Typography className="font-semibold text-dark-blue">
                No. of Users
              </Typography>
              <Typography className="font-semibold text-dark-blue text-2xl">
                10,578
              </Typography>
            </Card>
            <Card className="pt-14 p-8 pr-10 max-w-96 border-2 border-light-blue">
              <CardHeader className="py-4 px-6 items-center text-center">No. of Logins</CardHeader>
              <CardBody>
              <div>
                <Bar data={chartData} options={chartOptions} />
              </div>
              </CardBody>
            </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StaffDashboard;
