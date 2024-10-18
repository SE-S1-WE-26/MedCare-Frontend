import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // Assuming you're using a QR code library
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { fetchPatientDetails } from "../../utils/patientUtils";
import Loader from '../../components/pagecomponents/Loader'

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

  // Destructure only if patientDetails is not null
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
    <div className="w-full flex flex-col"> {/* Set full screen height */}
      <BackNavigation label={''} />
      
      <div className="flex-grow -mt-12 flex items-center justify-center"> {/* Center the card vertically and horizontally */}
        <Card className="w-full max-w-md"> {/* Restrict the card width */}
          <CardHeader className="px-6 py-3">
            <Typography size="xl" className="font-poppins font-bold text-center text-2xl"> {/* Centered text and adjusted size */}
              My QR Code
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col items-center justify-center px-12"> {/* Adjusted to flex-col for better alignment */}
            <QRCodeSVG value={patientId} size={180} /> {/* You can set a specific size for the QR code */}
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
