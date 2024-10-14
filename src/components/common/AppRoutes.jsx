import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../landingpage/LandingPage';

import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';

import PatientDashboard from '../../pages/patient/Dashboard';
import StaffDashboard from '../../pages/staff/Dashboard';

import MyQR from '../../pages/patient/MyQR';
import PatientAppointments from '../../pages/patient/Appointments';
import PatientServices from '../../pages/patient/Services';
import MedicalRecords from '../../pages/patient/MedicalRecords';
import LabReports from '../../pages/patient/LabReports';
import MedicalProfile from '../../pages/patient/MedicalProfile';
import DemographicForm from '../../pages/patient/DemographicForm';
import BiographicForm from '../../pages/patient/BiographicForm';
import CreateAppointment from '../../pages/patient/CreateAppointment';
import AppointmentForm from '../../pages/patient/AppointmentForm';
import PaymentForm from '../../pages/patient/PaymentForm';

import ScanQR from '../../pages/staff/ScanQR';
import StaffForm from '../pagecomponents/staff/StaffForm';
import StaffPatients from '../../pages/staff/Patients';
import StaffStaff from '../../pages/staff/Staff';
<<<<<<< Updated upstream
=======
import StaffMedicalRecords from '../../pages/staff/MedicalRecords';
import StaffAppointments from '../../pages/staff/Appointments';
import StaffCheckups from '../../pages/staff/Checkups';
import CreateMedicalRecord from '../../pages/staff/CreateMedicalRecord';
import CreateStaff from '../../pages/staff/CreateStaff';
>>>>>>> Stashed changes

const AppRoutes = ({ setUserRole }) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn setUserRole={setUserRole} />} /> {/* Pass setUserRole prop */}
      <Route path="/signup" element={<SignUp />} />

      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/staff" element={<StaffDashboard />} />

      <Route path="/patient/my-qr/:patientId" element={<MyQR />} />
      <Route path="/patient/appointments" element={<PatientAppointments />} />
      <Route path="/patient/services" element={<PatientServices />} />
      <Route path="/patient/medical-records" element={<MedicalRecords />} />
      <Route path="/patient/lab-reports" element={<LabReports />} />
      <Route path="/patient/medical-profile" element={<MedicalProfile />} />

      <Route path="/staff/scan-qr" element={<ScanQR />} />
      <Route path="/staff/patients" element={<StaffPatients />} />
      <Route path="/staff/staff" element={<StaffStaff />} />
<<<<<<< Updated upstream
=======
      <Route path="/staff/medical-records" element={<StaffMedicalRecords />} />
      <Route path="/staff/appointments" element={<StaffAppointments />} />
      <Route path="/staff/checkups" element={<StaffCheckups />} />
      <Route path="/staff/medical-records/create" element={<CreateMedicalRecord />} />
      <Route path="/staff/staff-form" element={<CreateStaff />} />
>>>>>>> Stashed changes
    </Routes>
  );
};

export default AppRoutes;
