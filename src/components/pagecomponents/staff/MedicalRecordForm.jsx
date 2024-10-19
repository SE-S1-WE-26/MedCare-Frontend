import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PatientInfoCard from "./PatientInfoCard";

const MedicalRecordForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  // State for form fields
  const [date, setDate] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [prescription, setPrescription] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const Host_Ip = process.env.Host_Ip || "https://medcare-backend.vercel.app";

  const getPatientDetails = async () => {
    try {
      const userResponse = await axios.get(`${Host_Ip}/user/${patientId}`);
      setUserDetails(userResponse.data);
      console.log("Patient details:", userResponse.data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  useEffect(() => {
    getPatientDetails();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure userDetails is available
    if (!userDetails) {
      console.error("User details not loaded yet");
      return;
    }

    // Create a new record object
    const newRecord = {
      userId: patientId,
      pname: userDetails.name,
      date,
      condition,
      notes,
      followUpDate,
      symptoms,
      prescription,
    };

    try {
      // Send POST request to backend
      const response = await axios.post(
        `${Host_Ip}/patient/medical/add`,
        newRecord
      );
      if (response.status === 201) {
        console.log("Record added:", response.data);
        navigate("/staff/medical-records"); // Redirect after successful submission
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <Card className="p-4 rounded-3xl">
      <PatientInfoCard patientId={patientId} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Medical Record Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Date
            </Typography>
            <Input
              size="xs"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Condition
            </Typography>
            <Input
              size="xs"
              placeholder="Enter condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
        </div>

        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Notes
          </Typography>
          <Textarea
            placeholder="Enter notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Follow-up Date
            </Typography>
            <Input
              size="xs"
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Symptoms
            </Typography>
            <Input
              size="xs"
              placeholder="Enter symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
        </div>

        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Prescription
          </Typography>
          <Textarea
            placeholder="Enter prescription"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4 bg-dark-blue rounded-full">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default MedicalRecordForm;
