import React from 'react'
import BackNavigation from '../../components/pagecomponents/BackNavigation';
import {MedicalRecordsTable} from '../../components/pagecomponents/patient/MedicalRecordsTable';

const MedicalRecords = () => {

  return (
    <div className='w-full'>
      <BackNavigation label="Medical Records" />
      <MedicalRecordsTable />
    </div>
  )
}

export default MedicalRecords