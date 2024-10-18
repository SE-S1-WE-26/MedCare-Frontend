import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import { HiOutlineTrash, HiOutlineInformationCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchPatientDetails } from "../../../utils/patientUtils";

const PatientCard = ({ patient, onEdit, onDelete }) => {
    const { userId } = patient;
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [patientDetails, setPatientDetails] = useState(null);
    const Host_Ip = process.env.Host_Ip || 'http://localhost:8010';

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const userResponse = await axios.get(`${Host_Ip}/user/${userId}`);
                setUserDetails(userResponse.data);

                const { demographicData } = await fetchPatientDetails(userId);
                setPatientDetails(demographicData);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        if (userId) {
            fetchDetails();
        }
    }, [userId, Host_Ip]);

    const handleSeeMore = () => {
        navigate('/patients/profile', { state: { patient: userDetails } });
    };

    if (!userDetails || !patientDetails) {
        return null; // Render nothing or a placeholder if data is not available
    }

    const { firstName, lastName, birthday, gender, mobileNumber } = patientDetails;
    const { image } = userDetails;

    return (
        <Card className='mb-4 px-4 py-6 rounded-3xl flex sm:flex-row justify-between items-center'>
            <div className='flex items-center'>
                <img src={image} alt={`${firstName} ${lastName}`} className='w-24 h-24 rounded-full mr-4' />
                <div>
                    <Typography className='text-lg font-poppins font-bold'>{`${firstName || ""} ${lastName || ""}`}</Typography>
                    <Typography className='text-sm text-gray-500'>{new Date(birthday).toLocaleDateString() || "N/A"}</Typography>
                    <Typography className='text-sm text-gray-500'>{gender === "M" ? "Male" : "Female"}</Typography>
                    <Typography className='text-sm text-gray-500'>{mobileNumber || "N/A"}</Typography>
                </div>
            </div>
            <div className='flex gap-2 mt-4 md:mt-0 md:mr-6'>
                <Button onClick={onEdit} color="orange" className="flex items-center">
                    <HiOutlinePencilAlt className="mr-1" size={20}/> 
                </Button>
                <Button onClick={onDelete} color="red" className="flex items-center">
                    <HiOutlineTrash className="mr-1" size={20}/> 
                </Button>
                <Button onClick={handleSeeMore} color="blue" className="flex items-center">
                    <HiOutlineInformationCircle className="mr-1" size={20}/> 
                </Button>
            </div>
        </Card>
    );
};

export default PatientCard;
