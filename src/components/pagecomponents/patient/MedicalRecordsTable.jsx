import React, { useState } from "react";
import { Card, Typography, Button, Accordion, AccordionBody } from "@material-tailwind/react";

const TABLE_HEAD = ["Date", "Condition", "Notes", "Follow-up Date", "Action"];

const TABLE_ROWS = [
  {
    date: "01/01/2023",
    condition: "High Blood Pressure",
    notes: "Monitor blood pressure weekly. It's crucial to keep an eye on your blood pressure to prevent complications...",
    followUpDate: "01/02/2023",
    symptoms: "Headaches, dizziness",
    treatment: "Prescribed Lisinopril 10mg",
  },
  {
    date: "15/03/2023",
    condition: "Annual Check-up",
    notes: "All vitals normal; cholesterol slightly high. A follow-up diet consultation is recommended...",
    followUpDate: "15/09/2023",
    symptoms: "None",
    treatment: "Routine physical examination",
  },
  {
    date: "10/06/2023",
    condition: "Cold/Flu",
    notes: "Symptoms resolved within a week, but ensure to stay hydrated and rest adequately...",
    followUpDate: "20/06/2023",
    symptoms: "Cough, runny nose, fatigue",
    treatment: "Rest and hydration; prescribed Ibuprofen",
  },
  {
    date: "20/08/2023",
    condition: "Allergy Reaction",
    notes: "Avoid exposure to allergens; consider using air purifiers to reduce allergy symptoms...",
    followUpDate: "20/09/2023",
    symptoms: "Sneezing, itchy eyes",
    treatment: "Prescribed antihistamines",
  },
  {
    date: "05/10/2023",
    condition: "Follow-up on High Blood Pressure",
    notes: "Blood pressure still elevated; recheck in one month. Lifestyle changes recommended...",
    followUpDate: "05/11/2023",
    symptoms: "Elevated blood pressure",
    treatment: "Increased Lisinopril to 20mg",
  },
];

// Function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export function MedicalRecordsTable() {
  const [openIndex, setOpenIndex] = useState(null);

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
            {TABLE_ROWS.map(({ date, condition, notes, followUpDate, symptoms, treatment }, index) => {
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
                        {followUpDate}
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
        {TABLE_ROWS.map(({ date, condition, symptoms, notes, treatment }, index) => {
          const isOpen = openIndex === index; // Check if the current index is open
          
          return (
            <div key={date} className="border-b border-blue-gray-100 p-4">
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
