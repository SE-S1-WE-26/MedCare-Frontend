// src/StaffDashboard.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import PageTitle from "../../components/pagecomponents/PageTitle";
import BarChart from "../../components/pagecomponents/admin/charts/BarChart";
// import LineChart from "../../components/pagecomponents/admin/charts/LineChart";
import PieChart from "../../components/pagecomponents/admin/charts/PieChart";
import PatientReports from "./PatientReport";

const StaffDashboard = () => {
  const [selected, setSelected] = useState("/");
  const [showPatientReport, setShowPatientReport] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const togglePatientReport = () => {
    setShowPatientReport(!showPatientReport);
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
    <div className="flex flex-1 flex-col w-full gap-12 p-4">
      <div className="w-full rounded-3xl">
        <PageTitle label="Admin Dashboard" />
      </div>

      <Card className="flex w-full bg-white rounded-3xl p-4 md:p-8 gap-4">
        <div className="flex flex-col w-full items-center gap-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 w-full">
            <PieChart />
            <BarChart />
            {/* <LineChart /> */}
          </div>

          {/* Button to toggle patient report */}
          <div className="w-full">
            <Card
              onClick={togglePatientReport}
              className="cursor-pointer w-full px-4 py-4 lg:py-8 border-2 rounded-3xl border-light-blue flex flex-row justify-between items-center bg-blue-800"
            >
              <p className="font-medium text-lg lg:text-xl text-white">
                View Patient's Medical Records
              </p>
            </Card>
            {/* Render the Patient Report when the button is clicked */}
            {showPatientReport && (
              <div className="mt-4 mb-8">
                <PatientReports />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StaffDashboard;
