import React from "react";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { Card, Typography, Button, Textarea, Input, Checkbox } from "@material-tailwind/react";
import DoctorCard from "../../components/pagecomponents/patient/DoctorCard";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../../constants/images";

const AppointmentForm = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/patient/payment-form");
  };

  const location = useLocation();
  const { doctor } = location.state || {}; // Access the passed doctor object

  if (!doctor) {
    return <div>No doctor selected</div>; // Handle case where no doctor is passed
  }

  return (
    <div className="w-full lg:mb-6 md:mb-8">
      <BackNavigation label="Make an Appointment" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="px-2 w-full md:w-1/2 flex flex-col">
          <DoctorCard doctor={doctor} />
          {/* Hide this image on mobile view */}
          <img 
            src={images.poster1} 
            alt="Doctor" 
            className="hidden md:block w-full mt-4 pl-14 pr-24 " 
          />
        </div>
        <Card className="p-4 md:p-8 rounded-3xl w-full md:w-1/2 flex flex-col justify-between">
          <form className="lg:mt-12 items-center">
            <div className="flex flex-col gap-4">
              {/* Appointment Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                    Appointment Date
                  </Typography>
                  <Input
                    size="xs"
                    placeholder="Select date"
                    type="date"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                    Appointment Time
                  </Typography>
                  <Input
                    size="xs"
                    placeholder="Select time"
                    type="time"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>

              {/* Full Name and Problem Description */}
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                  Full Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Enter your full name"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base mt-4">
                  Your Problem
                </Typography>
                <Textarea
                  placeholder="Describe your problem"
                  className="!border-t-blue-gray-200 focus:!border-t-blue-gray-900"
                />
              </div>

              {/* File Upload Section with Button */}
              <div className="flex flex-col">
                <Button
                  className="bg-blue-500 text-white rounded-md mt-2"
                  onClick={() => alert("File upload functionality not implemented yet.")}
                  fullWidth
                >
                  Upload Files
                </Button>
                <Typography variant="small" color="gray" className="mt-2 text-center">
                  (Click to upload files)
                </Typography>
              </div>

              {/* Checkbox for Terms and Conditions */}
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree to the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
              />

              {/* Submit Button */}
              <Button className="mt-2 bg-dark-blue rounded-full" fullWidth onClick={handleNavigate}>
                Continue
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentForm;
