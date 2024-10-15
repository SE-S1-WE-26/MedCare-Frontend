// frontend/src/components/pagecomponents/staff/DoctorCard.jsx

import React from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import icons from '../../../constants/images';
import { HiStar } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { HiOutlineTrash, HiOutlineInformationCircle, HiOutlinePencilAlt } from "react-icons/hi";

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
    const { name, specialty, hospital, rating, reviews } = doctor; // Destructure the doctor object
    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate('/doctor/profile', { state: { doctor } });
    };
    // Testing Comment for DoctorCard

    return (
        <Card className='mb-4 px-4 py-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center'>
            <div className='flex items-center'>
                <img src={icons.doctor} alt='Doctor' className='w-24 h-24 mr-4' />
                <div>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <Typography className='text-lg font-poppins font-bold md:truncate'>{name}</Typography>
                    </div>
                    <hr className='mr-5' />
                    <Typography className='text-sm text-gray-500 my-2 font-poppins text-xs font-medium'>{specialty} | {hospital}</Typography>
                    <div className='flex flex-row gap-2'>
                        <HiStar className='w-4 h-4' />
                        <Typography color="gray" className='text-xs font-poppins'>{rating}</Typography>
                        <Typography color="gray" className='text-xs font-poppins'>({reviews} reviews)</Typography>
                    </div>
                </div>
            </div>
            <div className='flex gap-2 mt-4 sm:mt-0 sm:mr-6'>
                <Button onClick={onEdit} color="orange" className="flex items-center">
                    <HiOutlinePencilAlt className="mr-1" size={20} /> {/* Icon for Edit */}
                </Button>
                <Button onClick={onDelete} color="red" className="flex items-center">
                    <HiOutlineTrash className="mr-1" size={20} /> {/* Icon for Delete */}
                </Button>
                <Button onClick={handleSeeMore} color="blue" className="flex items-center">
                    <HiOutlineInformationCircle className="mr-1" size={20} /> {/* Icon for See More */}
                </Button>
            </div>
        </Card>
    );
};

export default DoctorCard;
