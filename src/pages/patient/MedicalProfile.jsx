import React, { useState, useEffect } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../../utils/dateUtils";
import { fetchPatientDetails } from "../../utils/patientUtils";
import Loader from '../../components/pagecomponents/Loader';

const MedicalProfile = () => {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;
  const navigate = useNavigate();

  const getPatientDetails = async () => {
    try {
      const { demographicData, bioData } = await fetchPatientDetails(userId);
      setPatientDetails(demographicData);
      setBioData(bioData);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientDetails();
  }, []);

  const handleDemographic = () => navigate("/patient/demographic-form");
  const handleBiographic = () => navigate("/patient/biographic-form");

  if (loading) {
    return (
      <div className="w-full flex my-auto items-center justify-center">
        <Loader />
      </div>
    );
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
              src={user?.image}
              className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl"
              alt="profile"
            />
            <p className="font-bold text-lg">{`${patientDetails?.firstName || ""} ${patientDetails?.lastName || ""}`}</p>
          </div>

          {/* Bio Data Section */}
          <div className="flex justify-between pr-2 cursor-pointer" onClick={() => setIsBioOpen(!isBioOpen)}>
            <p className="font-medium">Bio Data</p>
            <TfiAlignJustify />
          </div>
          {isBioOpen && (
            <div className="flex lg:flex-row justify-between">
              <div className="space-y-1 text-sm lg:text-base">
                <p>Blood Group</p>
                <p>Weight</p>
                <p>Height</p>
                <p>BMI</p>
              </div>
              <div className="space-y-1 text-sm lg:text-base">
                <p>: {bioData?.bloodGroup || ""}</p>
                <p>: {bioData?.weight ? `${bioData.weight} kg` : ""}</p>
                <p>: {bioData?.height ? `${bioData.height} cm` : ""}</p>
                <p>: {bioData?.bmi || ""}</p>
              </div>
            </div>
          )}

          {/* Demographic Data Section */}
          <div className="flex justify-between pt-2 pr-2 cursor-pointer" onClick={() => setIsDemoOpen(!isDemoOpen)}>
            <p className="font-medium">Demographic Data</p>
            <TfiAlignJustify />
          </div>
          {isDemoOpen && (
            <div className="flex justify-between">
              <div className="space-y-1 text-sm lg:text-base">
                <p>Name</p>
                <p>Age</p>
                <p>Birthday</p>
                <p>Gender</p>
                <p>Address</p>
                <p>Mobile Number</p>
                <p>Emergency Contact Number</p>
              </div>
              <div className="space-y-1 text-sm lg:text-base">
                <p>: {`${patientDetails?.firstName || ""} ${patientDetails?.lastName || ""}`}</p>
                <p>: {patientDetails?.birthday ? calculateAge(patientDetails.birthday) : ""}</p>
                <p>: {patientDetails?.birthday ? new Date(patientDetails.birthday).toLocaleDateString() : ""}</p>
                <p>: {patientDetails?.gender === "M" ? "Male" : patientDetails?.gender === "F" ? "Female" : ""}</p>
                <p>: {patientDetails?.address || ""}</p>
                <p>: {patientDetails?.mobileNumber || ""}</p>
                <p>: {patientDetails?.emergencyContactNumber || ""}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Special Conditions */}
      <div className="flex flex-col w-full lg:w-3/4 bg-white text-black rounded-lg p-4 lg:p-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Special Conditions</h3>
        </div>

        {bioData && (
          <>
            <div className="p-3">
              <h4 className="font-semibold">Chronic Conditions</h4>
              <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-lg text-black text-sm lg:text-base">
                {bioData.conditions.chronic.length > 0 ? (
                  bioData.conditions.chronic.map((condition, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500 text-white rounded-full">
                      {condition}
                    </span>
                  ))
                ) : (
                  <p>Nothing to show</p>
                )}
              </div>
            </div>

            <div className="p-3">
              <h4 className="font-semibold">Surgeries</h4>
              <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-lg text-black text-sm lg:text-base">
                {bioData.conditions.surgeries.length > 0 ? (
                  bioData.conditions.surgeries.map((surgery, index) => (
                    <span key={index} className="px-3 py-1 bg-green-500 text-white rounded-full">
                      {surgery}
                    </span>
                  ))
                ) : (
                  <p>Nothing to show</p>
                )}
              </div>
            </div>

            <div className="p-3">
              <h4 className="font-semibold">Vaccinations</h4>
              <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-lg text-black text-sm lg:text-base">
                {bioData.conditions.vaccinations.length > 0 ? (
                  bioData.conditions.vaccinations.map((vaccination, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500 text-white rounded-full">
                      {vaccination}
                    </span>
                  ))
                ) : (
                  <p>Nothing to show</p>
                )}
              </div>
            </div>
          </>
        )}

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
