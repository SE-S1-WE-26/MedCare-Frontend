import React, { useState } from "react";
import { Input, Button, Radio, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

// Environment variable (for React, use REACT_APP_ prefix)
const Host_Ip = process.env.REACT_APP_HOST_IP || "http://localhost:8010";

const BiographicForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "59b99db4cfa9a34dcd7885b6",
    bloodGroup: "",
    bmi: "",
    weight: "",
    height: "",
    condition: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for required fields
    if (!formData.bloodGroup || !formData.bmi || !formData.weight || !formData.height) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${Host_Ip}/patient/biodata/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccess("Biographic data submitted successfully!");
      navigate("/patient");
    } catch (error) {
      setError(error.message || "Failed to submit the form. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center lg:p-12">
      <h1 className="text-2xl lg:text-3xl font-semibold text-left mb-6 text-gray-700">
        Biographic Info
      </h1>
      <div className="bg-white w-full max-w-3xl mx-auto rounded-lg lg:p-8 shadow-lg">
        <div className="rounded-lg p-6">
          <p className="text-sm font-light mb-6 text-center text-gray-500">
            Fill in the biographic data for the patient's profile
          </p>

          {/* Show success or error message */}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blood Group */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                onChange={handleChange}
                className="p-2 mt-1 rounded-md border border-blue-gray-200 outline-none text-gray-600 w-full"
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* BMI, Weight, Height */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                type="number"
                variant="outlined"
                label="BMI"
                name="bmi"
                placeholder="Enter BMI"
                onChange={handleChange}
                className="w-full"
                required
              />
              <Input
                type="number"
                variant="outlined"
                label="Weight (kg)"
                name="weight"
                placeholder="Enter weight"
                onChange={handleChange}
                className="w-full"
                required
              />
              <Input
                type="number"
                variant="outlined"
                label="Height (cm)"
                name="height"
                placeholder="Enter height"
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            {/* Special Conditions */}
            <div className="space-y-4 outline outline-2 rounded-lg outline-blue-gray-500 p-5">
              <p className="block text-sm font-medium text-gray-600">
                Special Conditions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Radio
                  id="chronic"
                  name="condition"
                  label="Chronic Condition"
                  value="Chronic Condition"
                  onChange={handleChange}
                />
                <Radio
                  id="surgeries"
                  name="condition"
                  label="Surgeries"
                  value="Surgeries"
                  onChange={handleChange}
                />
                <Radio
                  id="vaccination"
                  name="condition"
                  label="Vaccination"
                  value="Vaccination"
                  onChange={handleChange}
                />
                <Radio
                  id="other"
                  name="condition"
                  label="Other"
                  value="Other"
                  onChange={handleChange}
                />
              </div>
              {/* Details */}
              <Textarea
                variant="outlined"
                label="Enter Details"
                name="details"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Back and Submit Buttons */}
            <div className="flex justify-between gap-6 pt-6">
              <Button type="button" color="gray" variant="outlined" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button type="submit" color="blue" variant="filled" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BiographicForm;
