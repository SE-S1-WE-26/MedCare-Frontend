import React, {useEffect, useState} from 'react';
import { Card, Typography } from '@material-tailwind/react';
import icons from '../../../constants/images';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServiceCard = ({serviceId}) => {
    const [service, setService] = useState();

    const fetchService = async() => {
        try {
            const response = await fetch(`http://localhost:8010/services/${serviceId}`);
            if (response.ok) {
                const data = await response.json();
                setService(data); // Set the fetched data to state
            } else {
                console.error("Failed to fetch service");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    useEffect(() => {
        fetchService();
    }, []);

    const serviceTypeMap = {
        Xray: 'X-ray',
        Labtest: 'Lab Test',
        Vaccine: 'Vaccine',
        Scan: 'Scan'
    };

  return (
    <Card className='mb-4 px-4 py-6 rounded-3xl'>
          <div className='flex items-center px-2'>
            {/* <img src={icons[service?.servicesType]} alt='Doctor' className='w-24 h-24 mr-4' /> */}
            <div className='w-full'>
              <div className='flex flex-row items-center justify-between mb-2'>
                <Typography className='text-lg font-poppins font-bold md:truncate'>{serviceTypeMap[service?.servicesType] || service?.servicesType}</Typography>
              </div>
              <hr />
              <Typography className='text-sm text-gray-500 my-2 font-poppins text-xs font-medium'>{service?.description}</Typography>
              <div className='flex flex-row gap-2'>
                <Typography color="gray" className='text-sm font-medium font-poppins'>Amount: LKR {service?.amount}.00</Typography>
              </div>
            </div>
          </div>
        </Card>
  )
}

export default ServiceCard;
