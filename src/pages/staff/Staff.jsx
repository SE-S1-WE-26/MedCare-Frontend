import React, { useState } from 'react';
import PageTitle from '../../components/pagecomponents/PageTitle';
import DoctorCard from '../../components/pagecomponents/staff/DoctorCard';
import SearchBar from '../../components/pagecomponents/SearchBar';

const Staff = () => {
  const [doctors, setDoctors] = useState([
    {
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      hospital: "Christ Hospital",
      rating: "4.5",
      reviews: "4,442",
    },
    {
      name: "Dr. Jane Smith",
      specialty: "Dermatologist",
      hospital: "Health First Clinic",
      rating: "4.7",
      reviews: "3,221",
    },
    {
      name: "Dr. Emily Johnson",
      specialty: "Pediatrician",
      hospital: "Kids Health Center",
      rating: "4.8",
      reviews: "2,712",
    },
    {
      name: "Dr. Michael Brown",
      specialty: "Orthopedic Surgeon",
      hospital: "Bone & Joint Institute",
      rating: "4.6",
      reviews: "1,542",
    },
    // Add more doctors as needed
  ]);

  const handleSearchChange = (event) => {
    console.log(event.target.value);
  };

  const handleEdit = (doctor) => {
    // Implement edit functionality
    console.log("Edit doctor:", doctor);
  };

  const handleDelete = (doctorIndex) => {
    // Implement delete functionality
    const updatedDoctors = doctors.filter((_, index) => index !== doctorIndex);
    setDoctors(updatedDoctors);
  };

  return (
    <div className="w-full">
      <PageTitle label="Staff" btn={true} btnTitle={'Add Staff'} btnStyle={'bg-green'}/>
      <SearchBar 
        placeholder="Search for a doctor..." 
        onChange={handleSearchChange}
      />
      <div className='mt-6 overflow-y-scroll max-h-[70vh]'> {/* Set max height for scrolling */}
        {doctors.map((doctor, index) => (
          <DoctorCard 
            key={index} 
            doctor={doctor} 
            onEdit={() => handleEdit(doctor)} 
            onDelete={() => handleDelete(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Staff;
