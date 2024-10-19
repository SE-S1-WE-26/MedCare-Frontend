import React, { useState } from "react";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import {
  Card,
  Typography,
  Button,
  Textarea,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import DoctorCard from "../../components/pagecomponents/patient/DoctorCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import images from "../../constants/images";
import { storage } from "../../firebaseConfig"; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const AppointmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor } = location.state || {}; // Access the passed doctor object

  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;

  const Host_Ip = process.env.REACT_APP_HOST_IP || "https://medcare-backend.vercel.app";

  const [formData, setFormData] = useState({

    date: "",
    time: "",
    fullName: "",
    problem: "",
    additionalInfo: "",
    notes: "",
  });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    
    try {
      const fileRef = ref(storage, `appointments/${selectedFile.name}`);
      await uploadBytes(fileRef, selectedFile);
      const downloadURL = await getDownloadURL(fileRef);
     
      setFileUrl(downloadURL); 
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    setTermsAgreed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!termsAgreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }
  
    let uploadedFileUrl = "";
  
    // Upload the file if it’s selected
    if (selectedFile) {
      try {
        const fileRef = ref(storage, `appointments/${selectedFile.name}`);
        await uploadBytes(fileRef, selectedFile);
        uploadedFileUrl = await getDownloadURL(fileRef);
      } catch (error) {
        console.error("Error uploading file:", error);
        return; // Exit if the file upload fails
      }
    }
  
    const appointmentData = {
      userId: userId,
      date: formData.date,
      time: formData.time,
      userName: formData.fullName,
      doctorName: doctor.name,
      doctorType: doctor.specialty,
      doctorPic: doctor.image || "fakeImage.png",
      problem: formData.problem,
      notes: formData.notes,
      additionalInfo: formData.additionalInfo,
      file: uploadedFileUrl || fileUrl // Assign the correct file URL here
    };
  
    try {
      const response = await axios.post(`${Host_Ip}/patient/appointments/add`, appointmentData);
      console.log(response.data);
      navigate("/patient/payment-form");
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
  
  

  if (!doctor) {
    return <div>No doctor selected</div>; // Handle case where no doctor is passed
  }

  return (
    <div className="w-full lg:mb-6 md:mb-8">
      <BackNavigation label="Make an Appointment" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="px-2 w-full md:w-1/2 flex flex-col">
          <DoctorCard doctor={doctor} />
          <img
            src={images.poster1}
            alt="Doctor"
            className="hidden md:block w-full mt-4 pl-14 pr-24 "
          />
        </div>
        <Card className="p-4 md:p-8 rounded-3xl w-full md:w-1/2 flex flex-col justify-between">
          <form className="lg:mt-12 items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {/* Appointment Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 text-sm md:text-base"
                  >
                    Appointment Date
                  </Typography>
                  <Input
                    size="xs"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="date"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 text-sm md:text-base"
                  >
                    Appointment Time
                  </Typography>
                  <Input
                    size="xs"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    type="time"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>

              {/* Full Name and Problem Description */}
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2 text-sm md:text-base"
                >
                  Full Name
                </Typography>
                <Input
                  size="lg"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2 text-sm md:text-base mt-4"
                >
                  Your Problem
                </Typography>
                <Textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Describe your problem"
                  className="!border-t-blue-gray-200 focus:!border-t-blue-gray-900"
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2 text-sm md:text-base mt-4"
                >
                  Additional Info
                </Typography>
                <Textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Enter Additional Info"
                  className="!border-t-blue-gray-200 focus:!border-t-blue-gray-900"
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2 text-sm md:text-base mt-4"
                >
                  Notes
                </Typography>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                  className="!border-t-blue-gray-200 focus:!border-t-blue-gray-900"
                />
              </div>

              {/* File Upload Section with Button */}
              {/* File Upload Section */}
              <div className="flex flex-col">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  className="bg-blue-500 text-white rounded-md mt-2"
                  onClick={() => document.getElementById("file-upload").click()}
                  fullWidth
                >
                  Select File
                </Button>

                {fileUrl && (
                  <Typography variant="small" color="gray" className="mt-2 text-center">
                    File uploaded successfully!
                  </Typography>
                )}
              </div>

              {/* Checkbox for Terms and Conditions */}
              <Checkbox
                checked={termsAgreed}
                onChange={handleCheckboxChange}
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree to the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-2 bg-dark-blue rounded-full"
                fullWidth
              >
                Continue
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentForm;
