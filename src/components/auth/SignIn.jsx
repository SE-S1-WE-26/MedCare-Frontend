import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleSignIn = (role) => {
    console.log('Sign In as:', role);
    setUserRole(role); // Set user role in Layout
    navigate(`/${role}`); // Navigate to the specified role
  };

  return (
    <div>
      Sign In
      <button 
        className="button border-2 border-black mb-2"
        onClick={() => handleSignIn("patient")}
      >
        Sign In As A Patient
      </button>
      <button 
        className="button border-2 border-black"
        onClick={() => handleSignIn("staff")}
      >
        Sign In As A Staff Member
      </button>
    </div>
  );
};

export default SignIn;
