import React from 'react'
import BackNavigation from '../../components/pagecomponents/BackNavigation';
import LabReportsTable from '../../components/pagecomponents/patient/LabReportsTable';

const LabReports = () => {
  return (
    <div className='w-full'>
      <BackNavigation label="Lab Reports" />
      <LabReportsTable />
    </div>
  )
}

export default LabReports