import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../landingpage/LandingPage';

import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';

import PatientDashboard from '../../pages/patient/Dashboard';
import StaffDashboard from '../../pages/staff/Dashboard';

import PatientAppointments from '../../pages/patient/Appointments';
import PatientServices from '../../pages/patient/Services';

import StaffPatients from '../../pages/staff/Patients';
import StaffStaff from '../../pages/staff/Staff';

const AppRoutes = ({ setUserRole }) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn setUserRole={setUserRole} />} /> {/* Pass setUserRole prop */}
      <Route path="/signup" element={<SignUp />} />

      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/staff" element={<StaffDashboard />} />

      <Route path="/patient/appointments" element={<PatientAppointments />} />
      <Route path="/patient/services" element={<PatientServices />} />

      <Route path="/staff/patients" element={<StaffPatients />} />
      <Route path="/staff/staff" element={<StaffStaff />} />
    </Routes>
  );
};

export default AppRoutes;
