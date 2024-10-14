import React from 'react'
import PageTitle from '../../components/pagecomponents/PageTitle';
import AppointmentsTable from '../../components/pagecomponents/patient/AppointmentsTable';

const Appointments = () => {
  return (
    <div className='w-full'>
      <PageTitle label="Booked Appointments" btn={true} btnTitle={'Make An Appointment'} link={'/patient/appointments/create-appointment'} btnStyle={'bg-green'}/>
      <AppointmentsTable />
    </div>
  )
}

export default Appointments