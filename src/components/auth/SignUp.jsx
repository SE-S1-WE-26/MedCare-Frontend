import { React, useState } from "react";
import BackNavigation from "../pagecomponents/BackNavigation";
import { Card } from "@material-tailwind/react";
import DoctorSignUp from "./DoctorSignUp";
import PatientSignUp from "./PatientSignUp";

const SignUp = () => {
  const [activeSection, setActiveSection] = useState("patient");

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <BackNavigation label="Register Patient" />
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-lg p-4">
          <div className='flex w-full justify-center items-center mb-4 sm:flex-row'>
            <button
              onClick={() => setActiveSection('patient')}
              className={`flex-1 p-2 font-poppins text-sm ${activeSection === 'patient' ? 'bg-dark-blue text-white' : 'bg-white text-black'} rounded-xl`}
            >
              Register New Patient
            </button>
          </div>
          <div>
            <PatientSignUp /> 
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
