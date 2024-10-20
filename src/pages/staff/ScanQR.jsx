import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Spinner,
  Button,
} from "@material-tailwind/react";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ScanQR = () => {
  const [loading, setLoading] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [showPatientSelect, setShowPatientSelect] = useState(false);
  const [qrSupport, setQrSupport] = useState(true);

  const Host_Ip = process.env.Host_Ip || "https://medcare-backend.vercel.app";
  const navigate = useNavigate();

  // Fetch patients when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${Host_Ip}/patients/`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();

    // Set a timeout for 3 seconds to show the patient select section
    const timer = setTimeout(() => {
      setShowPatientSelect(true);
    }, 3000);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [Host_Ip]);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      setLoading(false);
      console.log("QR Code data:", data);
    }
  };

  const handleError = (err) => {
    console.error("QR scan error:", err);
    setLoading(false);
    setQrSupport(false);
  };

  const handleNext = () => {
    const patientId = scannedData || selectedPatient;
    if (patientId) {
      console.log("Proceeding to the next step with data:", patientId);
      navigate(`/staff/patient-info/${patientId}`);
    } else {
      alert("Please scan a QR code or select a patient manually.");
    }
  };

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  return (
    <div className="w-full">
      <BackNavigation label={""} />
      <div className="w-full mt-16 flex flex-col items-center justify-center">
        <Card>
          <CardHeader className="px-6 py-3">
            <Typography
              size="xl"
              className="font-poppins font-bold text-center text-2xl"
            >
              Scan QR Code
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col items-center justify-center px-12">
            <div className="w-full flex justify-center mb-4">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%", height: "auto" }}
                videoStyle={{ height: "100%" }}
              />
            </div>

            {loading && (
              <div className="flex justify-center mt-4">
                <Spinner className="h-8 w-8" color="blue" />
              </div>
            )}

            <Typography
              color="gray"
              className="font-poppins font-medium text-center mt-4 text-xs"
            >
              Point the camera at a QR code to scan
            </Typography>

            {scannedData && (
              <Typography
                color="green"
                className="font-poppins font-medium text-center mt-4 text-sm"
              >
                Scanned Data: {scannedData}
              </Typography>
            )}

            {!qrSupport && (
              <Typography
                color="red"
                className="font-poppins font-medium text-center mt-4 text-sm"
              >
                This browser does not support QR functions.
              </Typography>
            )}
          </CardBody>
          <CardFooter className="flex items-center justify-center">
            <Card className="px-6 py-4">
              {loading && (
                <Typography
                  color="gray"
                  className="font-poppins font-medium text-center text-xs"
                >
                  Scanning in progress...
                </Typography>
              )}
            </Card>
          </CardFooter>
        </Card>

        {/* Patient Selection */}
        {showPatientSelect && (
          <Card className="mt-4 px-6 py-2 flex flex-col items-center justify-center gap-4">
            <Typography className="text-red-400 font-semibold">*This browser does not support QR functions*</Typography>
            <div className="flex flex-row gap-4">
            <Typography variant="h6" color="blue-gray">
              Select Patient
            </Typography>
            <select
              name="selectedPatient"
              id="selectedPatient"
              value={selectedPatient}
              onChange={handlePatientChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select a patient
              </option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient.userId}>
                  {patient.name}
                </option>
              ))}
            </select>
            <Button color="dark-blue" onClick={handleNext}>
              Next
            </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
