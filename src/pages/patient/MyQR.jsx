import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { QRCode } from "react-qr-code";
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { fetchPatientDetails } from "../../utils/patientUtils";
import Loader from '../../components/pagecomponents/Loader';

const MyQR = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;
  const profileImage = user?.image;
  const { patientId } = useParams(); // Extract patientId from route params

  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const Host_Ip = process.env.Host_Ip || 'http://localhost:8010';

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const { demographicData } = await fetchPatientDetails(userId);
        setPatientDetails(demographicData);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDetails();
    }
  }, [userId, Host_Ip]);

  const firstName = patientDetails?.firstName || "";
  const lastName = patientDetails?.lastName || "";
  const birthday = patientDetails?.birthday || "";
  const gender = patientDetails?.gender || "";
  const mobileNumber = patientDetails?.mobileNumber || "";

  if (loading) {
    return <div className='flex w-full my-auto justify-center'><Loader/></div>; // Show a loading state
  }

  if (!patientDetails) {
    return <div>No patient details found.</div>; // Handle the case when no details are found
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
            <QRCode value={patientId} size={180} />
            <Typography color="gray" className="font-poppins font-medium text-center mt-4 text-xs">
              Scan this QR code to access your profile
            </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-center">
            <Card>
              <div className="flex flex-row items-center justify-center px-10 py-6">
                <img src={profileImage} alt="profile" className="w-6 h-6 rounded-full" />
                <Typography color="gray" className="font-poppins font-medium text-center mt-4 text-xs my-auto ml-4 lg:text-lg text-sm">
                  {`${firstName} ${lastName}`}
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
