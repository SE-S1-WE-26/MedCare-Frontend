import React, { useState, useEffect } from 'react';
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { Card, Typography, Input, Button } from '@material-tailwind/react';
import icons from '../../constants/icons';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('government');
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('Visa');

  const toggleSection = (section) => {
    setActiveSection(section);
    if (section === 'private') {
      setSelectedPaymentOption('Visa');
    } else {
      setSelectedPaymentOption(null);
    }
    setInsuranceSelected(false);
  };

  const toggleInsurance = () => {
    setInsuranceSelected(!insuranceSelected);
  };

  const paymentTypes = [
    { title: 'Google Pay', icon: icons.gpay },
    { title: 'Apple Pay', icon: icons.applepay },
    { title: 'Visa', icon: icons.visa },
    { title: 'Mastercard', icon: icons.master },
    { title: 'Insurance', icon: icons.insurance },
  ];

  const handlePaymentOptionClick = (title) => {
    if (title === 'Insurance') {
      toggleInsurance();
      setSelectedPaymentOption(insuranceSelected ? null : title);
    } else {
      setSelectedPaymentOption(title);
      setInsuranceSelected(false);
    }
  };

  const renderPaymentOptions = () => {
    return paymentTypes.map((paymentType, index) => (
      <button 
        key={index} 
        className={`w-full sm:w-24 h-12 sm:mr-2 lg:h-14 lg:w-16 p-2 flex items-center justify-center border rounded-lg mb-2
                    ${selectedPaymentOption === paymentType.title ? 'border-black font-bold' : 'border-gray-300'}`}
        onClick={() => handlePaymentOptionClick(paymentType.title)}
      >
        <img
          src={paymentType.icon}
          alt={paymentType.title}
          className="w-full h-full object-contain"
        />
      </button>
    ));
  };
  

  useEffect(() => {
    if (activeSection === 'private') {
      setSelectedPaymentOption('Visa');
    }
  }, [activeSection]);

  const handleContinue = () => {
    navigate('/patient/appointments');
  };

  return (
    <div className='w-full px-4 sm:px-6 md:px-8'>
      <BackNavigation label="Proceed Payment" />
      
      {/* Toggle Buttons */}
      <div className='flex w-full justify-center items-center mb-4 sm:flex-row'>
        <button
          onClick={() => toggleSection('government')}
          className={`flex-1 p-2 font-poppins text-sm ${activeSection === 'government' ? 'bg-dark-blue text-white' : 'bg-white text-black'} rounded-l-xl`}
        >
          Government
        </button>
        <button
          onClick={() => toggleSection('private')}
          className={`flex-1 p-2 font-poppins text-sm ${activeSection === 'private' ? 'bg-dark-blue text-white' : 'bg-white text-black'} rounded-r-xl`}
        >
          Private
        </button>
      </div>

      {/* Conditional Rendering of Government Section */}
      {activeSection === 'government' && (
        <div>
          <Card className='py-6 px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-12'>
            <Card className='py-4 px-4 flex flex-col items-center h-full'>
              <div className='flex flex-col lg:flex-row items-center my-auto'>
                <Typography color="dark-blue" className="font-poppins text-xs font-semibold">
                  Total Amount to be Paid:
                </Typography>
                <Typography color="dark-blue" className="font-poppins text-lg md:text-3xl ml-3 font-bold line-through">
                  LKR 15,000.00
                </Typography>
              </div>
            </Card>

            <Card className='py-4 px-4 flex flex-col items-center h-full'>
              <Typography color="dark-blue" className="font-poppins text-lg md:text-2xl font-bold text-center">
                Government Payment
              </Typography>
              <Typography color="green" className="font-poppins text-base md:text-xl font-semibold mt-2">
                Payment is Free!
              </Typography>
              <Typography color="blue-gray" className="font-poppins text-sm md:text-base mt-2 text-center">
                As part of the government scheme, no charges are applied for this service. 
                You can proceed without any payment.
              </Typography>
              <Button className="mt-6 bg-dark-blue rounded-full" fullWidth onClick={handleContinue}>
                Complete Payment
              </Button>
            </Card>
          </Card>
        </div>
      )}

      {/* Conditional Rendering of Private Section */}
      {activeSection === 'private' && (
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Card className='py-4 px-4 flex flex-col lg:flex-row items-center justify-center'>
              <Typography color="dark-blue" className="font-poppins text-xs font-semibold">
                Total Amount to be Paid:
              </Typography>
              <Typography color="dark-blue" className="font-poppins text-lg md:text-3xl ml-3 font-bold">
                LKR 15,000.00
              </Typography>
            </Card>
            <Card className='flex flex-col py-4 px-4 lg:flex-row items-center justify-between'>
              <Typography color="dark-blue" className="font-poppins text-xs font-semibold">
                Payment Options:
              </Typography>
              <div className="flex flex-wrap lg:mt-0 mt-4">
                {renderPaymentOptions()}
              </div>
            </Card>
          </div>

          {/* Insurance Details Form */}
          {insuranceSelected && (
            <Card className='p-4 mt-4'>
              <Typography className="font-poppins text-lg font-bold mb-4">Insurance Details</Typography>
              <form>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        Insurance Policy Number
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="Enter insurance policy number"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        Name on the Insurance
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="Enter name on insurance"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        Insurance Provider
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="Enter insurance provider name"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        Expiration Date
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="MM/YY"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Payment Details Form */}
          {selectedPaymentOption && (
            <Card className='p-4 mt-4'>
              <form>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        Card Number
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="Enter card number"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        Name on the Card
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="Enter cardholder name"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        Expiration Date
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="MM/YY"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        CVV
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="Enter CVV"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-200"
                      />
                    </div>
                  </div>

                  <Button className="mt-2 bg-dark-blue rounded-full" fullWidth onClick={handleContinue}>
                    Complete Payment
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
