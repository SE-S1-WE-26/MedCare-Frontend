import React, { useState, useEffect } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../../utils/dateUtils";
import { fetchPatientDetails } from "../../utils/patientUtils";
import Loader from "../../components/pagecomponents/Loader";
import { Card } from "@material-tailwind/react";
import { sPatientDetails, sBioData } from "../../constants/constants";

const MedicalProfile = () => {
  const [isBioOpen, setIsBioOpen] = useState(true);
  const [isDemoOpen, setIsDemoOpen] = useState(true);
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
      // Set sample data in case of error
      setPatientDetails(sPatientDetails);
      setBioData(sBioData);
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
      <div className="flex w-full bg-white rounded-lg lg:w-2/4 text-black">
        <div className="w-full space-y-4 p-4 lg:p-6">
          <div className="flex space-x-5 items-center justify-center lg:justify-start">
            <img
              src={user?.image || "https://via.placeholder.com/150"}
              className="w-12 h-14 lg:w-14 lg:h-14 rounded-full"
              alt="profile"
            />
            <p className="font-semibold text-sm">{`${
              patientDetails?.firstName || sPatientDetails.firstName
            } ${patientDetails?.lastName || sPatientDetails.lastName}`}</p>
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
                    <div className="flex flex-row justify-between text-sm">
                      <p>Blood Group:</p>
                      <p>{bioData?.bloodGroup || sBioData.bloodGroup}</p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <p>Weight:</p>
                      <p>{bioData?.weight ? `${bioData.weight} kg` : `${sBioData.weight} kg`}</p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <p>Height:</p>
                      <p>{bioData?.height ? `${bioData.height} cm` : `${sBioData.height} cm`}</p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <p>BMI:</p>
                      <p>{bioData?.bmi || sBioData.bmi}</p>
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
                    <div className="flex flex-row justify-between text-sm">
                      <p>Age:</p>
                      <p>
                        {patientDetails?.birthday
                          ? calculateAge(patientDetails.birthday)
                          : calculateAge(sPatientDetails.birthday)}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <p>Birthday:</p>
                      <p>
                        {patientDetails?.birthday
                          ? new Date(patientDetails.birthday).toLocaleDateString()
                          : new Date(sPatientDetails.birthday).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <p>Gender:</p>
                      <p>
                        {patientDetails?.gender || sPatientDetails.gender  === "M"
                          ? "Male"
                          : patientDetails?.gender || sPatientDetails.gender === "F"
                          ? "Female"
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <p>Address:</p>
                      <p>{patientDetails?.address || sPatientDetails.address}</p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <p>Mobile Number:</p>
                      <p>{patientDetails?.mobileNumber || sPatientDetails.mobileNumber}</p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                      <p>Emergency Contact:</p>
                      <p>{patientDetails?.emergencyContactNumber || sPatientDetails.emergencyContactNumber}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Special Conditions */}
      <div className="flex flex-col w-full lg:w-2/4 bg-white text-black rounded-lg p-4 lg:p-6">
        <div className="p-3">
          <h4 className="font-semibold mb-2">Chronic Conditions</h4>
          <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-lg text-black text-sm lg:text-base">
            {bioData?.conditions?.chronic?.length > 0 ? (
              bioData.conditions.chronic.map((condition, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full"
                >
                  {condition}
                </span>
              ))
            ) : (
              sBioData.conditions.chronic.map((condition, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full"
                >
                  {condition}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="p-3">
          <h4 className="font-semibold mb-2">Surgeries</h4>
          <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-lg text-black text-sm lg:text-base">
            {bioData?.conditions?.surgeries?.length > 0 ? (
              bioData.conditions.surgeries.map((surgery, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-500 text-white rounded-full"
                >
                  {surgery}
                </span>
              ))
            ) : (
              sBioData.conditions.surgeries.map((surgery, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-500 text-white rounded-full"
                >
                  {surgery}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="p-3">
          <h4 className="font-semibold mb-2">Vaccinations</h4>
          <div className="p-4 lg:p-6 flex flex-wrap gap-2 items-center bg-gray-100 rounded-lg text-black text-sm lg:text-base">
            {bioData?.conditions?.vaccinations?.length > 0 ? (
              bioData.conditions.vaccinations.map((vaccination, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500 text-white rounded-full"
                >
                  {vaccination}
                </span>
              ))
            ) : (
              sBioData.conditions.vaccinations.map((vaccination, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500 text-white rounded-full"
                >
                  {vaccination}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalProfile;
