import { React, useState } from "react";
import BackNavigation from "../pagecomponents/BackNavigation";
import { Card } from "@material-tailwind/react";
import DoctorSignUp from "./DoctorSignUp";
import PatientSignUp from "./PatientSignUp";

const SignUp = () => {
  const [activeSection, setActiveSection] = useState("patient");

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <BackNavigation label="Register" />
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-lg p-4">
          <div className='flex w-full justify-center items-center mb-4 sm:flex-row'>
            <button
              onClick={() => setActiveSection('patient')}
              className={`flex-1 p-2 font-poppins text-sm ${activeSection === 'patient' ? 'bg-dark-blue text-white' : 'bg-white text-black'} rounded-l-xl`}
            >
              Register as Patient
            </button>
            <button
              onClick={() => setActiveSection('doctor')}
              className={`flex-1 p-2 font-poppins text-sm ${activeSection === 'doctor' ? 'bg-dark-blue text-white' : 'bg-white text-black'} rounded-r-xl`}
            >
              Register as Staff
            </button>
          </div>
          <div>
            {activeSection === "patient" ? <PatientSignUp /> : <DoctorSignUp />}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
