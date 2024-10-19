import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Accordion, AccordionBody } from "@material-tailwind/react";
import {formatDate} from '../../../utils/dateUtils';

const TABLE_HEAD = ["Date", "Condition", "Notes", "Follow-up Date", "Action"];

export function MedicalRecordsTable() {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user);
  const Host_Ip = process.env.REACT_APP_HOST_IP || "https://medcare-backend.vercel.app";
  
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // Fetch medical records
  const fetchMedicalRecords = async () => {
    try {
      const response = await fetch(`${Host_Ip}/patient/medical/user/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        setMedicalRecords(data); // Set the fetched data to state
      } else {
        console.error("Failed to fetch medical records");
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  // Fetch records on component mount
  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleToggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Card className="w-full">
      {/* Desktop View */}
      <div className="hidden lg:block">
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 font-poppins"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map(({ date, condition, notes, followUpDate, symptoms, treatment }, index) => {
              const isOpen = openIndex === index;
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <React.Fragment key={index}>
                  <tr>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {formatDate(date)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {condition}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {truncateText(notes, 30)} {/* Truncated to 30 characters */}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {formatDate(followUpDate)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button onClick={() => handleToggleAccordion(index)} color="blue">
                        See More
                      </Button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={5} className="p-4 bg-blue-gray-50">
                        <Accordion open={isOpen}>
                          <AccordionBody>
                            <div className="grid grid-cols-8 gap-8 justify-center">
                              <div className="col-span-2">
                                <strong className="font-bold text-black">Symptoms:</strong>
                                <Typography variant="medium" color="blue-gray" className="font-normal font-poppins font-medium">
                                  {symptoms}
                                </Typography>
                              </div>
                              <div className="col-span-4">
                                <strong className="font-bold text-black">Notes:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                  {notes}
                                </Typography>
                              </div>
                              <div className="col-span-2">
                                <strong className="font-bold text-black">Prescription:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                  {treatment}
                                </Typography>
                              </div>
                            </div>
                          </AccordionBody>
                        </Accordion>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {medicalRecords.map(({ date, condition, symptoms, notes, treatment }, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div key={index} className="border-b border-blue-gray-100 p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Date:</strong> {date}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Disease:</strong> {condition}
                  </Typography>
                </div>
                <Button onClick={() => handleToggleAccordion(index)} color="blue">
                  {isOpen ? "See Less" : "See More"}
                </Button>
              </div>
              {isOpen && (
                <Accordion open={isOpen}>
                  <AccordionBody>
                    <div className="mt-2">
                      <div>
                        <strong className="font-bold text-black">Symptoms:</strong>
                        <Typography variant="medium" color="blue-gray" className="font-normal font-poppins font-medium">
                          {symptoms}
                        </Typography>
                      </div>
                      <div className="mt-6">
                        <strong className="font-bold text-black">Notes:</strong>
                        <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                          {notes}
                        </Typography>
                      </div>
                      <div className="mt-6">
                        <strong className="font-bold text-black">Prescription:</strong>
                        <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                          {treatment}
                        </Typography>
                      </div>
                    </div>
                  </AccordionBody>
                </Accordion>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
