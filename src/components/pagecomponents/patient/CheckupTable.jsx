// frontend/src/components/pagecomponents/patient/PatientCheckupsTable.jsx

import React, { useState } from "react";
import { Card, Typography, Button, Accordion, AccordionBody } from "@material-tailwind/react";
import { HiOutlineInformationCircle } from "react-icons/hi";

// Simplified table headers for a specific patient's checkups view
const TABLE_HEAD = ["Date", "Doctor", "Checkup Status"];

const TABLE_ROWS = [
  {
    date: "15/03/2023",
    doctorName: "Dr. Johnson",
    checkupStatus: "Pending",
    purpose: "Follow-up on high blood pressure.",
    notes: "Increase Lisinopril dosage if readings remain high.",
    additionalInfo: "Monitor readings for 2 weeks.",
  },
  {
    date: "10/06/2023",
    doctorName: "Dr. Lee",
    checkupStatus: "Completed",
    purpose: "Cold symptoms consultation.",
    notes: "Prescribed Ibuprofen for fever.",
    additionalInfo: "Follow up if symptoms worsen.",
  },
  {
    date: "20/08/2023",
    doctorName: "Dr. Brown",
    checkupStatus: "Completed",
    purpose: "Skin rash examination.",
    notes: "Recommended topical cream.",
    additionalInfo: "Performed allergy test.",
  },
  {
    date: "05/09/2023",
    doctorName: "Dr. White",
    checkupStatus: "Pending",
    purpose: "Knee pain consultation.",
    notes: "X-ray taken; advised physiotherapy.",
    additionalInfo: "Follow-up in 2 weeks.",
  },
];

// Patient Checkups Table Component
export function PatientCheckupTable() {
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
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-3"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 font-poppins text-sm"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ date, doctorName, checkupStatus, purpose, notes, additionalInfo }, index) => {
              const isOpen = openIndex === index;
              const classes = "p-3 border-b border-blue-gray-50";

              return (
                <React.Fragment key={doctorName + date}>
                  <tr>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                        {date}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                        {doctorName}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                        {checkupStatus}
                      </Typography>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={3} className="p-3 bg-blue-gray-50">
                        <Accordion open={isOpen}>
                          <AccordionBody>
                            <div className="grid grid-cols-12 gap-8">
                              <div className="col-span-12">
                                <strong className="font-bold text-black">Purpose:</strong>
                                <Typography variant="medium" color="blue-gray" className="font-normal font-poppins text-sm">
                                  {purpose}
                                </Typography>
                              </div>
                              <div className="col-span-12 mt-4">
                                <strong className="font-bold text-black">Notes:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                                  {notes}
                                </Typography>
                              </div>
                              <div className="col-span-12 mt-4">
                                <strong className="font-bold text-black">Additional Info:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
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
        {TABLE_ROWS.map(({ date, doctorName, checkupStatus, purpose, notes, additionalInfo }, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={doctorName + date} className="border-b border-blue-gray-100 p-3">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                    <strong>Date:</strong> {date}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                    <strong>Doctor:</strong> {doctorName}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                    <strong>Status:</strong> {checkupStatus}
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
                      <Typography variant="medium" color="blue-gray" className="font-normal font-poppins text-sm">
                        {purpose}
                      </Typography>
                      <div className="mt-4">
                        <strong className="font-bold text-black">Notes:</strong>
                        <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
                          {notes}
                        </Typography>
                      </div>
                      <div className="mt-4">
                        <strong className="font-bold text-black">Additional Info:</strong>
                        <Typography variant="small" color="blue-gray" className="font-normal font-poppins text-sm">
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
