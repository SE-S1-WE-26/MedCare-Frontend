import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import { HiOutlineTrash, HiOutlineInformationCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientCard = ({ patient, onEdit, onDelete }) => {
    const { userId,name,age,address } = patient;
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const Host_Ip = process.env.Host_Ip || 'http://localhost:8010';

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const userResponse = await axios.get(`${Host_Ip}/user/${userId}`);
                setUserDetails(userResponse.data);
                console.log('User details:', userResponse.data);
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

    if (!userDetails) {
        return null; 
    }

    const { image } = userDetails;

    return (
        <Card className='px-4 py-6 rounded-3xl flex sm:flex-row justify-between items-center mt-4 sm:mt-0'>
            <div className='flex items-center'>
                <img src={image} alt={`${name}`} className='w-16 h-16 rounded-full mr-4' />
                <div>
                    <Typography className='text-md font-poppins font-bold'>{`${name || ""}`}</Typography>
                    <Typography className='text-sm text-gray-500'>{age || "N/A"}</Typography>
                    <Typography className='text-sm text-gray-500'>{address || "N/A"}</Typography>
                </div>
            </div>
            <div className='flex lg:flex-col gap-2 mt-4 md:mt-0 md:mr-6'>
                <Button onClick={onEdit} color="orange" className="flex items-center rounded-full">
                    <HiOutlinePencilAlt size={16}/> 
                </Button>
                <Button onClick={onDelete} color="red" className="flex items-center rounded-full">
                    <HiOutlineTrash size={16}/> 
                </Button>
            </div>
        </Card>
    );
};

export default PatientCard;
