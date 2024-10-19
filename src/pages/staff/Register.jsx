import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { HiUser, HiBookOpen, HiHeart, HiOutlineQrcode, HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import PatientRegForm from "../../components/pagecomponents/staff/PatientRegForm";
import PatientDemoForm from "../../components/pagecomponents/staff/PatientDemoForm";
import PatientBioForm from "../../components/pagecomponents/staff/PatientBioForm";
import GenerateQR from "../../components/pagecomponents/staff/GenerateQR";

const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => setActiveStep((cur) => Math.min(cur + 1, 3)); // Update max step
    const handlePrev = () => setActiveStep((cur) => Math.max(cur - 1, 0));

    const handleSubmit = async () => {
        navigate('/staff');
    };

    const renderContent = () => {
        switch (activeStep) {
            case 0:
                return <PatientRegForm />;
            case 1:
                return <PatientDemoForm />;
            case 2:
                return <PatientBioForm />;
            case 3: // New case for QR code generation
                return <GenerateQR />;
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full px-24 py-4 z-20">
            <Stepper activeStep={activeStep} lineClassName="bg-white" className="bg-blue-200 rounded-full p-1" activeLineClassName='bg-dark-blue'>
                <Step onClick={() => setActiveStep(0)}>
                    <HiUser className="h-5 w-5" />
                </Step>
                <Step onClick={() => setActiveStep(1)}>
                    <HiBookOpen className="h-5 w-5" />
                </Step>
                <Step onClick={() => setActiveStep(2)}>
                    <HiHeart className="h-5 w-5" />
                </Step>
                <Step onClick={() => setActiveStep(3)}>
                    <HiOutlineQrcode className="h-5 w-5" /> {/* You can use another icon here */}
                </Step>
            </Stepper>

            <div className="flex flex-col items-center mt-8 w-full">
                {renderContent()}

                {/* Position buttons absolutely in the center left and right */}
                <div className=" fixed flex justify-between w-full px-24 bottom-12">
                    <Button 
                        onClick={handlePrev} 
                        disabled={activeStep === 0} 
                        className="flex items-center justify-center mr-auto" 
                    >
                        <HiArrowLeft className="h-5 w-5" />
                    </Button>
                    <Button 
                        onClick={activeStep === 3 ? handleSubmit : handleNext} 
                        className="flex items-center justify-center ml-auto" 
                    >
                        {activeStep === 3 ? "Done" : <HiArrowRight className="h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Register;
