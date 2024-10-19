import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { fetchPatientDetails } from "../../utils/patientUtils";
import Loader from '../../components/pagecomponents/Loader';
import icons from '../../constants/icons';

const MyQR = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;
  const name = user?.name || "Pahan Abhayawardhane"; // Use sample name if not available
  const profileImage = user?.image || icons.profile; // Sample profile image
  const { patientId } = useParams(); // Extract patientId from route params

  const [patientDetails, setPatientDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const Host_Ip = process.env.Host_Ip || 'https://medcare-backend.vercel.app';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { demographicData } = await fetchPatientDetails(userId);
        setPatientDetails(demographicData || {});
      } catch (error) {
        console.error('Error fetching details:', error);
        setPatientDetails({});
      }
    };

    if (userId) {
      fetchDetails();
    }

    // Ensure the loader is shown for at least 3 seconds
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup timeout if the component unmounts before 3 seconds
    return () => clearTimeout(loaderTimeout);
  }, [userId, Host_Ip]);

  // Sample data if nothing is available
  const firstName = patientDetails.firstName || "Jane";
  const lastName = patientDetails.lastName || "Smith";
  const birthday = patientDetails.birthday || "1990-01-01";
  const gender = patientDetails.gender || "Female";
  const mobileNumber = patientDetails.mobileNumber || "123-456-7890";

  if (loading) {
    return (
      <div className='w-full flex justify-center items-center my-auto '>
        <Loader />;
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      <BackNavigation label={''} />
      
      <div className="flex-grow -mt-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="px-6 py-3">
            <Typography size="xl" className="font-poppins font-bold text-center text-2xl">
              My QR Code
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col items-center justify-center px-12">
            <QRCode value={patientId || "SamplePatientID12345"} size={180} />
            <Typography color="gray" className="font-poppins font-medium text-center mt-4 text-xs">
              Scan this QR code to access your profile
            </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-center">
            <Card>
              <div className="flex flex-row items-center justify-center px-10 py-6">
                <img src={profileImage} alt="profile" className="w-6 h-6 rounded-full" />
                <Typography color="gray" className="font-poppins font-medium text-center mt-4 text-xs my-auto ml-4 lg:text-lg text-sm">
                  {`${name}`}
                </Typography>
              </div>
            </Card>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MyQR;
