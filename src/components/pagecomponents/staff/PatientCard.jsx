// frontend/src/components/pagecomponents/staff/PatientCard.jsx

import React from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import { HiOutlineTrash, HiOutlineInformationCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const PatientCard = ({ patient, onEdit, onDelete }) => {
    const { firstName, lastName, profilePic, birthday, gender, mobile } = patient;
    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate('/patients/profile', { state: { patient } });
    };

    return (
        <Card className='mb-4 px-4 py-6 rounded-3xl flex sm:flex-row justify-between items-center'>
            <div className='flex items-center'>
                <img src={profilePic} alt={`${firstName} ${lastName}`} className='w-24 h-24 rounded-full mr-4' />
                <div>
                    <Typography className='text-lg font-poppins font-bold'>{`${firstName} ${lastName}`}</Typography>
                    <Typography className='text-sm text-gray-500'>{`Birthday: ${birthday}`}</Typography>
                    <Typography className='text-sm text-gray-500'>{`Gender: ${gender}`}</Typography>
                    <Typography className='text-sm text-gray-500'>{`Mobile: ${mobile}`}</Typography>
                </div>
            </div>
            <div className='flex gap-2 mt-4 md:mt-0 md:mr-6'>
                <Button onClick={onEdit} color="orange" className="flex items-center">
                    <HiOutlinePencilAlt className="mr-1" size={20}/> {/* Icon for Edit */}
                </Button>
                <Button onClick={onDelete} color="red" className="flex items-center">
                    <HiOutlineTrash className="mr-1" size={20}/> {/* Icon for Delete */}
                </Button>
                <Button onClick={handleSeeMore} color="blue" className="flex items-center">
                    <HiOutlineInformationCircle className="mr-1" size={20}/> {/* Icon for See More */}
                </Button>
            </div>
        </Card>
    );
};

export default PatientCard;
