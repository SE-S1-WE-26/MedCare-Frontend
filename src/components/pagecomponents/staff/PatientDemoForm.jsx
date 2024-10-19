import React, { useState,useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PatientDemoForm = () => {
  const { username } = useParams();
  console.log('Username:', username);
    const [userDetails, setUserDetails] = useState(null);

  const Host_Ip = process.env.REACT_APP_HOST_IP || "https://medcare-backend.vercel.app";

  useEffect(() => {
    const fetchDetails = async () => {
        try {
            const userResponse = await axios.get(`${Host_Ip}/user/username/${username}`);
            setUserDetails(userResponse.data);
            console.log('User details:', userResponse.data);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    if (username) {
        fetchDetails();
    }
}, [username, Host_Ip]);

  const [formData, setFormData] = useState({
    userId: userDetails?._id, 
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    address: "",
    mobileNumber: "",
    emergencyContactNumber: "",
  });

  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error messages
  const [success, setSuccess] = useState(null); // For success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
        // Directly call the add endpoint since edit functionality is removed
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
        setSuccess("Demographic data submitted successfully!");
        localStorage.setItem('patientId',userDetails?._id);
    } catch (error) {
        setError("Failed to submit the form. Please try again.");
        console.error("Error:", error);
    } finally {
        setLoading(false);
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
                value={formData.firstName}
                onChange={handleChange}
                className="w-full"
                required
              />
              <Input
                variant="outlined"
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
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
                value={formData.birthday}
                onChange={handleChange}
                className="w-full"
                required
              />
              <select
                name="gender"
                value={formData.gender}
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
              value={formData.address}
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
                value={formData.mobileNumber}
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
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 pt-6">
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

export default PatientDemoForm;
