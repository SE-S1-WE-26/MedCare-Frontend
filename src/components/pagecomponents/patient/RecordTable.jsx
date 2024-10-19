import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { formatDate } from '../../../utils/dateUtils';
import { truncateText } from "../../../utils/textUtils";

const TABLE_HEAD = ["Date", "Condition", "Notes", "Follow-up Date"];
const RecordsTable = ({ patientId }) => {
  const Host_Ip = process.env.REACT_APP_HOST_IP || "https://medcare-backend.vercel.app";

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  const fetchMedicalRecords = async () => {
    try {
      const response = await fetch(`${Host_Ip}/patient/medical/user/${patientId}`);
      if (response.ok) {
        const data = await response.json();
        setMedicalRecords(data);
      } else {
        setError("Failed to fetch medical records"); // Set error message
      }
    } catch (error) {
      setError("Error fetching medical records: " + error.message); // Set error message
    }
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, [patientId]);

  return (
    <Card className="w-full">
      {error && <Typography variant="small" color="red" className="p-4">{error}</Typography>} {/* Error message */}
      {/* Desktop View */}
      <div className="hidden lg:block">
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70 font-poppins text-sm">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {medicalRecords.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">No medical records found.</td>
              </tr>
            ) : (
              medicalRecords.map(({ date, condition, notes, followUpDate, symptoms, treatment }, index) => {
                const classes = "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                        {formatDate(date)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                        {condition}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                        {truncateText(notes, 100)} {/* Adjust length if needed */}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                        {formatDate(followUpDate)}
                      </Typography>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {medicalRecords.map(({ date, condition, symptoms, notes, treatment }, index) => (
          <div key={index} className="border-b border-blue-gray-100 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
              <strong>Date:</strong> {formatDate(date)}
            </Typography>
            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
              <strong>Disease:</strong> {condition}
            </Typography>
            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
              <strong>Notes:</strong> {truncateText(notes, 100)} {/* Adjust length if needed */}
            </Typography>
            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
              <strong>Symptoms:</strong> {symptoms}
            </Typography>
            <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
              <strong>Prescription:</strong> {treatment}
            </Typography>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecordsTable;
