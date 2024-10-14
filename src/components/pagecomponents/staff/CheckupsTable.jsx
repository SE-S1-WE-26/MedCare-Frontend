// frontend/src/components/pagecomponents/staff/CheckupsTable.jsx

import React, { useState } from "react";
import { Card, Typography, Button, Accordion, AccordionBody } from "@material-tailwind/react";
import { HiOutlineInformationCircle } from "react-icons/hi";

// Updated table headers for staff appointments view
const TABLE_HEAD = ["Date", "Doctor", "Doctor Type", "Appointment Time", "Checkup Type", "Checkup Status", "Actions"];

const TABLE_ROWS = [
  {
    date: "01/01/2023",
    time: "10:00 AM",
    doctorName: "Dr. Smith",
    doctorType: "General Practitioner",
    checkupType: "Annual Check-up",
    checkupStatus: "Completed",
    purpose: "Routine examination and health screening.",
    notes: "All tests normal, next check-up in one year.",
    additionalInfo: "Patient in good health.",
  },
  {
    date: "15/03/2023",
    time: "02:00 PM",
    doctorName: "Dr. Johnson",
    doctorType: "Cardiologist",
    checkupType: "Follow-up",
    checkupStatus: "Pending",
    purpose: "Follow-up on high blood pressure.",
    notes: "Increase Lisinopril dosage if readings remain high.",
    additionalInfo: "Monitor readings for 2 weeks.",
  },
  {
    date: "10/06/2023",
    time: "11:30 AM",
    doctorName: "Dr. Lee",
    doctorType: "Pediatrician",
    checkupType: "Consultation",
    checkupStatus: "Completed",
    purpose: "Cold symptoms consultation.",
    notes: "Prescribed Ibuprofen for fever.",
    additionalInfo: "Follow up if symptoms worsen.",
  },
  {
    date: "20/08/2023",
    time: "09:00 AM",
    doctorName: "Dr. Brown",
    doctorType: "Dermatologist",
    checkupType: "Examination",
    checkupStatus: "Completed",
    purpose: "Skin rash examination.",
    notes: "Recommended topical cream.",
    additionalInfo: "Performed allergy test.",
  },
  {
    date: "05/09/2023",
    time: "03:15 PM",
    doctorName: "Dr. White",
    doctorType: "Orthopedist",
    checkupType: "Consultation",
    checkupStatus: "Pending",
    purpose: "Knee pain consultation.",
    notes: "X-ray taken; advised physiotherapy.",
    additionalInfo: "Follow-up in 2 weeks.",
  },
];

// Staff Appointments Table Component
export function StaffCheckupsTable() {
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
            {TABLE_ROWS.map(({ date, time, doctorName, doctorType, checkupType, checkupStatus, purpose, notes, additionalInfo }, index) => {
              const isOpen = openIndex === index;
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <React.Fragment key={doctorName + date}>
                  <tr>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {date}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {doctorName}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {doctorType}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {time}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {checkupType}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {checkupStatus}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="flex space-x-4">
                        <Button onClick={() => handleToggleAccordion(index)} color="blue" size="sm">
                          {isOpen ? "See Less" : "See More"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={7} className="p-4 bg-blue-gray-50">
                        <Accordion open={isOpen}>
                          <AccordionBody>
                            <div className="grid grid-cols-12 gap-8 justify-center">
                              <div className="col-span-8">
                                <strong className="font-bold text-black">Purpose:</strong>
                                <Typography variant="medium" color="blue-gray" className="font-normal font-poppins">
                                  {purpose}
                                </Typography>
                              </div>
                              <div className="col-span-4">
                                <strong className="font-bold text-black">Notes:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins">
                                  {notes}
                                </Typography>
                              </div>
                              <div className="col-span-12 mt-4">
                                <strong className="font-bold text-black">Additional Info:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins">
                                  {additionalInfo}
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
        {TABLE_ROWS.map(({ date, time, doctorName, doctorType, checkupType, checkupStatus, purpose, notes, additionalInfo }, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={doctorName + date} className="border-b border-blue-gray-100 p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Date:</strong> {date}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Doctor:</strong> {doctorName}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Type:</strong> {doctorType}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Time:</strong> {time}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Checkup Type:</strong> {checkupType}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Checkup Status:</strong> {checkupStatus}
                  </Typography>
                </div>
                <div className="ml-auto flex flex-col space-y-2">
                  <Button onClick={() => handleToggleAccordion(index)} color="blue" size="sm">
                    <HiOutlineInformationCircle className="text-white w-4 h-4" />
                  </Button>
                </div>
              </div>
              {isOpen && (
                <Accordion open={isOpen}>
                  <AccordionBody>
                    <div className="mt-4">
                      <strong className="font-bold text-black">Purpose:</strong>
                      <Typography variant="medium" color="blue-gray" className="font-normal font-poppins">
                        {purpose}
                      </Typography>
                      <div className="mt-6">
                        <strong className="font-bold text-black">Notes:</strong>
                        <Typography variant="small" color="blue-gray" className="font-normal font-poppins">
                          {notes}
                        </Typography>
                      </div>
                      <div className="mt-6">
                        <strong className="font-bold text-black">Additional Info:</strong>
                        <Typography variant="small" color="blue-gray" className="font-normal font-poppins">
                          {additionalInfo}
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
