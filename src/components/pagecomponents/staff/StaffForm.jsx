import React, { useState } from "react";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const StaffForm = () => {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new staff member object
    const newStaffMember = {
      name,
      specialty,
      hospital,
      rating,
      reviews,
      profilePic,
    };

    // Log the new staff member to the console (or handle it as needed)
    console.log(newStaffMember);
    
    // Optionally navigate away or reset the form
    navigate("/staff/staff"); // Change to the desired path
  };

  return (
    <Card className="p-8 rounded-3xl max-w-md mx-auto"> {/* Set max width and center */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">Name</Typography>
          <Input
            size="xs"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>

        {/* Specialty Field */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">Specialty</Typography>
          <Input
            size="xs"
            placeholder="Enter specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>

        {/* Hospital Field */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">Hospital/Clinic</Typography>
          <Input
            size="xs"
            placeholder="Enter hospital/clinic name"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>

        {/* Rating Field */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">Rating</Typography>
          <Input
            size="xs"
            type="number"
            placeholder="Enter rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            min="1"
            max="5"
          />
        </div>

        {/* Reviews Field */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">Reviews</Typography>
          <Input
            size="xs"
            type="number"
            placeholder="Enter number of reviews"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
            id="profile-pic-upload"
          />
          <label htmlFor="profile-pic-upload">
            <Button
              className="bg-blue-500 text-white rounded-md mt-2"
              component="span"
              fullWidth
            >
              Upload Profile Picture
            </Button>
          </label>
          {profilePicPreview && (
            <img
              src={profilePicPreview}
              alt="Profile Preview"
              className="mt-4 w-24 h-24 object-cover rounded-full border-2 border-blue-500"
            />
          )}
          <Typography variant="small" color="gray" className="mt-2 text-center">
            (Click to upload)
          </Typography>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4 bg-dark-blue rounded-full">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default StaffForm;
