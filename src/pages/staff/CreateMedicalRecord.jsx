import React from 'react'
import BackNavigation from '../../components/pagecomponents/BackNavigation';
import MedicalRecordForm from '../../components/pagecomponents/staff/MedicalRecordForm';

const CreateMedicalRecord = () => {
  return (
    <div className='w-full'>
      <BackNavigation label="Create a Medical Record" />
      <MedicalRecordForm />
    </div>
  )
}

export default CreateMedicalRecord