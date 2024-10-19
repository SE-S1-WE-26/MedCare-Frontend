import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/pagecomponents/PageTitle';
import DoctorCard from '../../components/pagecomponents/staff/DoctorCard';
import SearchBar from '../../components/pagecomponents/SearchBar';
import axios from 'axios';
import { Alert } from '@material-tailwind/react';

const Staff = () => {
  const [doctors, setDoctors] = useState([]);

  const Host_Ip = process.env.Host_Ip|| "http://localhost:8010";

  const fetchDoctorDetails = async () => {
    try {
      // Fetch Demographic Data
      const doctorResponse = await axios.get(`${Host_Ip}/patient/doctors/`);

      setDoctors(doctorResponse.data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {

    fetchDoctorDetails();
  }, []);
  


  const handleSearchChange = (event) => {
    console.log(event.target.value);
  };

  const handleEdit = (doctor) => {
    // Implement edit functionality
    console.log("Edit doctor:", doctor);
  };

  const handleDelete = (Id) => {
    console.log(Id);
    axios
      .delete(`${Host_Ip}/patient/doctors/${Id}`)
      .then(() => {
        alert("Doctor deleted successfully!");
        fetchDoctorDetails();
        //Navigate("/patient/appointments");
        // Clear the search query after deletion
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="w-full">
      <PageTitle label="Staff" btn={true} btnTitle={'Add Staff'} btnStyle={'bg-green'} link={'/staff/staff-form'}/>
      <SearchBar 
        placeholder="Search for a doctor..." 
        onChange={handleSearchChange}
      />
      <div className='mt-6 overflow-y-scroll lg:grid lg:grid-cols-2 gap-4 max-h-[70vh]'> {/* Set max height for scrolling */}
        {doctors.map((doctor, index) => (
          <DoctorCard 
            key={index} 
            doctor={doctor} 
            onEdit={() => handleEdit(doctor)} 
            onDelete={() => handleDelete(doctor._id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Staff;
