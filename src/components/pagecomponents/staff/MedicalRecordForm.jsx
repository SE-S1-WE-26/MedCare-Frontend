import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MedicalRecordForm = () => {
  const navigate = useNavigate();

  // State for form fields
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [date, setDate] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [prescription, setPrescription] = useState("");

  const Host_Ip = process.env.Host_Ip || "http://localhost:8010";

  // Fetch patients when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${Host_Ip}/patients/`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [Host_Ip]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the selected patient's information
    const selectedPatientInfo = patients.find((p) => p._id === selectedPatient);

    // Create a new record object
    const newRecord = {
      userId: selectedPatientInfo.userId,
      pname: selectedPatientInfo.name,
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
    setSelectedPatient(e.target.value);
  };

  return (
    <Card className="p-4 rounded-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Patient Selection */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Select Patient
          </Typography>
          <select
            name="selectedPatient"
            id="selectedPatient"
            value={selectedPatient}
            onChange={handlePatientChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select a patient
            </option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
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
