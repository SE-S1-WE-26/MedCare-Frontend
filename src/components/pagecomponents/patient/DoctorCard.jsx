import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import icons from '../../../constants/images';
import { HiOutlineHeart } from "react-icons/hi";
import { HiStar } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
    const { name, specialty, hospital, rating, reviews , image} = doctor; // Destructure the doctor object
    const navigate = useNavigate();

    const handleDoctorClick = () => {
        navigate('/patient/appointments/appointment-form', { state: { doctor } });
    }

    return (
        <Card className='mb-4 px-4 py-6 rounded-3xl' onClick={handleDoctorClick}>
          <div className='flex items-center px-2'>
            <img src={image} alt='Doctor' className='w-24 h-24 mr-4' />
            <div className='w-full'>
              <div className='flex flex-row items-center justify-between mb-2'>
                <Typography className='text-lg font-poppins font-bold md:truncate'>{name}</Typography>
                <HiOutlineHeart className='w-6 h-6' />
              </div>
              <hr />
              <Typography className='text-sm text-gray-500 my-2 font-poppins text-xs font-medium'>{specialty} | {hospital}</Typography>
              <div className='flex flex-row gap-2'>
                <HiStar className='w-4 h-4' />
                <Typography color="gray" className='text-xs font-poppins'>{rating}</Typography>
                <Typography color="gray" className='text-xs font-poppins'>({reviews} reviews)</Typography>
              </div>
            </div>
          </div>
        </Card>
    );
};

export default DoctorCard;
