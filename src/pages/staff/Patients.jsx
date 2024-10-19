import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/pagecomponents/PageTitle';
import PatientCard from '../../components/pagecomponents/staff/PatientCard';
import SearchBar from '../../components/pagecomponents/SearchBar';
import axios from 'axios';
import Loader from '../../components/pagecomponents/Loader'; // Import your Loader component

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const Host_Ip = process.env.Host_Ip || 'https://medcare-backend.vercel.app';

  // Fetch patients when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(`${Host_Ip}/patients/`);
        console.log('Patients:', response.data);
        setPatients(response.data);
        setFilteredPatients(response.data); // Initialize filteredPatients with the fetched data
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
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
      <PageTitle label="Patients" btn={true} btnTitle={'Add Staff'} btnStyle={'bg-green'} link={'/register'}/>
      <SearchBar
        placeholder="Search for a Patient..."
        onChange={handleSearchChange}
      />
      <div className="mt-6 overflow-y-scroll max-h-[70vh]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader /> {/* Common loader component */}
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onEdit={() => handleEdit(patient)}
              onDelete={() => handleDelete(patient._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Patients;
