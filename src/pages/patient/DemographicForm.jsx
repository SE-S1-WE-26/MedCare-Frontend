import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const DemographicForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    address: "",
    mobile: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/demographics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center flex-col">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Demographic Info
      </h1>
      <div className="bg-white p-8 max-w-lg mx-auto rounded-lg shadow-lg ">
        <div className=" rounded-lg p-6">
          <p className="text-sm font-light mb-6 text-center text-gray-500">
            Fill in the demographic data for the patient's profile
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="flex flex-col md:flex-row gap-6">
              <Input
                variant="outlined"
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                onChange={handleChange}
                className="w-full"
              />
              <Input
                variant="outlined"
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Birthday and Gender */}
            <div className="flex flex-col md:flex-row gap-6">
              <Input
                type="date"
                variant="outlined"
                label="Birthday"
                name="birthday"
                onChange={handleChange}
                className="w-full"
              />

              <select
                name="gender"
                onChange={handleChange}
                className="p-2 rounded-md border border-blue-gray-200 outline-none text-gray-600 w-full"
              >
                <option value="">Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            {/* Address */}
            <Input
              variant="outlined"
              label="Address"
              name="address"
              placeholder="Enter address"
              onChange={handleChange}
              className="w-full"
            />

            {/* Mobile and Emergency Contact */}
            <div className="flex flex-col md:flex-row gap-6">
              <Input
                variant="outlined"
                label="Mobile Number"
                type="tel"
                name="mobile"
                placeholder="Enter mobile number"
                onChange={handleChange}
                className="w-full"
              />
              <Input
                variant="outlined"
                label="Emergency Contact"
                type="tel"
                name="emergencyContact"
                placeholder="Enter emergency contact number"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 pt-6">
              <Button type="button" color="red" variant="outlined">
                Cancel
              </Button>
              <Button type="submit" color="blue" variant="filled">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemographicForm;
