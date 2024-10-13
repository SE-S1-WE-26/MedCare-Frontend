// src/routes/AppRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import pages
import LandingPage from '../landingpage/LandingPage';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRoutes;
