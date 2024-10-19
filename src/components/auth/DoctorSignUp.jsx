import React, { useState } from 'react';
import axios from 'axios';
import { Card, Typography, Input, Button } from '@material-tailwind/react';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const DoctorSignUp = () => {

    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        name: '',
        specialty: '',
        hospital: '',
        rating: '',
        reviews: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setProfilePicPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let profilePicURL = '';

            if (profilePic) {
                const storageRef = ref(storage, `doctors/${profilePic.name + formData.username}`);
                await uploadBytes(storageRef, profilePic);
                profilePicURL = await getDownloadURL(storageRef);
            }
            await axios.post('https://medcare-backend.vercel.app/auth/register', {
                ...formData,
                role: 'staff',
                image: profilePicURL,
            });

            alert('Doctor registered successfully');
        } catch (error) {
            console.error('Error registering doctor', error);
        }
    };

    return (
        <Card className='p-4 mt-4'>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <Typography color="blue-gray" className="mb-2">Name</Typography>
                    <Input
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                </div>

                <div className='flex flex-row gap-2'>
                <div>
                    <Typography color="blue-gray" className="mb-2">Specialty</Typography>
                    <Input
                        name="specialty"
                        onChange={handleChange}
                        placeholder="Enter your specialty"
                        required
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                </div>

                <div>
                    <Typography color="blue-gray" className="mb-2">Hospital</Typography>
                    <Input
                        name="hospital"
                        onChange={handleChange}
                        placeholder="Enter your hospital"
                        required
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                </div>
                </div>

                <div className='flex flex-row gap-2'>
                <div>
                    <Typography color="blue-gray" className="mb-2">Phone</Typography>
                    <Input
                        name="phone"
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                </div>

                <div>
                    <Typography color="blue-gray" className="mb-2">Email</Typography>
                    <Input
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                </div>
                </div>

                <div className='flex flex-row gap-2'>
                <div>
                    <Typography color="blue-gray" className="mb-2">Username</Typography>
                    <Input
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                </div>

                <div>
                    <Typography color="blue-gray" className="mb-2">Password</Typography>
                    <Input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                </div>
                </div>

                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="hidden"
                        id="doctor-profile-pic-upload"
                    />
                    <Button
                        className="bg-blue-500 text-white rounded-md mt-2"
                        onClick={() => document.getElementById("doctor-profile-pic-upload").click()}
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

                <Button type="submit" className="mt-4 bg-dark-blue rounded-xl">
                    Register
                </Button>
            </form>
        </Card>
    );
};

export default DoctorSignUp;
