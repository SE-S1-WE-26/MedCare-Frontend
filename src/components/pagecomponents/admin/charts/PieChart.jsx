// src/Charts.js

import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Title);

const sampleData = {
  pieData: {
    labels: ['Healthy', 'Diabetic', 'Hypertensive', 'Others'],
    datasets: [
      {
        label: 'Patient Conditions',
        data: [30, 20, 25, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  }
};

const Charts = () => {
  return (
    <div>
      <h2>Patient Condition Distribution (Pie Chart)</h2>
      <Pie data={sampleData.pieData} />

    </div>
  );
};

export default Charts;
