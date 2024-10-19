import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from "qrcode.react"; // Assuming you're using a QR code library
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import Loader from '../../pagecomponents/Loader';

const GenerateQR = () => {
  const [loading, setLoading] = useState(true);

  // Use useEffect to set loading to false after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set loading duration to 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (loading) {
    return (
      <div className='flex flex-1 justify-center items-center mt-64'>
        <Loader />
      </div>
    ); // Show a loading state
  }

  return (
    <div className="flex flex-1 justify-center items-center flex-col mt-32"> {/* Set full screen height */}
      <Card className="w-full max-w-md p-12"> {/* Restrict the card width */}
          <CardHeader className="px-6 py-3">
            <Typography size="xl" className="font-poppins font-bold text-center text-2xl"> {/* Centered text and adjusted size */}
              QR Generated
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col items-center justify-center px-12"> {/* Adjusted to flex-col for better alignment */}
            <QRCodeSVG value={'124151513513635124124'} size={180} /> {/* You can set a specific size for the QR code */}
            <Typography color="gray" className="font-poppins font-medium text-center mt-4 text-xs">
              Scan this QR code to access your profile
            </Typography>
          </CardBody>
        </Card>
    </div>
  );
};

export default GenerateQR;
