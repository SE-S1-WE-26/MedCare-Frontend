import React, { useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Sample data
const patientDetails = {
  name: "Kusal Perera",
  profileImage: "https://randomuser.me/api/portraits/med/men/75.jpg",
  biodata: [
    { label: "Blood Group", value: "O+" },
    { label: "Weight", value: "60 kg" },
    { label: "Height", value: "170 cm" },
    { label: "Allergies", value: "Fexofenadine" },
  ],
  demographics: [
    { label: "Name", value: "Anne Watson" },
    { label: "Age", value: "23 Years" },
    { label: "Birthday", value: "01/01/2001" },
    { label: "Gender", value: "Male" },
    { label: "Mobile", value: "07123456789" },
    { label: "Emergency", value: "01178964532" },
    { label: "Address", value: "Malabe, Colombo" },
  ],
};

const specialConditions = [
  { title: "Chronic Conditions", content: "Nothing to show" },
  { title: "Surgeries", content: "Nothing to show" },
  { title: "Vaccination", content: "Nothing to show" },
];

const MedicalProfile = () => {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const navigate = useNavigate();
  const handleDemographic = (link) => {
    navigate('/patient/demographic-form');
  };
  const handleBiographic = (link) => {
    navigate('/patient/biographic-form');
  };

  return (
    <div className="flex flex-col lg:flex-row lg:w-full w-full gap-5 p-2 lg:p-4 text-foreground text-white">
      {/* Left Section: Patient Details */}
      <div className="flex w-full bg-white rounded-lg lg:w-2/4 text-black">
        <div className="w-full space-y-6 p-4 lg:p-6">
          <h2 className="font-extrabold text-lg lg:text-xl p-3 rounded-lg text-center">
            Patient Details
          </h2>
          <div className="flex space-x-5 items-center justify-center lg:justify-start">
            <img
              src={patientDetails.profileImage}
              className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl"
              alt="profile"
            />
            <p className="font-bold text-lg">{patientDetails.name}</p>
          </div>

          {/* Bio Data Section */}
          <div className="flex justify-between pr-2 cursor-pointer lg:cursor-default" onClick={() => setIsBioOpen(!isBioOpen)}>
            <p className="font-medium">Bio Data</p>
            <TfiAlignJustify />
          </div>
          <div className={`flex lg:flex-row justify-between ${isBioOpen ? "block" : "hidden"} lg:flex`}>
            <div className="space-y-1 text-sm lg:text-base">
              {patientDetails.biodata.map((item, index) => (
                <p key={index}>{item.label}</p>
              ))}
            </div>
            <div className="space-y-1 text-sm lg:text-base">
              {patientDetails.biodata.map((item, index) => (
                <p key={index}>: {item.value}</p>
              ))}
            </div>
          </div>

          {/* Demographic Data Section */}
          <div className="flex justify-between pt-2 pr-2 cursor-pointer lg:cursor-default" onClick={() => setIsDemoOpen(!isDemoOpen)}>
            <p className="font-medium">Demographic Data</p>
            <TfiAlignJustify />
          </div>
          <div className={`flex justify-between ${isDemoOpen ? "block" : "hidden"} lg:block`}>
            <div className="space-y-1 text-sm lg:text-base">
              {patientDetails.demographics.map((item, index) => (
                <p key={index}>{item.label}</p>
              ))}
            </div>
            <div className="space-y-1 text-sm lg:text-base">
              {patientDetails.demographics.map((item, index) => (
                <p key={index}>: {item.value}</p>
              ))}
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
          <button className="w-full bg-blue-500 text-white rounded-lg p-2 lg:p-4 font-semibold" onClick={()=>{handleDemographic()}}>
            Add Demographic Data
          </button>
          <button className="w-full bg-blue-500 text-white rounded-lg p-2 lg:p-4 font-semibold" onClick={()=>{handleBiographic()}}>
            Add Biographic Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalProfile;
