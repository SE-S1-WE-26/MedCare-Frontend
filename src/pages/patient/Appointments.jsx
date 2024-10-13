import React from 'react'
import BackNavigation from '../../components/pagecomponents/BackNavigation';
import AppointmentsTable from '../../components/pagecomponents/patient/AppointmentsTable';

const Appointments = () => {
  return (
    <div className='w-full'>
      <BackNavigation label="Appointments" />
      <AppointmentsTable />
    </div>
  )
}

export default Appointments