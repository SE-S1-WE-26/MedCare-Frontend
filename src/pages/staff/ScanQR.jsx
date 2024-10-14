import React, { useState } from "react";
import { Card, CardHeader, CardBody, Typography, CardFooter, Spinner, Button } from "@material-tailwind/react"; // Import Button
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { QrReader } from "react-qr-reader"; // Using QR reader library
import { useNavigate } from "react-router-dom";

const ScanQR = () => {
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const [scannedData, setScannedData] = useState(null); // State to store scanned QR data

  const handleScan = (data) => {
    if (data) {
      setScannedData(data); // Set the scanned data
      setLoading(false); // Disable loading when QR code is successfully scanned
      console.log("QR Code data:", data); // Optionally, log the scanned data
    }
  };

  const handleError = (err) => {
    console.error("QR scan error:", err); // Handle errors if needed
    setLoading(false); // Disable loading on error
  };

  const navigate = useNavigate();
  const handleNext = () => {
    // Add your logic for the next action here
    console.log("Proceeding to the next step with data:", scannedData);
    navigate("/staff/patient-info"); // Navigate to the next page

  };

  return (
    <div className="w-full">
      <BackNavigation label={''} />
      <div className="w-full mt-16 flex items-center justify-center"> {/* Center the card on the page */}
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
                videoStyle={{ height: '100%' }} // Ensure full view of the camera feed
              />
            </div>

            {/* Show loading spinner until the QR code is read */}
            {loading && (
              <div className="flex justify-center mt-4">
                <Spinner className="h-8 w-8" color="blue" />
              </div>
            )}

            <Typography color="gray" className="font-poppins font-medium text-center mt-4 text-xs">
              Point the camera at a QR code to scan
            </Typography>

            {/* Display the scanned data when available */}
            {scannedData && (
              <Typography color="green" className="font-poppins font-medium text-center mt-4 text-sm">
                Scanned Data: {scannedData}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="flex items-center justify-center">
            <Card className="px-6 py-4">
              {loading && (
                <Typography color="gray" className="font-poppins font-medium text-center text-xs">
                  Scanning in progress...
                </Typography>
              )}
              {/* Next button to proceed after scanning */}
              <Button 
                  color="dark-blue" 
                  onClick={handleNext} 
                  className="mt-4"
                >
                  Next
                </Button>
            </Card>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ScanQR;
