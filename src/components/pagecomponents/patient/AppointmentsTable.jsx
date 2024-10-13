import React, { useState } from "react";
import { Card, Typography, Button, Accordion, AccordionBody } from "@material-tailwind/react";

const TABLE_HEAD = ["Date", "Time", "Doctor", "Purpose", "Action"];

const TABLE_ROWS = [
  {
    date: "01/01/2023",
    time: "10:00 AM",
    doctor: "Dr. Smith",
    purpose: "Annual Check-up",
    notes: "Routine examination and health screening.",
    additionalInfo: "All tests normal, next check-up in one year.",
  },
  {
    date: "15/03/2023",
    time: "02:00 PM",
    doctor: "Dr. Johnson",
    purpose: "Follow-up on High Blood Pressure",
    notes: "Review medication and blood pressure readings.",
    additionalInfo: "Increase Lisinopril dosage if readings remain high.",
  },
  {
    date: "10/06/2023",
    time: "11:30 AM",
    doctor: "Dr. Lee",
    purpose: "Consultation for Cold Symptoms",
    notes: "Prescribed Ibuprofen for fever.",
    additionalInfo: "Monitor symptoms; follow up if they worsen.",
  },
  {
    date: "20/08/2023",
    time: "01:00 PM",
    doctor: "Dr. Patel",
    purpose: "Allergy Testing",
    notes: "Skin tests conducted for common allergens.",
    additionalInfo: "Results will be available in a week.",
  },
  {
    date: "05/10/2023",
    time: "09:00 AM",
    doctor: "Dr. Brown",
    purpose: "Routine Physical Examination",
    notes: "Weight and BMI measured; lifestyle recommendations provided.",
    additionalInfo: "Next appointment scheduled for 6 months.",
  },
];

// Function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const AppointmentsTable = () => {
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
            {TABLE_ROWS.map(({ date, time, doctor, purpose, notes, additionalInfo }, index) => {
              const isOpen = openIndex === index;
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <React.Fragment key={date + time}>
                  <tr>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {doctor}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {truncateText(purpose, 30)} {/* Truncated to 30 characters */}
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
                              <div className="col-span-6">
                                <strong className="font-bold text-black">Additional Info:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                  {additionalInfo}
                                </Typography>
                              </div>
                              <div className="col-span-2">
                                <strong className="font-bold text-black">Notes:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                  {notes}
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
        {TABLE_ROWS.map(({ date, time, doctor, purpose, notes, additionalInfo }, index) => {
          const isOpen = openIndex === index; // Check if the current index is open
          
          return (
            <div key={date + time} className="border-b border-blue-gray-100 p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Date:</strong> {date}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Time:</strong> {time}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Doctor:</strong> {doctor}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Purpose:</strong> {purpose}
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
                        <strong className="font-bold text-black">Additional Info:</strong>
                        <Typography variant="medium" color="blue-gray" className="font-normal font-poppins font-medium">
                          {additionalInfo}
                        </Typography>
                      </div>
                      <div className="mt-6">
                        <strong className="font-bold text-black">Notes:</strong>
                        <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                          {notes}
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
};

export default AppointmentsTable;
