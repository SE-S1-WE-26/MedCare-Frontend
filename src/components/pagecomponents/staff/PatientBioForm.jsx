import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

const PatientBioForm = () => {
  const { patientId } = useParams();
  console.log("patientId:", patientId);

  const Host_Ip = process.env.REACT_APP_HOST_IP || "http://localhost:8010";

  const [formData, setFormData] = useState({
    userId: patientId,
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

  useEffect(() => {
    console.log("patientId:", patientId);
  }, [patientId]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const updatedConditions = prev.conditions[type].filter(
        (_, i) => i !== index
      );
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
    console.log("patientId:", patientId);
    e.preventDefault();
    if (
      !formData.bloodGroup ||
      !formData.bmi ||
      !formData.weight ||
      !formData.height
    ) {
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
        chronic: formData.conditions.chronic.filter(
          (cond) => cond.trim() !== ""
        ),
        surgeries: formData.conditions.surgeries.filter(
          (surgery) => surgery.trim() !== ""
        ),
        vaccinations: formData.conditions.vaccinations.filter(
          (vaccine) => vaccine.trim() !== ""
        ),
      };

      // Directly call the add endpoint since edit functionality is removed
      const response = await fetch(`${Host_Ip}/patient/biodata/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        setSuccess("Biographic data submitted successfully!");
      }

      const result = await response.json();
      setSuccess("Biographic data submitted successfully!");

      // Reset form data after successful submission
      setFormData({
        userId: patientId,
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
    } catch (error) {
      setError(error.message || "Failed to submit the form. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center flex-col">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Biographic Info
      </h1>
      <div className="bg-white w-full max-w-3xl mx-auto rounded-lg lg:p-8 shadow-lg">
        <div className="rounded-lg p-6">

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
                <label className="block text-sm font-medium text-gray-600">
                  Chronic Conditions
                </label>
                {formData.conditions.chronic.map((condition, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={condition}
                      placeholder="Enter a chronic condition"
                      onChange={(e) =>
                        handleConditionChange(index, "chronic", e.target.value)
                      }
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
                <Button
                  type="button"
                  color="blue"
                  variant="outlined"
                  onClick={() => addConditionField("chronic")}
                >
                  Add Chronic Condition
                </Button>
              </div>

              {/* Surgeries */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Surgeries
                </label>
                {formData.conditions.surgeries.map((surgery, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={surgery}
                      placeholder="Enter a surgery"
                      onChange={(e) =>
                        handleConditionChange(
                          index,
                          "surgeries",
                          e.target.value
                        )
                      }
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
                <Button
                  type="button"
                  color="blue"
                  variant="outlined"
                  onClick={() => addConditionField("surgeries")}
                >
                  Add Surgery
                </Button>
              </div>

              {/* Vaccinations */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Vaccinations
                </label>
                {formData.conditions.vaccinations.map((vaccine, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={vaccine}
                      placeholder="Enter a vaccination"
                      onChange={(e) =>
                        handleConditionChange(
                          index,
                          "vaccinations",
                          e.target.value
                        )
                      }
                      className="w-full"
                    />
                    <Button
                      type="button"
                      color="red"
                      onClick={() =>
                        removeConditionField(index, "vaccinations")
                      }
                      className="ml-2"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  color="blue"
                  variant="outlined"
                  onClick={() => addConditionField("vaccinations")}
                >
                  Add Vaccination
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              color="blue"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientBioForm;
