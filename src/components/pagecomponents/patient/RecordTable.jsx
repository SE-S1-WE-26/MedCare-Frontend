import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Input, Dialog } from "@material-tailwind/react";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { formatDate } from "../../../utils/dateUtils";
import { truncateText } from "../../../utils/textUtils";

const TABLE_HEAD = ["Date", "Condition", "Notes", "Follow-up Date", "Actions"];

const RecordsTable = ({ patientId }) => {
  const Host_Ip = process.env.REACT_APP_HOST_IP || "https://medcare-backend.vercel.app";
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMedicalRecords = async () => {
    try {
      const response = await fetch(`${Host_Ip}/patient/medical/user/${patientId}`);
      if (response.ok) {
        const data = await response.json();
        setMedicalRecords(data);
        setFilteredRecords(data); // Set filtered records initially to all records
      } else {
        setError("Failed to fetch medical records");
      }
    } catch (error) {
      setError("Error fetching medical records: " + error.message);
    }
  };

  const handleEdit = (record) => {
    const formattedRecord = {
      ...record,
      date: record.date ? new Date(record.date).toISOString().split("T")[0] : "",
      followUpDate: record.followUpDate
        ? new Date(record.followUpDate).toISOString().split("T")[0]
        : "",
    };
    setSelectedRecord(formattedRecord);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (recordId) => {
    try {
      const response = await fetch(`${Host_Ip}/patient/medical/delete/${recordId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Refresh the list of medical records after deletion
        fetchMedicalRecords();
      } else {
        setError("Failed to delete medical record");
      }
    } catch (error) {
      setError("Error deleting medical record: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    setSelectedRecord({ ...selectedRecord, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${Host_Ip}/patient/medical/update/${selectedRecord._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRecord),
      });
      if (response.ok) {
        fetchMedicalRecords();
        setIsEditModalOpen(false);
        setSelectedRecord(null);
      } else {
        setError("Failed to update medical record");
      }
    } catch (error) {
      setError("Error updating medical record: " + error.message);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Filter records based on the search term
    const filtered = medicalRecords.filter((record) =>
      record.condition.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, [patientId]);

  return (
    <Card className="w-full">
      {error && (
        <Typography variant="small" color="red" className="p-4">
          {error}
        </Typography>
      )}
      <div className="p-4">
        <Input
          label="Search Medical Records by Condition"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="border-b border-gray-200 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record._id}>
                <td className="p-4">{formatDate(record.date)}</td>
                <td className="p-4">{record.condition}</td>
                <td className="p-4">{truncateText(record.notes, 50)}</td>
                <td className="p-4">{formatDate(record.followUpDate)}</td>
                <td className="p-4 flex gap-2">
                  <Button
                    variant="text"
                    color="blue"
                    size="sm"
                    onClick={() => handleEdit(record)}
                  >
                    <HiOutlinePencilAlt className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="text"
                    color="red"
                    size="sm"
                    onClick={() => handleDelete(record._id)}
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Dialog
        open={isEditModalOpen}
        handler={() => setIsEditModalOpen(false)}
        size="lg"
      >
        <div className="p-6 gap-4 flex flex-col">
          <Typography variant="h5" className="mb-4">
            Edit Medical Record
          </Typography>
          <form className="space-y-4 flex flex-col gap-4">
            <Input
              label="Date"
              type="date"
              name="date"
              value={selectedRecord?.date || ""}
              onChange={handleInputChange}
            />
            <Input
              label="Condition"
              name="condition"
              value={selectedRecord?.condition || ""}
              onChange={handleInputChange}
            />
            <Input
              label="Notes"
              name="notes"
              value={selectedRecord?.notes || ""}
              onChange={handleInputChange}
            />
            <Input
              label="Follow-up Date"
              type="date"
              name="followUpDate"
              value={selectedRecord?.followUpDate || ""}
              onChange={handleInputChange}
            />
          </form>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outlined"
              color="red"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="filled" color="blue" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Dialog>
    </Card>
  );
};

export default RecordsTable;
