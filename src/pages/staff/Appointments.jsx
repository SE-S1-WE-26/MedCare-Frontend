import React from 'react'
import BackNavigation from '../../components/pagecomponents/BackNavigation'
import {StaffAppointmentsTable} from '../../components/pagecomponents/staff/AppointmentsTable'

const Appointments = () => {
  return (
    <div className='w-full'>
      <BackNavigation label="Appointments" />
      <StaffAppointmentsTable />
    </div>
  )
}

export default Appointments