import React from "react";
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import StaffForm from "../../components/pagecomponents/staff/StaffForm";

const CreateStaff = () => {
  return (
    <div className="w-full">
      <BackNavigation label="Add Staff" />
        <StaffForm />
    </div>
  );
};

export default CreateStaff;
