import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Host_Ip = process.env.REACT_APP_HOST_IP || "https://medcare-backend.vercel.app";

const BiographicForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));

  const [formData, setFormData] = useState({
    userId: user._id,
    bloodGroup: "",
    bmi: "",
    weight: "",
    height: "",
    conditions: {
      chronic: [],
      surgeries: [],
      vaccinations: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [bioDataId, setBioDataId] = useState(null); // Track the ID of existing bio data

  // Fetch existing bio data when the component mounts
  useEffect(() => {
    const fetchBioData = async () => {
      try {
        const response = await axios.get(`${Host_Ip}/patient/biodata/user/${user._id}`);
        const bioData = response.data;

        // Populate form data if bioData exists
        if (bioData) {
          setBioDataId(bioData._id); // Store the ID of the bio data
          setFormData((prev) => ({
            ...prev,
            bloodGroup: bioData.bloodGroup || "",
            bmi: bioData.bmi || "",
            weight: bioData.weight || "",
            height: bioData.height || "",
            conditions: {
              chronic: bioData.conditions.chronic || [],
              surgeries: bioData.conditions.surgeries || [],
              vaccinations: bioData.conditions.vaccinations || [],
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching bio data:", error);
      }
    };

    fetchBioData();
  }, [user._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bloodGroup" || name === "bmi" || name === "weight" || name === "height") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleConditionChange = (index, type, value) => {
    setFormData((prev) => {
      const updatedConditions = [...prev.conditions[type]];
      updatedConditions[index] = value;
      return {
        ...prev,
        conditions: {
          ...prev.conditions,
          [type]: updatedConditions,
        },
      };
    });
  };

  const addConditionField = (type) => {
    setFormData((prev) => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [type]: [...prev.conditions[type], ""],
      },
    }));
  };

  const removeConditionField = (index, type) => {
    setFormData((prev) => {
      const updatedConditions = prev.conditions[type].filter((_, i) => i !== index);
      return {
        ...prev,
        conditions: {
          ...prev.conditions,
          [type]: updatedConditions,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bloodGroup || !formData.bmi || !formData.weight || !formData.height) {
        setError("All fields are required");
        return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
        // Prepare the data for submission
        const dataToSubmit = {
            ...formData,
            chronic: formData.conditions.chronic.filter(cond => cond.trim() !== ""),
            surgeries: formData.conditions.surgeries.filter(surgery => surgery.trim() !== ""),
            vaccinations: formData.conditions.vaccinations.filter(vaccine => vaccine.trim() !== ""),
        };

        if (bioDataId) {
            // Update existing bio data
            const updateResponse = await axios.put(`${Host_Ip}/patient/biodata/update/${bioDataId}`, dataToSubmit);

            if (updateResponse.status !== 200) {
                throw new Error(updateResponse.data.message || `HTTP error! status: ${updateResponse.status}`);
            }

            setSuccess("Biographic data updated successfully!");
        } else {
            // Add new bio data
            const addResponse = await axios.post(`${Host_Ip}/patient/biodata/add`, dataToSubmit);

            if (addResponse.status !== 201) {
                throw new Error(addResponse.data.message || `HTTP error! status: ${addResponse.status}`);
            }

            setSuccess("Biographic data submitted successfully!");
        }

        navigate("/patient/medical-profile");
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
                value={formData.bloodGroup}
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
                value={formData.bmi}
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
                value={formData.weight}
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
                value={formData.height}
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

              {/* Chronic Conditions */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Chronic Conditions</label>
                {formData.conditions.chronic.map((condition, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={condition}
                      placeholder="Enter a chronic condition"
                      onChange={(e) => handleConditionChange(index, "chronic", e.target.value)}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      color="red"
                      onClick={() => removeConditionField(index, "chronic")}
                      className="ml-2"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <Button type="button" color="blue" variant="outlined" onClick={() => addConditionField("chronic")}>
                  Add Chronic Condition
                </Button>
              </div>

              {/* Surgeries */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Surgeries</label>
                {formData.conditions.surgeries.map((surgery, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={surgery}
                      placeholder="Enter a surgery"
                      onChange={(e) => handleConditionChange(index, "surgeries", e.target.value)}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      color="red"
                      onClick={() => removeConditionField(index, "surgeries")}
                      className="ml-2"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <Button type="button" color="blue" variant="outlined" onClick={() => addConditionField("surgeries")}>
                  Add Surgery
                </Button>
              </div>

              {/* Vaccinations */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Vaccinations</label>
                {formData.conditions.vaccinations.map((vaccine, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={vaccine}
                      placeholder="Enter a vaccination"
                      onChange={(e) => handleConditionChange(index, "vaccinations", e.target.value)}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      color="red"
                      onClick={() => removeConditionField(index, "vaccinations")}
                      className="ml-2"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <Button type="button" color="blue" variant="outlined" onClick={() => addConditionField("vaccinations")}>
                  Add Vaccination
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" color="blue" fullWidth>
              {loading ? "Loading..." : bioDataId ? "Update Biographic Data" : "Submit Biographic Data"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BiographicForm;
