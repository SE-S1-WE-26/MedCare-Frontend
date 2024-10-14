import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import axios from "axios";

// Updated table headers for staff appointments view
const TABLE_HEAD = [
  "Date",
  "Doctor",
  "Doctor Type",
  "Appointment Time",
  "Actions",
];

// Staff Appointments Table Component
export function StaffAppointmentsTable() {
  const [openIndex, setOpenIndex] = useState(null);

  const [appointments, setAppointments] = useState([]);

  const Host_Ip = process.env.Host_Ip || "http://localhost:8010";

  const fetchAppointmentDetails = async () => {
    try {
      const appointmentResponse = await axios.get(
        `${Host_Ip}/patient/appointments/`
      );

      setAppointments(appointmentResponse.data); // Store the fetched appointments
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

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
            {appointments.map(
              (
                {
                  date,
                  time,
                  doctorName,
                  doctorType,
                  problem,
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
                      {/* Appointment Date */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium"
                        >
                          {new Date(date).toLocaleDateString()}
                        </Typography>
                      </td>

                      {/* Doctor Name */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium"
                        >
                          {doctorName}
                        </Typography>
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

                      {/* Appointment Time */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium"
                        >
                          {time}
                        </Typography>
                      </td>

                      {/* Action Buttons */}
                      <td className={classes}>
                        <div className="flex space-x-4">
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
                    {isOpen && (
                      <tr>
                        <td colSpan={5} className="p-4 bg-blue-gray-50">
                          <Accordion open={isOpen}>
                            <AccordionBody>
                              <div className="grid grid-cols-12 gap-8 justify-center">
                                <div className="col-span-8">
                                  <strong className="font-bold text-black">
                                    Purpose:
                                  </strong>
                                  <Typography
                                    variant="medium"
                                    color="blue-gray"
                                    className="font-normal font-poppins"
                                  >
                                    {problem}
                                  </Typography>
                                </div>
                                <div className="col-span-4">
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
                                <div className="col-span-12 mt-4">
                                  <strong className="font-bold text-black">
                                    Additional Info:
                                  </strong>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal font-poppins"
                                  >
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
              }
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {appointments.map(
          (
            {
              date,
              time,
              doctorName,
              doctorType,
              problem,
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
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-poppins font-medium"
                    >
                      <strong>Date:</strong> {new Date(date).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-poppins font-medium"
                    >
                      <strong>Doctor:</strong> {doctorName}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-poppins font-medium"
                    >
                      <strong>Type:</strong> {doctorType}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-poppins font-medium"
                    >
                      <strong>Time:</strong> {time}
                    </Typography>
                  </div>
                  <div className="ml-auto flex flex-col space-y-2">
                    <Button
                      onClick={() => handleToggleAccordion(index)}
                      color="blue"
                      size="sm"
                    >
                      <HiOutlineInformationCircle className="text-white w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {isOpen && (
                  <Accordion open={isOpen}>
                    <AccordionBody>
                      <div className="mt-4">
                        <strong className="font-bold text-black">
                          Purpose:
                        </strong>
                        <Typography
                          variant="medium"
                          color="blue-gray"
                          className="font-normal font-poppins"
                        >
                          {problem}
                        </Typography>
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
                        <div className="mt-6">
                          <strong className="font-bold text-black">
                            Additional Info:
                          </strong>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-poppins"
                          >
                            {additionalInfo}
                          </Typography>
                        </div>
                      </div>
                    </AccordionBody>
                  </Accordion>
                )}
              </div>
            );
          }
        )}
      </div>
    </Card>
  );
}
