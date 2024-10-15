import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import { HiOutlineChatAlt2, HiOutlineInformationCircle } from "react-icons/hi";
import axios from "axios";

// Sample Data
const TABLE_HEAD = ["Appointment", "Appointment Type", "Appointment", "Action"];

// Function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const AppointmentsTable = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [appointment, setAppointment] = useState([]);

  const Host_Ip = process.env.Host_Ip || "http://localhost:8010";

  const fetchAppointmentDetails = async () => {
    try {
      // Fetch Demographic Data
      const appointmentResponse = await axios.get(
        `${Host_Ip}/patient/appointments/`
      );

      setAppointment(appointmentResponse.data);
      console.log(appointment);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const handleDelete = (Id) => {
    console.log(Id);
    axios
      .delete(`${Host_Ip}/patient/appointments/${Id}`)
      .then(() => {
        alert("Appoinment deleted successfully!");
        fetchAppointmentDetails();
        //Navigate("/patient/appointments");
        // Clear the search query after deletion
      })
      .catch((err) => {
        alert(err.message);
      });
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
            {appointment.map(
              (
                {
                  _id,
                  doctorPic,
                  doctorName,
                  doctorType,
                  date,
                  time,
                  problem,
                  notes,
                  additionalInfo,
                  file,
                },
                index
              ) => {
                const isOpen = openIndex === index;
                const classes = "p-4 border-b border-blue-gray-50";

                return (
                  <React.Fragment key={doctorName + date}>
                    <tr>
                      {/* Appointment Profile */}
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

                      {/* Appointment Type */}
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
                          {new Date(date).toLocaleDateString()} at {time}
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
                                <div className="col-span-3">
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
                                <div className="">
                                  <Button
                                    className="bg-green-500 text-white rounded-md "
                                    size="sm"
                                    onClick={() => {
                                      console.log("File URL:", file); // Debug: Check if file has a value
                                      if (file) {
                                        window.open(file, "_blank");
                                      } else {
                                        alert("No file URL available");
                                      }
                                    }}
                                  >
                                    Download File
                                  </Button>
                                </div>
                                <div>
                                  <Button
                                    color="red"
                                    size="sm"
                                    onClick={() => {
                                      handleDelete(_id);
                                    }}
                                  >
                                    Delete Record
                                  </Button>
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
        {appointment.map(
          (
            {
              _id,
              doctorPic,
              doctorName,
              doctorType,
              date,
              time,
              problem,
              notes,
              additionalInfo,
              file,
            },
            index
          ) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={doctorName + date}
                className="border-b border-blue-gray-100 p-4"
              >
                {/* Appointment Info Row */}
                <div className="flex items-center">
                  {/* Appointment Profile Picture */}
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      src={doctorPic}
                      alt={doctorName}
                      className="h-full w-full rounded-xl bg-light-blue object-cover"
                    />
                  </div>

                  {/* Appointment Info and Appointment Date & Time */}
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
                          <div className="mt-6">
                            <Button
                              className="bg-green-500 text-white rounded-md "
                              size="sm"
                              onClick={() => {
                                console.log("File URL:", file); // Debug: Check if file has a value
                                if (file) {
                                  window.open(file, "_blank");
                                } else {
                                  alert("No file URL available");
                                }
                              }}
                            >
                              Download File
                            </Button>
                          </div>
                          <div className="mt-6">
                            <Button
                              color="red"
                              size="sm"
                              onClick={() => {
                                handleDelete(_id);
                              }}
                            >
                              Delete Record
                            </Button>
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
