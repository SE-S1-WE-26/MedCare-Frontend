// frontend/src/pages/staff/Patients.jsx

import React, { useState } from 'react';
import PageTitle from '../../components/pagecomponents/PageTitle'
import PatientCard from '../../components/pagecomponents/staff/PatientCard'
import SearchBar from '../../components/pagecomponents/SearchBar'
import icons from '../../constants/icons';

const Patients = () => {
  const handleSearchChange = (event) => {
    console.log(event.target.value);
  };

  const handleEdit = (patient) => {
    // Implement edit functionality
    console.log("Edit patient:", patient);
};

const handleDelete = (patientIndex) => {
    // Implement delete functionality
    const updatedPatients = patients.filter((_, index) => index !== patientIndex);
    setPatients(updatedPatients);
};

  // Sample data for patients
  const [patients, setPatients] = useState([
    {
        firstName: "Alice",
        lastName: "Johnson",
        profilePic: icons.profilepic,
        birthday: "1990-01-01",
        gender: "Female",
        mobile: "123-456-7890",
    },
    {
        firstName: "Bob",
        lastName: "Smith",
        profilePic: icons.profilepic,
        birthday: "1985-05-12",
        gender: "Male",
        mobile: "987-654-3210",
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      profilePic: icons.profilepic,
      birthday: "1992-08-25",
      gender: "Male",
      mobile: "555-123-4567",
  },
  {
      firstName: "Diana",
      lastName: "Prince",
      profilePic: icons.profilepic,
      birthday: "1988-11-15",
      gender: "Female",
      mobile: "444-765-4321",
  },
]);

  return (
    <div className='w-full'>
      <PageTitle label="Patients" />
      <SearchBar 
        placeholder="Search for a Patient..." 
        onChange={handleSearchChange}
      />
      <div className='mt-6 overflow-y-scroll max-h-[70vh]'> {/* Set max height for scrolling */}
      {patients.map((patient, index) => (
                <PatientCard
                    key={index}
                    patient={patient}
                    onEdit={() => handleEdit(patient)}
                    onDelete={() => handleDelete(index)}
                />
            ))}
      </div>
    </div>
  )
}

export default Patients