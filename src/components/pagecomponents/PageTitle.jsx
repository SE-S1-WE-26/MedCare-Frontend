import React from 'react';

const PageTitle = ({label}) => {

  return (
    <div className={`flex flex-row items-center mb-8`}>
      <p className='text-2xl font-bold md:text-3xl'>{label}</p> {/* Responsive text size */}
    </div>
  );
};

export default PageTitle;
