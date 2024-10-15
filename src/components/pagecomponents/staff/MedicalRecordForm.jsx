import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  Textarea,
  Select,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios for API requests

// Sample patient data for the dropdown
const PATIENTS = [
  { id: "59b99db4cfa9a34dcd7885b6", name: "John Doe" },
  { id: "59b99db4cfa9a34dcd7885b7", name: "Jane Smith" },
  { id: "59b99db4cfa9a34dcd7885b8", name: "Alice Johnson" },
];

const MedicalRecordForm = () => {
  const navigate = useNavigate();

  // State for form fields
  const [selectedPatient, setSelectedPatient] = useState("");
  const [date, setDate] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [prescription, setPrescription] = useState("");

  const Host_Ip = process.env.Host_Ip || "http://localhost:8010";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new record object
    const newRecord = {
      userId: selectedPatient.userId,
      pName: selectedPatient.pName,
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

  const handlePatientChange = (e) => {
    const patient = PATIENTS.find((p) => p.id == e.target.value);
    setSelectedPatient({ userId: patient.id, pName: patient.name });
  };

  return (
    <Card className="p-4 rounded-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Patient Selection */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Select Patient
          </Typography>
          <Select
            name="selectedPatient"
            id="selectedPatient"
            value={selectedPatient.id}
            onChange={handlePatientChange}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          >
            <option value="" disabled>
              Select a patient
            </option>
            {PATIENTS.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </Select>
        </div>

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
