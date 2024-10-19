import React, { useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import images from "../../constants/images";

const LandingPage = () => {

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  }, []);

  return (
    <div className="w-full flex items-center justify-center px-4 my-auto">
      <Card className="min-h-[500px] w-full justify-center items-center px-8 md:px-12 py-12">
        <div className="flex flex-col md:flex-row w-full items-center my-auto">
          {/* Left Section */}
          <div className="md:w-3/5 w-full flex flex-col md:flex-row items-center md:mb-0 my-auto -mt-6">
            <div className="text-center md:text-left my-auto ">
              <Typography className="text-blue-600 font-medium text-4xl md:text-7xl font-poppins">
                Welcome
              </Typography>
              <Typography className="text-dark-blue text-3xl md:text-6xl font-poppins font-medium flex flex-col md:flex-row md:ml-12">
                <p className="text-3xl">to</p>
                <p className="md:ml-4 font-semibold text-4xl md:text-6xl">MedCare!</p>
              </Typography>
            </div>
            <img
              src={images.logo}
              alt="logo"
              className="w-12 h-10 md:w-28 md:h-28 mt-4 md:mt-0"
            />
          </div>

          {/* Right Section */}
          <div className="md:w-2/5 w-full text-center md:text-left mt-4 md:mt-0">
            <p className="text-sm">
              Welcome to our innovative medical web app, designed to simplify
              healthcare management for both patients and staff. Patients can
              easily access their medical records, book appointments, view lab
              reports, and manage services—all in one place. Healthcare
              professionals benefit from streamlined tools to manage patient
              data, appointments, and checkups, enhancing the efficiency of
              care delivery. With real-time updates, QR scanning, and intuitive
              navigation, our platform bridges the gap between patients and
              medical staff, ensuring a seamless, connected healthcare
              experience for everyone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LandingPage;
