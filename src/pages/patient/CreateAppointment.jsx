import React from 'react';
import BackNavigation from '../../components/pagecomponents/BackNavigation';
import SearchBar from '../../components/pagecomponents/SearchBar';
import DoctorCard from '../../components/pagecomponents/patient/DoctorCard';

const CreateAppointment = () => {
  const handleSearchChange = (event) => {
    console.log(event.target.value);
  };

  // Sample data for doctors
  const doctors = [
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
  ];

  return (
    <div className='w-full'>
      <BackNavigation label="Make an Appointment" />
      <SearchBar 
        placeholder="Search for a doctor..." 
        onChange={handleSearchChange}
      />
      <div className='mt-6 overflow-y-scroll max-h-[70vh]'> {/* Set max height for scrolling */}
        {doctors.map((doctor, index) => (
          <DoctorCard 
            key={index} 
            doctor={doctor}  // Pass the entire doctor object
          />
        ))}
      </div>
    </div>
  );
}

export default CreateAppointment;
