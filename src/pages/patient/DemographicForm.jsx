import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DemographicForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const Host_Ip = process.env.REACT_APP_HOST_IP || "http://localhost:8010";

  const [formData, setFormData] = useState({
    userId: "59b99db4cfa9a34dcd7885b6", // Example user ID
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    address: "",
    mobileNumber: "",
    emergencyContactNumber: "",
  });

  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null);     // For error messages
  const [success, setSuccess] = useState(null); // For success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    setError(null);    // Reset error message
    setSuccess(null);  // Reset success message

    console.log("Form data:", formData);
    try {
      const response = await fetch(`${Host_Ip}/patient/demographic/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSuccess("Demographic data submitted successfully!"); // Show success message
      console.log("Response from backend:", data);

      // Redirect to home after successful submission
      navigate("/patient/medical-profile"); // Change this to your home route
    } catch (error) {
      setError("Failed to submit the form. Please try again."); // Show error message
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center flex-col">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Demographic Info
      </h1>
      <div className="bg-white p-8 max-w-lg mx-auto rounded-lg shadow-lg">
        <div className="rounded-lg p-6">
          <p className="text-sm font-light mb-6 text-center text-gray-500">
            Fill in the demographic data for the patient's profile
          </p>

          {/* Show success or error message */}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

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
                required
              />
              <Input
                variant="outlined"
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                onChange={handleChange}
                className="w-full"
                required
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
                required
              />
              <select
                name="gender"
                onChange={handleChange}
                className="p-2 rounded-md border border-blue-gray-200 outline-none text-gray-600 w-full"
                required
              >
                <option value="">Select Gender</option>
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
              required
            />

            {/* Mobile and Emergency Contact */}
            <div className="flex flex-col md:flex-row gap-6">
              <Input
                variant="outlined"
                label="Mobile Number"
                type="tel"
                name="mobileNumber"
                placeholder="Enter mobile number"
                onChange={handleChange}
                className="w-full"
                required
              />
              <Input
                variant="outlined"
                label="Emergency Contact"
                type="tel"
                name="emergencyContactNumber"
                placeholder="Enter emergency contact number"
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 pt-6">
              <Button type="button" color="red" variant="outlined">
                Cancel
              </Button>
              <Button type="submit" color="blue" variant="filled" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemographicForm;
