import React, { useState, useEffect } from "react";
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
import axios from "axios";
import images from "../../constants/images";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import loadingAnimation from "../../assets/loading.json"; // Loading animation file
import successAnimation from "../../assets/success.json";
import Lottie from "react-lottie";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor } = location.state || {};

  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;

  const Host_Ip =
    process.env.REACT_APP_HOST_IP || "https://medcare-backend.vercel.app";

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    fullName: "",
    problem: "",
    additionalInfo: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [submissionSuccess, setSubmissionSuccess] = useState(false); // Track success

  // Lottie configurations for loading and success
  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // Validation logic
  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = "Appointment date is required";
    if (!formData.time) newErrors.time = "Appointment time is required";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.problem)
      newErrors.problem = "Problem description is required";
    if (!selectedFile) newErrors.file = "You must upload a file";
    if (!termsAgreed) newErrors.termsAgreed = "You must agree to the terms";
    if (!formData.notes) newErrors.notes = "Notes are required"; // Added Notes validation
    if (!formData.additionalInfo)
      newErrors.additionalInfo = "Additional Info is required"; // Added Additional Info validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    setSubmitting(false);
  };

  // Real-time validation on form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate individual field
    if (value) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setErrors({ ...errors, file: null });
    }
  };

  const handleCheckboxChange = (e) => {
    setTermsAgreed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    // Validate form fields before proceeding
    if (!validate()) {
      setSubmitting(false);
      return;
    }

    if (!termsAgreed) {
      alert("You must agree to the terms and conditions.");
      setSubmitting(false);
      return;
    }

    let uploadedFileUrl = "";

    if (selectedFile) {
      try {
        const fileRef = ref(storage, `appointments/${selectedFile.name}`);
        await uploadBytes(fileRef, selectedFile);
        uploadedFileUrl = await getDownloadURL(fileRef);
      } catch (error) {
        console.error("Error uploading file:", error);
        setSubmitting(false);
        return;
      }
    }

    const appointmentData = {
      userId,
      date: formData.date,
      time: formData.time,
      userName: formData.fullName,
      doctorName: doctor.name,
      doctorType: doctor.specialty,
      doctorPic: doctor.image || "fakeImage.png",
      problem: formData.problem,
      notes: formData.notes,
      additionalInfo: formData.additionalInfo,
      file: uploadedFileUrl || fileUrl,
    };

    try {
      const response = await axios.post(
        `${Host_Ip}/patient/appointments/add`,
        appointmentData
      );
      console.log(response.data);
      setSubmitting(false);
      setSubmissionSuccess(true);
      setTimeout(() => {
        navigate("/patient/payment-form");
      }, 2000);
    } catch (error) {
      setSubmitting(false);
      console.error("Error creating appointment:", error);
    }
  };

  if (!doctor) {
    return <div>No doctor selected</div>;
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
            className="hidden md:block w-full mt-4 pl-14 pr-24"
          />
        </div>
        <Card className="p-4 md:p-8 rounded-3xl w-full md:w-1/2 flex flex-col justify-between">
          {/* Show Lottie animation when submitting */}
          {submitting && !submissionSuccess && (
            <div className="flex justify-center items-center">
              <Lottie options={loadingOptions} height={150} width={150} />
            </div>
          )}
          {/* Show success animation when submission is successful */}
          {submissionSuccess && (
            <div className="flex justify-center items-center">
              <Lottie options={successOptions} height={150} width={150} />
            </div>
          )}

          {!submitting && !submissionSuccess && (
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
                      error={!!errors.date}
                      className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                        errors.date ? "border-red-500" : ""
                      }`}
                    />
                    {errors.date && (
                      <Typography color="red">{errors.date}</Typography>
                    )}
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
                      error={!!errors.time}
                      className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                        errors.time ? "border-red-500" : ""
                      }`}
                    />
                    {errors.time && (
                      <Typography color="red">{errors.time}</Typography>
                    )}
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
                    className={`!border-t-blue-gray-200 focus:!border-t-gray-900 mb-2 ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <Typography color="red">{errors.fullName}</Typography>
                  )}

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
                    className={`!border-t-blue-gray-200 focus:!border-t-blue-gray-900 ${
                      errors.problem ? "border-red-500" : ""
                    }`}
                  />
                  {errors.problem && (
                    <Typography color="red">{errors.problem}</Typography>
                  )}
                  {/* Notes Section */}
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 text-sm md:text-base mt-4"
                  >
                    Your Notes
                  </Typography>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter your notes"
                    className={`!border-t-blue-gray-200 focus:!border-t-blue-gray-900 ${
                      errors.notes ? "border-red-500" : ""
                    }`}
                  />
                  {errors.notes && (
                    <Typography color="red">{errors.notes}</Typography>
                  )}

                  {/* Additional Info Section */}
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
                    placeholder="Enter additional info"
                    className={`!border-t-blue-gray-200 focus:!border-t-blue-gray-900 ${
                      errors.additionalInfo ? "border-red-500" : ""
                    }`}
                  />
                  {errors.additionalInfo && (
                    <Typography color="red">{errors.additionalInfo}</Typography>
                  )}
                </div>

                {/* File Upload Section */}
                <div className="flex flex-col">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    className="bg-blue-400 hover:bg-blue-950 text-white rounded-md mt-2"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                    fullWidth
                  >
                    Select File
                  </Button>
                  {errors.file && (
                    <Typography color="red">{errors.file}</Typography>
                  )}
                  {fileUrl && (
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 text-center"
                    >
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
                {(!submitting && (
                  <Button
                    type="submit"
                    className="mt-2 bg-dark-purple text-white bg-amber-900 rounded-md"
                    fullWidth
                  >
                    Continue to Payment
                  </Button>
                )) || (
                  <Button
                    className="mt-2 bg-dark-purple text-white bg-amber-300 rounded-md"
                    fullWidth
                  >
                    Continue to Payment
                  </Button>
                )}
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AppointmentForm;
