import React from 'react';
import BackNavigation from '../../components/pagecomponents/BackNavigation';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

const patientDetails = {
  profileImage: "https://randomuser.me/api/portraits/med/men/75.jpg",
  name: "Kusal Perera",
  bioData: [
    { label: "Blood Group", value: "O+" },
    { label: "Weight", value: "60 kg" },
    { label: "Height", value: "170 cm" },
    { label: "Allergies", value: "Fexofenadine" },
  ],
  demographics: [
    { label: "Age", value: "23 Years" },
    { label: "Birthday", value: "01/01/2001" },
    { label: "Gender", value: "Male" },
    { label: "Mobile", value: "07123456789" },
    { label: "Emergency Contact", value: "01178964532" },
    { label: "Address", value: "Malabe, Colombo" },
  ],
};

const appointmentsHistory = [
  { date: "01/01/2023", condition: "High Blood Pressure", followUp: "01/02/2023" },
  { date: "15/03/2023", condition: "Annual Check-up", followUp: "15/09/2023" },
  { date: "10/06/2023", condition: "Cold/Flu", followUp: "20/06/2023" },
];

const checkupHistory = [
  { date: "15/01/2023", checkup: "Blood Test", status: "Completed" },
  { date: "05/02/2023", checkup: "X-Ray", status: "Completed" },
  { date: "12/03/2023", checkup: "MRI Scan", status: "Pending" },
];

const renderTableRows = (data) =>
  data.map((row, index) => (
    <tr key={index} className="border-b border-blue-gray-100">
      <td className="p-4 text-sm">{row.date}</td>
      <td className="p-4 text-sm">{row.condition || row.checkup}</td>
      <td className="p-4 text-sm">{row.followUp || row.status}</td>
    </tr>
  ));

const PatientInfo = () => {
  return (
    <div className="w-full p-4">
      <BackNavigation label="Patient Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Profile, Bio Data, Demographics */}
        <Card className="bg-white p-4 md:p-6 py-12">
          <CardHeader className="py-4 px-6">
            <div className="flex items-center space-x-4">
              <img
                src={patientDetails.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <Typography variant="h6" className="text-lg md:text-xl">{patientDetails.name}</Typography>
            </div>
          </CardHeader>
          <CardBody>
            <Card className="py-4 px-6 mt-8">
              <CardHeader className="py-4 px-6">
                <Typography variant="h6" className="text-lg md:text-xl text-center">
                  Bio Data
                </Typography>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col space-y-2">
                  {patientDetails.bioData.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <Typography className="text-sm md:text-base">{item.label}</Typography>
                      <Typography className="text-sm md:text-base">{item.value}</Typography>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card className="py-4 px-6 mt-10 ">
              <CardHeader className="py-4 px-6">
                <Typography variant="h6" className="text-lg md:text-xl text-center">
                  Demographic Information
                </Typography>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col space-y-2">
                  {patientDetails.demographics.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <Typography className="text-sm md:text-base">{item.label}</Typography>
                      <Typography className="text-sm md:text-base">{item.value}</Typography>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </CardBody>
        </Card>

        {/* Right Column: Appointment and Checkup History */}
        <div className="space-y-6">
          <Card className="bg-white p-4 md:p-6 py-12">
            <CardHeader className="py-4 px-6">
              <Typography variant="h6" className="text-lg md:text-xl">
                Appointment History
              </Typography>
            </CardHeader>
            <CardBody>
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Condition</th>
                    <th className="p-4">Follow-up Date</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows(appointmentsHistory)}</tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="bg-white p-4 md:p-6 py-12">
            <CardHeader className="py-4 px-6">
              <Typography variant="h6" className="text-lg md:text-xl">
                Checkup History
              </Typography>
            </CardHeader>
            <CardBody>
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Checkup Type</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows(checkupHistory)}</tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
