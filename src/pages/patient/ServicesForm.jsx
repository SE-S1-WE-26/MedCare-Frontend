import React, { useState } from 'react';
import axios from 'axios';
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import {
    Card,
    Typography,
    Button,
    Input,
    Radio,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import ServiceCard from "../../components/pagecomponents/patient/ServiceCard";
import { useNavigate, useParams } from "react-router-dom";
import images from "../../constants/images";
import { FaCheckCircle } from "react-icons/fa";

export default function ServicesForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userData"));
    const userId = user._id;
    const [successAlert, setSuccessAlert] = useState(false);

    // State for form data and validation errors
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        fullName: "",
        paymentMethod: "",
    });

    const [errors, setErrors] = useState({});

    // Handle input change for form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Reset error message when the input changes
    };

    // Handle the payment method selection
    const handlePaymentMethodChange = (value) => {
        setFormData({ ...formData, paymentMethod: value });
        setErrors({ ...errors, paymentMethod: '' }); // Reset error
    };

    // Validate the form data
    const validate = () => {
        let tempErrors = {};

        if (!formData.date) {
            tempErrors.date = "Date is required.";
        } else if (new Date(formData.date) < new Date()) {
            tempErrors.date = "Date cannot be in the past.";
        }

        if (!formData.time) {
            tempErrors.time = "Time is required.";
        }

        if (!formData.fullName.trim()) {
            tempErrors.fullName = "Full name is required.";
        }

        if (!formData.paymentMethod) {
            tempErrors.paymentMethod = "Please select a payment method.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // Return true if no errors
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const bookedServiceData = {
                userId: userId,
                date: new Date(formData.date),
                time: formData.time,
                serviceId: id,
                userName: formData.fullName,
                paymentMethod: formData.paymentMethod || "none",
            };

            try {
                // Check payment method and handle accordingly
                if (formData.paymentMethod === "Cash") {
                    // Save data if payment is by cash
                    const response = await axios.post(`https://medcare-backend.vercel.app/bookedService/add`, bookedServiceData);
                    console.log(response.data);
                    setSuccessAlert(true);

                    setTimeout(() => {
                        setSuccessAlert(false);
                        navigate("/patient/services");
                    }, 2500);
                    // Navigate to services if payment is by cash
                } else {
                    // Pass data to payment form for other payment methods
                    navigate("/patient/payment-form", { state: { bookedServiceData } });
                }
            } catch (error) {
                console.error("Error creating appointment:", error);
            }
        }
    };

    return (
        <div className="w-full lg:mb-6 md:mb-8">
            <BackNavigation label="Book a Service" />
            {/* Success Dialog */}
            <Dialog open={successAlert} handler={() => setSuccessAlert(false)}>
                        <DialogBody divider className="grid place-items-center gap-4">
                            <FaCheckCircle className='text-3xl' color='green' />
                            <Typography color="green" variant="h4">
                                Success!
                            </Typography>
                            <Typography className="text-center font-normal">
                                Service booked successfully.
                            </Typography>
                            <Button variant="gradient" onClick={() => setSuccessAlert(false)}>
                                Ok, Got it
                            </Button>
                        </DialogBody>
                    </Dialog>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="px-2 w-full md:w-1/2 flex flex-col">
                    <ServiceCard serviceId={id} />
                    <img
                        src={images.poster1}
                        alt="Doctor"
                        className="hidden md:block h-7/12 w-7/12 mt-4 pl-14 pr-24 "
                    />
                </div>
                <Card className="p-4 md:p-8 rounded-3xl w-full md:w-1/2 flex flex-col justify-between">
                    <form className="lg:mt-12 items-center" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            {/* Appointment Date and Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 text-sm md:text-base"
                                    >
                                        Select Date
                                    </Typography>
                                    <Input
                                        size="xs"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                    {errors.date && (
                                        <Typography color="red" className="text-xs mt-1">
                                            {errors.date}
                                        </Typography>
                                    )}
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 text-sm md:text-base"
                                    >
                                        Appointment Time
                                    </Typography>
                                    <Input
                                        size="xs"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        type="time"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                    {errors.time && (
                                        <Typography color="red" className="text-xs mt-1">
                                            {errors.time}
                                        </Typography>
                                    )}
                                </div>
                            </div>

                            {/* Full Name */}
                            <div>
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="mb-2 text-sm md:text-base"
                                >
                                    Full Name
                                </Typography>
                                <Input
                                    size="lg"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                {errors.fullName && (
                                    <Typography color="red" className="text-xs mt-1">
                                        {errors.fullName}
                                    </Typography>
                                )}
                            </div>

                            {/* Payment Method */}
                            {user.private && (
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                                        Payment Method
                                    </Typography>
                                    <Radio
                                        name="paymentMethod"
                                        label="Cash"
                                        onChange={() => handlePaymentMethodChange("Cash")}
                                        checked={formData.paymentMethod === "Cash"}
                                    />
                                    <Radio
                                        name="paymentMethod"
                                        label="Card"
                                        onChange={() => handlePaymentMethodChange("Card")}
                                        checked={formData.paymentMethod === "Card"}
                                    />
                                    <Radio
                                        name="paymentMethod"
                                        label="Insurance"
                                        onChange={() => handlePaymentMethodChange("Insurance")}
                                        checked={formData.paymentMethod === "Insurance"}
                                    />
                                    {errors.paymentMethod && (
                                        <Typography color="red" className="text-xs mt-1">
                                            {errors.paymentMethod}
                                        </Typography>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="mt-8 bg-dark-blue rounded-full"
                                fullWidth
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
