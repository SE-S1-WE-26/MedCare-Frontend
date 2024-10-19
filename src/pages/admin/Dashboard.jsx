// src/StaffDashboard.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import PageTitle from "../../components/pagecomponents/PageTitle";
import BarChart from "../../components/pagecomponents/admin/charts/BarChart";
import PieChart from "../../components/pagecomponents/admin/charts/PieChart";
import PatientReports from "./PatientReport";
import ServiceReports from "./ServiceReport";

const StaffDashboard = () => {
  const [selected, setSelected] = useState("/");
  const [showPatientReport, setShowPatientReport] = useState(false);
  const [showServiceReport, setShowServiewReport] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const togglePatientReport = () => {
    setShowPatientReport(true);
    setShowServiewReport(false);


  };
  const toggleServiewReport = () => {
    setShowServiewReport(true);
    setShowPatientReport(false);


  };

  const sections = [
    {
      title: "Medical Records",
      link: "/staff/medical-records",
      color: "bg-purple-800",
      icon: icons.medical,
    },
  ];

  return (
    <div className="flex flex-1 flex-col w-full gap-8 p-6 bg-gray-50">
      {/* Page Title */}
      <div className="w-full mb-6">
        <PageTitle label="Health Authority Dashboard" />
      </div>

      {/* Overview Cards & Charts Section */}
      <div className="flex flex-col w-full gap-8">
        {/* Charts Section */}
        <Card className="w-full bg-white shadow-lg rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* PieChart and BarChart */}
            <PieChart />
            <BarChart />
            {/* <LineChart /> */}
            <div className="space-y-4">
              {/* Medical Records Section */}
              <Card
                className="cursor-pointer w-full p-6 bg-deep-orange-400 hover:bg-deep-orange-700 transition duration-300 ease-in-out shadow-md rounded-xl flex items-center justify-between"
                onClick={togglePatientReport}
              >
                <Typography variant="h6" className="text-white font-semibold">
                  View Patient's Medical Records
                </Typography>
                <img
                  src={icons.medical}
                  alt="Medical Icon"
                  className="h-6 w-6"
                />
              </Card>
              {/* Medical Records Section */}
              <Card
                className="cursor-pointer w-full p-6 bg-teal-600 hover:bg-blue-700 transition duration-300 ease-in-out shadow-md rounded-xl flex items-center justify-between"
                onClick={toggleServiewReport}
              >
                <Typography variant="h6" className="text-white font-semibold">
                  service utilization
                </Typography>
                <img src={icons.lab} alt="Medical Icon" className="h-6 w-6" />
              </Card>
            </div>
          </div>
        </Card>

        {/* Show Patient Report Section */}
        {showPatientReport && (
          <Card className="w-full mt-6 bg-white shadow-md p-6 rounded-xl">
            <PatientReports />
          </Card>
        )}
        {/* Show Patient Report Section */}
        {showServiceReport && (
          <Card className="w-full mt-6 bg-white shadow-md p-6 rounded-xl">
            <ServiceReports />
          </Card>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
