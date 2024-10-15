import React, { useState, useEffect } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const specialConditions = [
  { title: "Chronic Conditions", content: "Nothing to show" },
  { title: "Surgeries", content: "Nothing to show" },
  { title: "Vaccination", content: "Nothing to show" },
];

const MedicalProfile = () => {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState([]);
  const [bioData, setBioData] = useState([]); // Store fetched bio data

  const navigate = useNavigate();

  const Host_Ip = "http://localhost:8010";

  // Fetch demographic data and bio data by user ID
  const fetchPatientDetails = async () => {
    try {
      const userId = "59b99db4cfa9a34dcd7885b6"; // Replace with actual user ID

      // Fetch Demographic Data
      // const demographicResponse = await axios.get(`${Host_Ip}/patient/demographic/user/${userId}`);
      const demographicResponse = await axios.get(
        `${Host_Ip}/patient/demographic/all`
      );

      // Fetch Bio Data
      // const bioDataResponse = await axios.get(`${Host_Ip}/patient/biodata/user/${userId}`);
      const bioDataResponse = await axios.get(
        `${Host_Ip}/patient/biodata/all`
      );

      console.log(bioDataResponse.data);
      const lenDemo = demographicResponse.data.length;
      setPatientDetails(demographicResponse.data[lenDemo - 1]);

      const len = bioDataResponse.data.length;
      setBioData(bioDataResponse.data[len - 1]); // Set the fetched bio data
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };


  useEffect(() => {
    if (patientDetails.length == 0 || !bioData.length == 0) {

      fetchPatientDetails();
    }
  }, []);

  const handleDemographic = () => {
    navigate("/patient/demographic-form");
  };

  const handleBiographic = () => {
    navigate("/patient/biographic-form");
  };

  if (!patientDetails || !bioData) {
    return <p>Loading...</p>; // Display loading state if data is not yet fetched
  }

  return (
    <div className="flex flex-col lg:flex-row lg:w-full w-full gap-5 p-2 lg:p-4 text-foreground text-white">
      {/* Left Section: Patient Details */}
      <div className="flex w-full bg-white rounded-lg lg:w-1/3 text-black">
        <div className="w-full space-y-6 p-4 lg:p-6">
          <h2 className="font-extrabold text-lg lg:text-xl p-3 rounded-lg text-center">
            Patient Details
          </h2>
          <div className="flex space-x-5 items-center justify-center lg:justify-start">
            <img
              src="https://randomuser.me/api/portraits/med/men/75.jpg" // Placeholder image
              className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl"
              alt="profile"
            />
            <p className="font-bold text-lg">{`${patientDetails.firstName} ${patientDetails.lastName}`}</p>
          </div>

          {/* Bio Data Section */}
          <div
            className="flex justify-between pr-2 cursor-pointer lg:cursor-default"
            onClick={() => setIsBioOpen(!isBioOpen)}
          >
            <p className="font-medium">Bio Data</p>
            <TfiAlignJustify />
          </div>
          <div
            className={`flex lg:flex-row justify-between ${
              isBioOpen ? "block" : "hidden"
            } lg:flex`}
          >
            <div className="space-y-1 text-sm lg:text-base">
              <p>Blood Group</p>
              <p>Weight</p>
              <p>Height</p>
              <p>BMI</p>
            </div>
            <div className="space-y-1 text-sm lg:text-base">
              <p>: {bioData.bloodGroup}</p>
              <p>: {bioData.weight} kg</p>
              <p>: {bioData.height} cm</p>
              <p>: {bioData.bmi}</p>
            </div>
          </div>

          {/* Demographic Data Section */}
          <div
            className="flex justify-between pt-2 pr-2 cursor-pointer lg:cursor-default"
            onClick={() => setIsDemoOpen(!isDemoOpen)}
          >
            <p className="font-medium">Demographic Data</p>
            <TfiAlignJustify />
          </div>
          <div
            className={`flex justify-between ${
              isDemoOpen ? "block" : "hidden"
            } lg:flex`}
          >
            <div className="space-y-1 text-sm lg:text-base">
              <p>Name</p>
              <p>Birthday</p>
              <p>Gender</p>
              <p>Address</p>
              <p>Mobile Number</p>
              <p>Emergency Contact Number</p>
            </div>
            <div className="space-y-1 text-sm lg:text-base">
              <p>
                : {`${patientDetails.firstName} ${patientDetails.lastName}`}
              </p>
              <p>: {new Date(patientDetails.birthday).toLocaleDateString()}</p>
              <p>: {patientDetails.gender === "M" ? "Male" : "Female"}</p>
              <p>: {patientDetails.address}</p>
              <p>: {patientDetails.mobileNumber}</p>
              <p>: {patientDetails.emergencyContactNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Special Conditions */}
      <div className="flex flex-col w-full lg:w-3/4 bg-white text-black rounded-lg p-4 lg:p-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Special Conditions</h3>
          <div className="flex gap-2">
            <IoSearch className="w-5 h-5" />
            <IoSettingsOutline className="w-5 h-5" />
          </div>
        </div>

        {specialConditions.map((condition, index) => (
          <div className="p-3" key={index}>
            <h4 className="font-semibold">{condition.title}</h4>
            <div className="p-4 lg:p-6 flex justify-center items-center bg-gray-300 rounded-lg text-black text-sm lg:text-base">
              {condition.content}
            </div>
          </div>
        ))}
        <div className="flex gap-5">
          <button
            className="w-full bg-blue-500 text-white rounded-lg p-2 lg:p-4 font-semibold"
            onClick={handleDemographic}
          >
            Add Demographic Data
          </button>
          <button
            className="w-full bg-blue-500 text-white rounded-lg p-2 lg:p-4 font-semibold"
            onClick={handleBiographic}
          >
            Add Biographic Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalProfile;
