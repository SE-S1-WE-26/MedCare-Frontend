import React, { useState } from "react";
import { Input, Button, Radio, Textarea } from "@material-tailwind/react";

const BiographicForm = () => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    bmi: "",
    weight: "",
    height: "",
    condition: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/biographics", {
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
    <div className="flex flex-1 flex-col justify-center items-center  lg:p-12">
      <h1 className="text-2xl lg:text-3xl font-semibold text-left mb-6 text-gray-700">
        Biographic Info
      </h1>
      <div className="bg-white w-full max-w-3xl mx-auto rounded-lg lg:p-8 shadow-lg ">
        <div className="rounded-lg p-6">
          <p className="text-sm font-light mb-6 text-center text-gray-500">
            Fill in the biographic data for the patient's profile
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blood Group */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                onChange={handleChange}
                className="p-2 mt-1 rounded-md border border-blue-gray-200 outline-none text-gray-600 w-full"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* BMI, Weight, Height */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                type="number"
                variant="outlined"
                label="BMI"
                name="bmi"
                placeholder="Enter BMI"
                onChange={handleChange}
                className="w-full"
              />
              <Input
                type="number"
                variant="outlined"
                label="Weight (kg)"
                name="weight"
                placeholder="Enter weight"
                onChange={handleChange}
                className="w-full"
              />
              <Input
                type="number"
                variant="outlined"
                label="Height (cm)"
                name="height"
                placeholder="Enter height"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Special Conditions */}
            <div className="space-y-4 outline outline-2 rounded-lg outline-blue-gray-500 p-5">
              <p className="block text-sm font-medium text-gray-600">
                Special Conditions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Radio
                  id="chronic"
                  name="condition"
                  label="Chronic Condition"
                  value="Chronic Condition"
                  onChange={handleChange}
                />
                <Radio
                  id="surgeries"
                  name="condition"
                  label="Surgeries"
                  value="Surgeries"
                  onChange={handleChange}
                />
                <Radio
                  id="vaccination"
                  name="condition"
                  label="Vaccination"
                  value="Vaccination"
                  onChange={handleChange}
                />
                <Radio
                  id="other"
                  name="condition"
                  label="Other"
                  value="Other"
                  onChange={handleChange}
                />
              </div>
              {/* Details */}
              <Textarea
                variant="outlined"
                label="Enter Details"
                name="details"
                onChange={handleChange}
                className="w-full "
              />
              <div className="flex justify-center">
                {/* Add Button */}
                <Button type="button" color="green" variant="outlined">
                  Add
                </Button>
              </div>
            </div>

            {/* Back and Submit Buttons */}
            <div className="flex justify-between gap-6 pt-6">
              <Button type="button" color="gray" variant="outlined">
                Back
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

export default BiographicForm;
