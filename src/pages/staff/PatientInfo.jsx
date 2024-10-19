import React, { useState, useEffect } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { useParams, useNavigate } from "react-router-dom";
import { calculateAge } from "../../utils/dateUtils";
import { fetchPatientDetails } from "../../utils/patientUtils";
import Loader from "../../components/pagecomponents/Loader";
import { Card } from "@material-tailwind/react";
import axios from "axios";

const PatientInfo = () => {
  const { patientId } = useParams();
  const [isBioOpen, setIsBioOpen] = useState(true);
  const [isDemoOpen, setIsDemoOpen] = useState(true);
  const [patientDetails, setPatientDetails] = useState(null);
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const Host_Ip = process.env.Host_Ip || 'http://localhost:8010';

  const navigate = useNavigate();

  const handleDemographic = () => navigate(`/patient/demographic-form/${patientId}`);
  const handleBiographic = () => navigate(`/patient/biographic-form/${patientId}`);
  const handleMedicalRecord = () => navigate(`/staff/medical-records/create/${patientId}`);


  const getPatientDetails = async () => {
    try {
      const userResponse = await axios.get(`${Host_Ip}/user/${patientId}`);
      setUserDetails(userResponse.data);
      const { demographicData, bioData } = await fetchPatientDetails(patientId);
      setPatientDetails(demographicData);
      setBioData(bioData);
      console.log("Patient details:", demographicData);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientDetails();
  }, [patientId]);


  if (loading) {
    return (
      <div className="w-full flex my-auto items-center justify-center">
        <Loader />
      </div>
    );
  }

  const { image } = userDetails || {};

  return (
    <div className="flex flex-col lg:flex-row lg:w-full w-full gap-5 p-2 lg:p-4 text-foreground text-white">
      {/* Left Section: Patient Details */}
      <div className="flex w-full bg-white rounded-lg lg:w-1/3 text-black">
        <div className="w-full space-y-4 p-4 lg:p-6">
          <div className="flex space-x-5 items-center justify-center lg:justify-start">
            <img
              src={image || "/default-profile.png"}
              className="w-20 h-20 lg:w-14 lg:h-14 rounded-full"
              alt="profile"
            />
            <p className="font-semibold text-sm">{`${patientDetails?.firstName || ""} ${patientDetails?.lastName || ""}`}</p>
          </div>

          {/* Bio Data Section */}
          <div className="border-b border-gray-300 pb-2">
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => setIsBioOpen(!isBioOpen)}
            >
              <p className="font-medium pb-2">Bio Data</p>
              <TfiAlignJustify />
            </div>
            {isBioOpen && (
              <Card className="p-4 border-2 border-light-blue">
                <div className="flex lg:flex-row justify-between w-full">
                  <div className="space-y-2 text-sm lg:text-base w-full">
                    <div className="flex flex-row justify-between text-xs">
                      <p>Blood Group:</p>
                      <p>{bioData?.bloodGroup || "N/A"}</p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                      <p>Weight:</p>
                      <p>{bioData?.weight ? `${bioData.weight} kg` : "N/A"}</p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                      <p>Height:</p>
                      <p>{bioData?.height ? `${bioData.height} cm` : "N/A"}</p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                      <p>BMI:</p>
                      <p>{bioData?.bmi || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Demographic Data Section */}
          <div className="border-b border-gray-300 pb-2">
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => setIsDemoOpen(!isDemoOpen)}
            >
              <p className="font-medium pb-2">Demographic Data</p>
              <TfiAlignJustify />
            </div>
            {isDemoOpen && (
              <Card className="p-4 border-2 border-light-blue">
                <div className="flex justify-between w-full">
                  <div className="space-y-2 text-sm lg:text-base w-full">
                    <div className="flex flex-row justify-between text-xs">
                      <p>Age:</p>
                      <p>
                        {patientDetails?.birthday
                          ? calculateAge(patientDetails.birthday)
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                      <p>Birthday:</p>
                      <p>
                        {patientDetails?.birthday
                          ? new Date(patientDetails.birthday).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                      <p>Gender:</p>
                      <p>
                        {patientDetails?.gender === "M"
                          ? "Male"
                          : patientDetails?.gender === "F"
                          ? "Female"
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                      <p>Address:</p>
                      <p>{patientDetails?.address || "N/A"}</p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                      <p>Mobile Number:</p>
                      <p>{patientDetails?.mobileNumber || "N/A"}</p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                      <p>Emergency Contact:</p>
                      <p>{patientDetails?.emergencyContactNumber || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Special Conditions */}
      <div className="flex flex-col w-full lg:w-3/4 bg-white text-black rounded-lg p-4 lg:p-6">
        {bioData && (
          <>
            <div className="p-3">
              <h4 className="font-semibold mb-2">Chronic Conditions</h4>
              <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-full text-black text-sm lg:text-base">
                {bioData.conditions.chronic.length > 0 ? (
                  bioData.conditions.chronic.map((condition, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500 text-white rounded-full"
                    >
                      {condition}
                    </span>
                  ))
                ) : (
                  <p>No chronic conditions to show</p>
                )}
              </div>
            </div>

            <div className="p-3">
              <h4 className="font-semibold mb-2">Surgeries</h4>
              <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-full text-black text-sm lg:text-base">
                {bioData.conditions.surgeries.length > 0 ? (
                  bioData.conditions.surgeries.map((surgery, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-500 text-white rounded-full"
                    >
                      {surgery}
                    </span>
                  ))
                ) : (
                  <p>No surgeries to show</p>
                )}
              </div>
            </div>

            <div className="p-3">
              <h4 className="font-semibold mb-2">Vaccinations</h4>
              <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-full text-black text-sm lg:text-base">
                {bioData.conditions.vaccinations.length > 0 ? (
                  bioData.conditions.vaccinations.map((vaccination, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500 text-white rounded-full"
                    >
                      {vaccination}
                    </span>
                  ))
                ) : (
                  <p>No vaccinations to show</p>
                )}
              </div>
            </div>

            <div className="flex flex-row">
            <button
            className="w-full bg-blue-500 text-white rounded-lg font-semibold py-2"
            onClick={handleMedicalRecord}
          >
            Add Medical Record
          </button>
            <button
            className="w-full bg-blue-500 text-white rounded-lg font-semibold py-2"
            onClick={handleDemographic}
          >
            Add Demographic Data
          </button>
          <button
            className="w-full bg-blue-500 text-white rounded-lg font-semibold py-2"
            onClick={handleBiographic}
          >
            Add Biographic Data
          </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientInfo;
