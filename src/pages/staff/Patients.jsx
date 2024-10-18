import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/pagecomponents/PageTitle';
import PatientCard from '../../components/pagecomponents/staff/PatientCard';
import SearchBar from '../../components/pagecomponents/SearchBar';
import axios from 'axios';
import icons from '../../constants/icons';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  const Host_Ip = process.env.Host_Ip || 'http://localhost:8010';

  // Fetch patients when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${Host_Ip}/patients/`);
        setPatients(response.data);
        setFilteredPatients(response.data); // Initialize filteredPatients with the fetched data
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, [Host_Ip]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = patients.filter((patient) =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm)
    );
    setFilteredPatients(filtered);
  };

  const handleEdit = (patient) => {
    // Implement edit functionality
    console.log('Edit patient:', patient);
  };

  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`${Host_Ip}/patients/${patientId}`);
      const updatedPatients = patients.filter((patient) => patient._id !== patientId);
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="w-full">
      <PageTitle label="Patients" />
      <SearchBar
        placeholder="Search for a Patient..."
        onChange={handleSearchChange}
      />
      <div className="mt-6 overflow-y-scroll max-h-[70vh]">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient._id}
            patient={patient}
            onEdit={() => handleEdit(patient)}
            onDelete={() => handleDelete(patient._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Patients;
