import React, { useEffect, useState } from "react";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import SearchBar from "../../components/pagecomponents/SearchBar";
import DoctorCard from "../../components/pagecomponents/patient/DoctorCard";
import axios from "axios";

const CreateAppointment = () => {
  const [doctors, setDoctor] = useState([]);

  const handleSearchChange = (event) => {
    console.log(event.target.value);
  };

  const Host_Ip = process.env.Host_Ip|| "http://localhost:8010";

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        // Fetch Demographic Data
        const doctorResponse = await axios.get(`${Host_Ip}/patient/doctors/`);

        setDoctor(doctorResponse.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDoctorDetails();
  }, []);

  // Sample data for doctors

  return (
    <div className="w-full">
      <BackNavigation label="Make an Appointment" />
      <SearchBar
        placeholder="Search for a doctor..."
        onChange={handleSearchChange}
      />
      <div className="mt-6 overflow-y-scroll max-h-[70vh]">
        {" "}
        {/* Set max height for scrolling */}
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            doctor={doctor} // Pass the entire doctor object
          />
        ))}
      </div>
    </div>
  );
};

export default CreateAppointment;
