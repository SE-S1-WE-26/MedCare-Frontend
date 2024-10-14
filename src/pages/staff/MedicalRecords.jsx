// frontend/src/pages/staff/MedicalRecords.jsx

import React from 'react'
import BackNavigation from '../../components/pagecomponents/BackNavigation'
import { StaffMedicalRecordsTable } from '../../components/pagecomponents/staff/MedicalRecordsTable'

const MedicalRecords = () => {
  return (
    <div className='w-full'>
      <BackNavigation label="Medical Records" btn={true} btnTitle={"Add a Record"} btnStyle={'bg-green'} link={'/staff/medical-records/create'}/>
      <StaffMedicalRecordsTable />
    </div>
  )
}

export default MedicalRecords