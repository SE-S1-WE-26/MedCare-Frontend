import React from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // Assuming you're using a QR code library
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import icons from "../../constants/icons";
import BackNavigation from "../../components/pagecomponents/BackNavigation";

const MyQR = () => {
  const { patientId } = useParams(); // Extract patientId from route params

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

export default MyQR;
