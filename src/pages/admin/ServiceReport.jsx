import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ServiceReports = () => {
  const [serviceReports, setServiceReports] = useState([]);

  // Dummy data for medical services
  const dummyData = [
    {
      id: "1",
      serviceType: "X-ray",
      technicianName: "John Doe",
      serviceDate: "2023-09-15",
      issuesFound: "Fracture in left arm",
      actionsTaken: "X-ray scan performed, referred to orthopedic specialist",
      nextServiceDate: "2023-10-15",
      notes: "Follow-up with the specialist",
    },
    {
      id: "2",
      serviceType: "Lab Test",
      technicianName: "Jane Smith",
      serviceDate: "2023-10-01",
      issuesFound: "High cholesterol levels",
      actionsTaken: "Blood sample taken, report generated",
      nextServiceDate: "2024-04-01",
      notes: "Suggest dietary adjustments and medication",
    },
    {
      id: "3",
      serviceType: "Vaccine",
      technicianName: "Samuel Green",
      serviceDate: "2023-08-20",
      issuesFound: "Due for annual flu shot",
      actionsTaken: "Flu vaccine administered",
      nextServiceDate: "2024-08-20",
      notes: "No immediate reactions, advised rest",
    },
    {
      id: "4",
      serviceType: "Scan",
      technicianName: "Michael Lee",
      serviceDate: "2023-07-15",
      issuesFound: "Abdominal pain",
      actionsTaken: "Ultrasound scan performed",
      nextServiceDate: "2024-01-15",
      notes: "Refer to gastroenterologist for further evaluation",
    },
  ];

  useEffect(() => {
    // Simulate fetching data with the dummy data
    setServiceReports(dummyData);
  }, []);

  // Generate PDF
  const downloadPDF = () => {
    const input = document.getElementById("reportContent");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = 290;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("ServiceReports.pdf");
    });
  };

  // Render service reports table
  const renderServiceReports = serviceReports.length > 0 ? (
    <table className="min-w-full bg-white rounded-lg shadow-md mt-4">
      <thead>
        <tr>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Service Type</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Technician Name</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Service Date</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Issues Found</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Actions Taken</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Next Service Date</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Notes</th>
        </tr>
      </thead>
      <tbody>
        {serviceReports.map(
          (
            {
              id,
              serviceType,
              technicianName,
              serviceDate,
              issuesFound,
              actionsTaken,
              nextServiceDate,
              notes,
            },
            index
          ) => (
            <tr key={id} className="text-center">
              <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{serviceType}</td>
              <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{technicianName}</td>
              <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{new Date(serviceDate).toLocaleDateString()}</td>
              <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{issuesFound}</td>
              <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{actionsTaken}</td>
              <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{new Date(nextServiceDate).toLocaleDateString()}</td>
              <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{notes}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  ) : (
    <Typography className="text-center mt-4 text-red-500">No service reports available.</Typography>
  );

  return (
    <div className="flex flex-1 flex-col w-full gap-12 p-4 sm:p-8">
      <Card className="w-full bg-white rounded-3xl p-4 sm:p-8">
        <Typography variant="h5" className="font-semibold text-dark-blue mb-4 text-lg sm:text-xl">
          Service Reports
        </Typography>
        <div id="reportContent">{renderServiceReports}</div>
        <Button color="blue" className="mt-6 w-full sm:w-auto" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Card>
    </div>
  );
};

export default ServiceReports;
