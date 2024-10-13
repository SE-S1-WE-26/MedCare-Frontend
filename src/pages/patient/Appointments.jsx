import React from 'react'
import PageTitle from '../../components/pagecomponents/PageTitle';
import AppointmentsTable from '../../components/pagecomponents/patient/AppointmentsTable';

const Appointments = () => {
  return (
    <div className='w-full'>
      <PageTitle label="Appointments" />
      <AppointmentsTable />
    </div>
  )
}

export default Appointments