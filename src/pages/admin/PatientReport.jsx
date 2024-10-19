import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PatientReports = () => {
  const [patientReports, setPatientReports] = useState([]);

  const Host_Ip = process.env.Host_Ip || "http://localhost:8010";

  // Fetch patient data from DB
  const fetchPatientReports = async () => {
    try {
      const response = await axios.get(`${Host_Ip}/patient/medical/all`);
      setPatientReports(response.data);
    } catch (error) {
      console.error("Error fetching patient reports:", error);
    }
  };

  useEffect(() => {
    fetchPatientReports();
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

      pdf.save("PatientReports.pdf");
    });
  };

  // Render patient reports table
  const renderPatientReports = patientReports.length > 0 ? (
    <table className="min-w-full bg-white rounded-lg shadow-md mt-4">
      <thead>
        <tr>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Patient Name</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Date</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Condition</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Follow-up Date</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Symptoms</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Notes</th>
          <th className="py-2 px-2 sm:px-4 bg-blue-800 text-white text-xs sm:text-sm">Prescription</th>
        </tr>
      </thead>
      <tbody>
        {patientReports.map(({ _id, pname, date, condition, followUpDate, symptoms, notes, prescription }, index) => (
          <tr key={_id} className="text-center">
            <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{pname}</td>
            <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{new Date(date).toLocaleDateString()}</td>
            <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{condition}</td>
            <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{new Date(followUpDate).toLocaleDateString()}</td>
            <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{symptoms}</td>
            <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{notes}</td>
            <td className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">{prescription}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <Typography className="text-center mt-4 text-red-500">No patient reports available.</Typography>
  );

  return (
    <div className="flex flex-1 flex-col w-full gap-12 p-4 sm:p-8">
      <Card className="w-full bg-white rounded-3xl p-4 sm:p-8">
        <Typography variant="h5" className="font-semibold text-dark-blue mb-4 text-lg sm:text-xl">
          Patient Medical Reports
        </Typography>
        <div id="reportContent">{renderPatientReports}</div>
        <Button color="blue" className="mt-6 w-full sm:w-auto" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Card>
    </div>
  );
};

export default PatientReports;
