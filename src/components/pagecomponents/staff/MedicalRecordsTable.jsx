// frontend/src/components/pagecomponents/staff/MedicalRecordsTable.jsx

import React, { useState } from "react";
import { Card, Typography, Button, Accordion, AccordionBody } from "@material-tailwind/react";
import { HiOutlineTrash, HiOutlineInformationCircle, HiOutlinePencilAlt } from "react-icons/hi";


// Updated table headers for hospital staff view
const TABLE_HEAD = ["Date", "Patient Name", "Condition", "Follow-up Date", "Actions"];

const TABLE_ROWS = [
  {
    date: "01/01/2023",
    patientName: "John Doe",
    condition: "High Blood Pressure",
    followUpDate: "01/02/2023",
    symptoms: "Headaches, dizziness",
    notes: "Monitor blood pressure weekly. It's crucial to keep an eye on your blood pressure to prevent complications...",
    treatment: "Prescribed Lisinopril 10mg",
  },
  {
    date: "15/03/2023",
    patientName: "Jane Smith",
    condition: "Annual Check-up",
    followUpDate: "15/09/2023",
    symptoms: "None",
    notes: "All vitals normal; cholesterol slightly high. A follow-up diet consultation is recommended...",
    treatment: "Routine physical examination",
  },
  {
    date: "10/06/2023",
    patientName: "Emily Johnson",
    condition: "Cold/Flu",
    followUpDate: "20/06/2023",
    symptoms: "Cough, runny nose, fatigue",
    notes: "Symptoms resolved within a week, but ensure to stay hydrated and rest adequately...",
    treatment: "Rest and hydration; prescribed Ibuprofen",
  },
  {
    date: "20/08/2023",
    patientName: "Michael Brown",
    condition: "Allergy Reaction",
    followUpDate: "20/09/2023",
    symptoms: "Sneezing, itchy eyes",
    notes: "Avoid exposure to allergens; consider using air purifiers to reduce allergy symptoms...",
    treatment: "Prescribed antihistamines",
  },
  {
    date: "05/10/2023",
    patientName: "Sarah Wilson",
    condition: "Follow-up on High Blood Pressure",
    followUpDate: "05/11/2023",
    symptoms: "Elevated blood pressure",
    notes: "Blood pressure still elevated; recheck in one month. Lifestyle changes recommended...",
    treatment: "Increased Lisinopril to 20mg",
  },
];

// Function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export function StaffMedicalRecordsTable() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEdit = (patientName) => {
    // Implement your edit functionality here (e.g., open a modal or redirect)
    alert(`Edit ${patientName}'s record`); // Placeholder action
  };

  const handleDelete = (patientName) => {
    // Implement your delete functionality here
    alert(`Delete ${patientName}'s record`); // Placeholder action
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
            {TABLE_ROWS.map(({ date, patientName, condition, followUpDate, symptoms, notes, treatment }, index) => {
              const isOpen = openIndex === index;
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <React.Fragment key={date}>
                  <tr>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {patientName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {condition}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {followUpDate}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button onClick={() => handleToggleAccordion(index)} color="blue" aria-label="See more details">
                        <HiOutlineInformationCircle size={20} />
                      </Button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={5} className="p-4 bg-blue-gray-50">
                        <Accordion open={isOpen}>
                          <AccordionBody className='lg:px-12'>
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
                            <div className="flex justify-end mt-4">
                              <Button className="mr-2" color="orange" onClick={() => handleEdit(patientName)} aria-label="Edit record">
                                <HiOutlinePencilAlt size={20} />
                              </Button>
                              <Button color="red" onClick={() => handleDelete(patientName)} aria-label="Delete record">
                                <HiOutlineTrash size={20} />
                              </Button>
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
        {TABLE_ROWS.map(({ date, patientName, condition, followUpDate, symptoms, notes, treatment }, index) => {
          const isOpen = openIndex === index; // Check if the current index is open
          
          return (
            <div key={date} className="border-b border-blue-gray-100 p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Date:</strong> {date}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Patient Name:</strong> {patientName}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Condition:</strong> {condition}
                  </Typography>
                </div>
                <Button onClick={() => handleToggleAccordion(index)} color="blue" aria-label="See more details">
                  <HiOutlineInformationCircle size={20} />
                </Button>
              </div>
              {isOpen && ( // Display additional info when accordion is open
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
                      <div className="flex justify-end mt-4">
                        <Button className="mr-2" color="orange" onClick={() => handleEdit(patientName)} aria-label="Edit record">
                          <HiOutlinePencilAlt size={20} />
                        </Button>
                        <Button color="red" onClick={() => handleDelete(patientName)} aria-label="Delete record">
                          <HiOutlineTrash size={20} />
                        </Button>
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
