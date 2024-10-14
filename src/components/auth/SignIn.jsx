import React from "react";
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";

import { Button, Card, Typography } from "@material-tailwind/react";

const SignIn = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleSignIn = (role) => {
    console.log("Sign In as:", role);
    setUserRole(role); // Set user role in Layout
    navigate(`/${role}`); // Navigate to the specified role
  };

  return (
    <div className="w-full h-full m-8 flex">
      {/* Left Section for Login Form */}
      <div className="md:w-1/3 w-full">
        <Card className="py-8 px-6 rounded-3xl">
          <img src={images.logo} alt="logo" className="w-12 mx-auto" />
          <div className="py-8">
            <Typography className="font-semibold font-poppins text-xl">
              Login
            </Typography>
            <div>
              <div className="mt-4">
                <label className="text-xs font-semibold">Username</label>
                <input
                  type="text"
                  className="w-full border-b border-gray-300 py-2 p-2 focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="text-xs font-semibold">Password</label>
                <input
                  type="password"
                  className="w-full border-b border-gray-300 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <Button
            style={{ textTransform: "none" }}
            className="rounded-2xl bg-dark-blue w-full" // Added full width
          >
            <Typography className="font-semibold">Sign In</Typography>
          </Button>
        </Card>

        {/* Test Login Section */}
        <Card className="py-6 px-6 rounded-3xl mt-4">
          <Typography className="font-semibold font-poppins text-lg mb-4 text-center">
            Test Login
          </Typography>
          <div className="flex flex-col gap-2">
            <Button
              style={{ textTransform: "none" }}
              onClick={() => handleSignIn("patient")}
              className="rounded-2xl bg-dark-blue"
            >
              <Typography className="font-semibold text-xs">Patient</Typography>
            </Button>
            <Button
              style={{ textTransform: "none" }}
              onClick={() => handleSignIn("staff")}
              className="rounded-2xl bg-dark-blue"
            >
              <Typography className="font-semibold text-xs">
                Staff Member
              </Typography>
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Section for Images */}
      <div className="md:w-2/3 hidden md:flex justify-center items-center">
        {" "}
        {/* Hidden on mobile */}
        <div className="flex px-32 ml-24">
          <div className="w-1/2 flex flex-col justify-between items-right gap-4">
            <div className="flex">
              <img src={images.art1} alt="doctor" />
            </div>
            <div className="flex">
              <img src={images.art2} alt="poster1" />
            </div>
          </div>
          <div className="w-1/2 flex my-auto ml-8">
            <img src={images.art3} alt="doctor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
