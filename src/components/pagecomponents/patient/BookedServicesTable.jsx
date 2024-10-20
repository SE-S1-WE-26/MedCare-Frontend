import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Accordion, AccordionBody, IconButton, Dialog, DialogBody } from "@material-tailwind/react";
import axios from "axios";
import { formatDate } from '../../../utils/dateUtils';
import { TiCancel } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";

const TABLE_HEAD = ["Date", "Service", "Time", "Amount", "Payment", "Actions"];

export function BookedServicesTable() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const [bookedServices, setBookedServices] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    const [successAlert, setSuccessAlert] = useState(false);

    // Fetch booked services
    const fetchBookedServices = async () => {
        try {
            const response = await fetch(`http://localhost:8010/bookedService/user/${user._id}`);
            if (response.ok) {
                const data = await response.json();
                setBookedServices(data); // Set the fetched data to state
            } else {
                console.error("Failed to fetch medical records");
            }
        } catch (error) {
            console.error("Error fetching medical records:", error);
        }
    };

    // Fetch records on component mount
    useEffect(() => {
        fetchBookedServices();
    }, []);

    // Function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const handleToggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const serviceTypeMap = {
        Xray: 'X-ray',
        Labtest: 'Lab Test',
        Vaccine: 'Vaccine',
        Scan: 'Scan'
    };

    const handleCancelButton = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8010/bookedService/${id}`);
            if (response.status === 200) {
                setSuccessAlert(true);

                setTimeout(() => {
                    setSuccessAlert(false);
                }, 2500);
                // Filter out the deleted service from the state
                fetchBookedServices();
                
            } else {
                console.error("Failed to delete service");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    }


    return (
        <Card className="w-full">
            {/* Success Dialog */}
            <Dialog open={successAlert} handler={() => setSuccessAlert(false)}>
                <DialogBody divider className="grid place-items-center gap-4">
                    <FaCheckCircle className='text-3xl' color='green' />
                    <Typography color="green" variant="h4">
                        Success!
                    </Typography>
                    <Typography className="text-center font-normal">
                        Service cancelled successfully.
                    </Typography>
                    <Button variant="gradient" onClick={() => setSuccessAlert(false)}>
                        Ok, Got it
                    </Button>
                </DialogBody>
            </Dialog>
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
                        {bookedServices.map((service) => {
                            const classes = "p-4 border-b border-blue-gray-50";

                            return (
                                <React.Fragment>
                                    <tr>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                                {formatDate(service.date)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                                {serviceTypeMap[service?.serviceId.servicesType] || service?.serviceId.servicesType}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                                {service.time} AM
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                                LKR {service.serviceId.amount}.00
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                                {service.paymentMethod}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Button className="bg-red-400" onClick={() => handleCancelButton(service._id)}>
                                                <Typography variant="small" color="blue-gray" className="text-white font-poppins font-medium">
                                                    Cancel
                                                </Typography>
                                            </Button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden">
                {bookedServices.map((service, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div className="border-b border-blue-gray-100 p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                        <strong>Date:</strong> {formatDate(service.date)}
                                    </Typography>
                                    <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                        <strong>Service:</strong> {service.serviceId.servicesType}
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
                                                <strong className="font-bold text-black">Time:</strong>
                                                <Typography variant="medium" color="blue-gray" className="font-normal font-poppins font-medium">
                                                    {service.time} AM
                                                </Typography>
                                            </div>
                                            <div className="mt-6">
                                                <strong className="font-bold text-black">Amount:</strong>
                                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                                    LKR {service.serviceId.amount}.00
                                                </Typography>
                                            </div>
                                            <div className="mt-6">
                                                <strong className="font-bold text-black">Payment Method:</strong>
                                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                                    {service.paymentMethod}
                                                </Typography>
                                            </div>
                                            <div className="mt-6">
                                                <Button className="bg-red-400" onClick={() => handleCancelButton(service._id)}>
                                                    <TiCancel className="text-lg md:text-2xl" />
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
    )
}
