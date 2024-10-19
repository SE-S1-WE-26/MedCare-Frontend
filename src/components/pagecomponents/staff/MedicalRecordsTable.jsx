import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Button,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import {
  HiOutlineTrash,
  HiOutlineInformationCircle,
  HiOutlinePencilAlt,
} from "react-icons/hi";

const TABLE_HEAD = [
  "Date",
  "Patient Name",
  "Condition",
  "Follow-up Date",
  "Actions",
];

export function StaffMedicalRecordsTable() {
  const [openIndex, setOpenIndex] = useState(null);
  const [records, setRecords] = useState([]);

  const Host_Ip = process.env.Host_Ip || "https://medcare-backend.vercel.app";

  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get(`${Host_Ip}/patient/medical/all`); // Adjust the endpoint if necessary
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const handleToggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEdit = (patientName) => {
    alert(`Edit ${patientName}'s record`);
  };

  const handleDelete = async (recordId, patientName) => {
    
    if (!window.confirm(`Are you sure you want to delete ${patientName}'s record?`)) return;
    
    try {
      const response = await axios.delete(`${Host_Ip}/patient/medical/delete/${recordId}`);
      if (response.status === 200) {
        alert(`${patientName}'s record has been successfully deleted.`);
        fetchMedicalRecords(); // Refresh the records after deletion
      } else {
        console.error("Failed to delete the record.");
        alert("There was an issue deleting the record. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting record. Please check the console for more details.");
    }
  };
  

  return (
    <Card className="w-full">
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
            {records.map(
              (
                {
                  _id,
                  date,
                  pname,
                  condition,
                  followUpDate,
                  symptoms,
                  notes,
                  prescription,
                },
                index
              ) => {
                const isOpen = openIndex === index;
                const classes = "p-4 border-b border-blue-gray-50";

                return (
                  <React.Fragment key={_id}>
                    <tr>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium"
                        >
                          {new Date(date).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium"
                        >
                          {pname}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium"
                        >
                          {condition}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-poppins font-medium"
                        >
                          {new Date(followUpDate).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button
                          onClick={() => handleToggleAccordion(index)}
                          color="blue"
                          aria-label="See more details"
                        >
                          <HiOutlineInformationCircle size={20} />
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
                                  <strong className="font-bold text-black">
                                    Symptoms:
                                  </strong>
                                  <Typography
                                    variant="medium"
                                    color="blue-gray"
                                    className="font-normal font-poppins font-medium"
                                  >
                                    {symptoms}
                                  </Typography>
                                </div>
                                <div className="col-span-4">
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
                                <div className="col-span-2">
                                  <strong className="font-bold text-black">
                                    Prescription:
                                  </strong>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal font-poppins font-medium"
                                  >
                                    {prescription}
                                  </Typography>
                                </div>
                              </div>
                              <div className="flex justify-end mt-4">
                                <Button
                                  className="mr-2"
                                  color="orange"
                                  onClick={() => handleEdit(pname)}
                                  aria-label="Edit record"
                                >
                                  <HiOutlinePencilAlt size={20} />
                                </Button>
                                <Button
                                  color="red"
                                  onClick={() => handleDelete(_id, pname)}
                                  aria-label="Delete record"
                                >
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
              }
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      {/* Mobile View */}
      <div className="lg:hidden">
        {records.map(
          (
            {
              _id,
              date,
              patientName,
              condition,
              followUpDate,
              symptoms,
              notes,
              treatment,
            },
            index
          ) => {
            const isOpen = openIndex === index; // Check if the current index is open

            return (
              <div key={date} className="border-b border-blue-gray-100 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-poppins font-medium"
                    >
                      <strong>Date:</strong> {date}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-poppins font-medium"
                    >
                      <strong>Patient Name:</strong> {patientName}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-poppins font-medium"
                    >
                      <strong>Condition:</strong> {condition}
                    </Typography>
                  </div>
                  <Button
                    onClick={() => handleToggleAccordion(index)}
                    color="blue"
                    aria-label="See more details"
                  >
                    <HiOutlineInformationCircle size={20} />
                  </Button>
                </div>
                {isOpen && ( // Display additional info when accordion is open
                  <Accordion open={isOpen}>
                    <AccordionBody>
                      <div className="mt-2">
                        <div>
                          <strong className="font-bold text-black">
                            Symptoms:
                          </strong>
                          <Typography
                            variant="medium"
                            color="blue-gray"
                            className="font-normal font-poppins font-medium"
                          >
                            {symptoms}
                          </Typography>
                        </div>
                        <div className="mt-6">
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
                        <div className="mt-6">
                          <strong className="font-bold text-black">
                            Prescription:
                          </strong>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-poppins font-medium"
                          >
                            {treatment}
                          </Typography>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button
                            className="mr-2"
                            color="orange"
                            onClick={() => handleEdit(patientName)}
                            aria-label="Edit record"
                          >
                            <HiOutlinePencilAlt size={20} />
                          </Button>
                          <Button
                            color="red"
                            onClick={() => handleDelete(_id, patientName)}
                            aria-label="Delete record"
                          >
                            <HiOutlineTrash size={20} />
                          </Button>
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
