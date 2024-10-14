//  frontend/src/pages/staff/Checkups.jsx

import React from 'react'
import BackNavigation from '../../components/pagecomponents/BackNavigation'
import { StaffCheckupsTable } from '../../components/pagecomponents/staff/CheckupsTable'

const Checkups = () => {
  return (
    <div className='w-full'>
      <BackNavigation label="Checkups" />
      <StaffCheckupsTable />
    </div>
  )
}

export default Checkups