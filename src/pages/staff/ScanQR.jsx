import React from "react";
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import icons from "../../constants/icons";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { QrReader } from "react-qr-reader"; // Assuming you're using a QR reader library

const ScanQR = () => {
  const handleScan = (data) => {
    if (data) {
      console.log("QR Code data:", data); // Handle the scanned data here
      // You can navigate to another page or show the scanned data
    }
  };

  const handleError = (err) => {
    console.error("QR scan error:", err); // Handle errors if needed
  };

  return (
    <div className="w-full">
      <BackNavigation label={''} />
      <div className="w-full flex items-center justify-center"> {/* Center the card on the page */}
        <Card>
          <CardHeader className="px-6 py-3">
            <Typography size="xl" className="font-poppins font-bold text-center text-2xl">
              Scan QR Code
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col items-center justify-center px-12"> {/* Adjusted to flex-col for better alignment */}
            <div className="w-full flex justify-center mb-4">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%', height: 'auto' }} // Style for the QR scanner
              />
            </div>
            <Typography color="gray" className="font-poppins font-medium text-center mt-4 text-xs">
              Point the camera at a QR code to scan
            </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-center">
            <Card>
              <div className="flex flex-row items-center justify-center px-10 py-6">
                <img src={icons.profilepic} alt="profile" className="w-6 h-6 rounded-full" />
                <Typography color="gray" className="font-poppins font-medium text-center mt-4 text-xs my-auto ml-4 lg:text-lg text-sm">
                  Kusal Perera
                </Typography>
              </div>
            </Card>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ScanQR;
