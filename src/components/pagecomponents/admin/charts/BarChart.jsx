// src/Charts.js

import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const sampleData = {
  barData: {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Number of Patients",
        data: [10, 20, 30, 40, 50],
        backgroundColor: "#42A5F5",
      },
    ],
  },
};

const Charts = () => {
  return (
    <div>
      <h2>Patient Visits (Bar Chart)</h2>
      <Bar data={sampleData.barData} />
    </div>
  );
};

export default Charts;
