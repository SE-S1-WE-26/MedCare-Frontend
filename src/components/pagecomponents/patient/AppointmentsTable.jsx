import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import images from "../../../constants/images";
import { HiOutlineChatAlt2, HiOutlineInformationCircle } from "react-icons/hi";

// Sample Data
const TABLE_HEAD = ["Doctor", "Doctor Type", "Appointment", "Action"];
const TABLE_ROWS = [
  {
    date: "01/01/2023",
    time: "10:00 AM",
    doctorName: "Dr. Smith",
    doctorType: "General Practitioner",
    doctorPic: images.doctor, // Example profile picture URL
    purpose: "Annual Check-up",
    notes: "Routine examination and health screening.",
    additionalInfo: "All tests normal, next check-up in one year.",
  },
  {
    date: "15/03/2023",
    time: "02:00 PM",
    doctorName: "Dr. Johnson",
    doctorType: "Cardiologist",
    doctorPic: images.doctor,
    purpose: "Follow-up on High Blood Pressure",
    notes: "Review medication and blood pressure readings.",
    additionalInfo: "Increase Lisinopril dosage if readings remain high.",
  },
  {
    date: "10/06/2023",
    time: "11:30 AM",
    doctorName: "Dr. Lee",
    doctorType: "Pediatrician",
    doctorPic: images.doctor,
    purpose: "Consultation for Cold Symptoms",
    notes: "Prescribed Ibuprofen for fever.",
    additionalInfo: "Monitor symptoms; follow up if they worsen.",
  },
  {
    date: "20/08/2023",
    time: "09:00 AM",
    doctorName: "Dr. Brown",
    doctorType: "Dermatologist",
    doctorPic: images.doctor,
    purpose: "Skin Rash Examination",
    notes: "Performed allergy test.",
    additionalInfo: "Recommended topical cream for treatment.",
  },
  {
    date: "05/09/2023",
    time: "03:15 PM",
    doctorName: "Dr. White",
    doctorType: "Orthopedist",
    doctorPic: images.doctor,
    purpose: "Knee Pain Consultation",
    notes: "X-ray taken; advised physiotherapy.",
    additionalInfo: "Follow-up appointment scheduled for 2 weeks later.",
  },
];


// Function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
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
            {TABLE_ROWS.map(
              (
                {
                  doctorPic,
                  doctorName,
                  doctorType,
                  date,
                  time,
                  purpose,
                  notes,
                  additionalInfo,
                },
                index
              ) => {
                const isOpen = openIndex === index;
                const classes = "p-4 border-b border-blue-gray-50";

                return (
                  <React.Fragment key={doctorName + date}>
                    <tr>
                      {/* Doctor Profile */}
                      <td className={classes}>
                        <div className="flex items-center">
                          <img
                            src={doctorPic}
                            alt={doctorName}
                            className="w-12 h-12 rounded-xl bg-light-blue mr-4"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-poppins font-medium"
                          >
                            {doctorName}
                          </Typography>
                        </div>
                      </td>

                      {/* Doctor Type */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium"
                        >
                          {doctorType}
                        </Typography>
                      </td>

                      {/* Appointment Date & Time */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium text-xs" // Smaller text
                        >
                          {date} at {time}
                        </Typography>
                      </td>

                      {/* Action Buttons */}
                      <td className={classes}>
                        <div className="flex space-x-4">
                          <Button color="green" size="sm">
                            Chat
                          </Button>
                          <Button
                            onClick={() => handleToggleAccordion(index)}
                            color="blue"
                            size="sm"
                          >
                            {isOpen ? "See Less" : "See More"}
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Additional Info */}
                    {isOpen && (
                      <tr>
                        <td colSpan={4} className="p-4 bg-blue-gray-50">
                          <Accordion open={isOpen}>
                            <AccordionBody>
                              <div className="grid grid-cols-8 gap-8 justify-center">
                                <div className="col-span-6">
                                  <strong className="font-bold text-black">
                                    Additional Info:
                                  </strong>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal font-poppins font-medium"
                                  >
                                    {additionalInfo}
                                  </Typography>
                                </div>
                                <div className="col-span-2">
                                  <strong className="font-bold text-black">
                                    Notes:
                                  </strong>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal font-poppins font-medium"
                                  >
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
              }
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {TABLE_ROWS.map(
          (
            {
              doctorPic,
              doctorName,
              doctorType,
              date,
              time,
              purpose,
              notes,
              additionalInfo,
            },
            index
          ) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={doctorName + date}
                className="border-b border-blue-gray-100 p-4"
              >
                {/* Doctor Info Row */}
                <div className="flex items-center">
                  {/* Doctor Profile Picture */}
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      src={doctorPic}
                      alt={doctorName}
                      className="h-full w-full rounded-xl bg-light-blue object-cover"
                    />
                  </div>

                  {/* Doctor Info and Appointment Date & Time */}
                  <div className="ml-4 flex-1 flex flex-col justify-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium font-poppins"
                    >
                      <strong>{doctorName}</strong>
                    </Typography>
                    <Typography
                      color="slate"
                      className="font-normal font-poppins text-xs"
                    >
                      {doctorType}
                    </Typography>
                    <Typography
                      color="slate"
                      className="font-normal font-poppins mt-1 text-xs"
                    >
                      {date} | {time}
                    </Typography>
                  </div>

                  {/* Chat and See More/Less Buttons */}
                  <div className="ml-auto flex flex-col space-y-2">
                    <Button color="green" size="sm">
                      <HiOutlineChatAlt2 className="text-white w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleToggleAccordion(index)}
                      color="blue"
                      size="sm"
                    >
                      {isOpen ? (
                        <HiOutlineInformationCircle className="text-white w-4 h-4" />
                      ) : (
                        <HiOutlineInformationCircle className="text-white w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expandable Additional Info */}
                {isOpen && (
                  <div className="mt-4">
                    <Accordion open={isOpen}>
                      <AccordionBody>
                        <div>
                          <div>
                            <strong className="font-bold text-black">
                              Additional Info:
                            </strong>
                            <Typography
                              variant="medium"
                              color="blue-gray"
                              className="font-normal font-poppins"
                            >
                              {additionalInfo}
                            </Typography>
                          </div>
                          <div className="mt-6">
                            <strong className="font-bold text-black">
                              Notes:
                            </strong>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal font-poppins"
                            >
                              {notes}
                            </Typography>
                          </div>
                        </div>
                      </AccordionBody>
                    </Accordion>
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </Card>
  );
};

export default AppointmentsTable;
