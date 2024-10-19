import React, { useState } from "react";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  // Store selected profile picture
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file)); // local preview
    }
  };

  const Host_Ip = process.env.Host_Ip || "https://medcare-backend.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let profilePicURL = "";

      if (profilePic) {
        // Upload image to Firebase
        const storageRef = ref(storage, `doctors/${profilePic.name+name}`);
        await uploadBytes(storageRef, profilePic);

        // Get the download URL
        profilePicURL = await getDownloadURL(storageRef);
      }

      // Construct staff data with Firebase URL
      const newStaffMember = {
        name,
        specialty,
        hospital,
        rating,
        reviews,
        image: profilePicURL, // send Firebase image URL
      };

      // Submit form data to backend
      const response = await fetch(`${Host_Ip}/patient/doctors/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaffMember),
      });

      if (response.ok) {
        navigate("/staff/staff"); // Adjust as needed
      }
    } catch (error) {
      console.error("Error uploading or saving staff data:", error);
    }
  };

  return (
    <Card className="p-8 rounded-3xl max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Name
          </Typography>
          <Input
            size="xs"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Specialty
          </Typography>
          <Input
            size="xs"
            placeholder="Enter specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Hospital/Clinic
          </Typography>
          <Input
            size="xs"
            placeholder="Enter hospital/clinic name"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Rating
          </Typography>
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
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Reviews
          </Typography>
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
          <Button
            className="bg-blue-500 text-white rounded-md mt-2"
            onClick={() => document.getElementById("profile-pic-upload").click()}
          >
            Upload Profile Picture
          </Button>
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
