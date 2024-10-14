import React, { useState } from "react";
import { Card, Typography, Button, Input, Textarea, Select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

// Sample patient data for the dropdown (you might fetch this from an API or use your existing data)
const PATIENTS = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
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
  const [treatment, setTreatment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new record object
    const newRecord = {
      selectedPatient,
      date,
      condition,
      notes,
      followUpDate,
      symptoms,
      treatment,
    };

    // Log the new record to the console (or handle it as needed)
    console.log(newRecord);
    
    // Optionally navigate away or reset the form
    navigate("/staff/medical-records"); // Change to the desired path
  };

  return (
    <Card className="p-4 rounded-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Patient Selection */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">Select Patient</Typography>
          <Select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          >
            <option value="" disabled>Select a patient</option>
            {PATIENTS.map(patient => (
              <option key={patient.id} value={patient.name}>{patient.name}</option>
            ))}
          </Select>
        </div>

        {/* Medical Record Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">Date</Typography>
            <Input
              size="xs"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">Condition</Typography>
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
          <Typography variant="h6" color="blue-gray" className="mb-2">Notes</Typography>
          <Textarea
            placeholder="Enter notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">Follow-up Date</Typography>
            <Input
              size="xs"
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">Symptoms</Typography>
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
          <Typography variant="h6" color="blue-gray" className="mb-2">Treatment</Typography>
          <Textarea
            placeholder="Enter treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
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
