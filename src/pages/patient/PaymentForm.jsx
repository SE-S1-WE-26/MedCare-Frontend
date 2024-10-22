import React, { useState, useEffect } from 'react';
import BackNavigation from "../../components/pagecomponents/BackNavigation";
import { Card, Typography, Input, Button, Dialog, DialogBody } from '@material-tailwind/react';
import icons from '../../constants/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from "react-icons/fa";

const PaymentForm = () => { 
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  const [activeSection, setActiveSection] = useState(user.private ? 'private' : 'government');
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('Visa');
  const location = useLocation();
  const bookedServiceData = location.state?.bookedServiceData;
  const serviceId = bookedServiceData.serviceId;
  const [service, setService] = useState();
  const [successAlert, setSuccessAlert] = useState(false);

  // Form State for Payment Fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  // Form State for Insurance Fields
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceExpirationDate, setInsuranceExpirationDate] = useState('');

  const fetchService = async () => {
    try {
      const response = await fetch(`https://medcare-backend.vercel.app/services/${serviceId}`);
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

  const handleContinue = async () => {
    if (bookedServiceData) {
      try {
        // Save the booked service data in the database
        await axios.post(`https://medcare-backend.vercel.app/bookedService/add`, bookedServiceData);
        console.log('Booked service data saved:', bookedServiceData);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
          navigate('/patient/services');
        }, 2500);
      } catch (error) {
        console.error("Error saving booked service data:", error);
      }
    }
    // Navigate to services after payment completion
  };

  // Validation Functions
  const validateCardNumber = (number) => /^[0-9]{12,}$/.test(number);
  const validateCardName = (name) => /^[A-Z ]*$/.test(name); // Only uppercase letters and spaces
  const validateCvv = (cvv) => /^[0-9]{3}$/.test(cvv); // Must be 3 digits
  const validateExpirationDate = (date) => /^(0[1-9]|1[0-2])\/\d{4}$/.test(date); // MM/YYYY format

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (validateCardName(value)) {
      setCardName(value);
    }
  };

  const handleCvvChange = (e) => {
    if (validateCvv(e.target.value)) {
      setCvv(e.target.value);
    }
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleInsuranceExpirationDateChange = (e) => {
    setInsuranceExpirationDate(e.target.value);
  };

  return (
    <div className='w-full px-4 sm:px-6 md:px-8'>
      <BackNavigation label="Proceed Payment" />

      {/* Success Dialog */}
      <Dialog open={successAlert} handler={() => setSuccessAlert(false)}>
        <DialogBody divider className="grid place-items-center gap-4">
          <FaCheckCircle className='text-3xl' color='green' />
          <Typography color="green" variant="h4">
            Success!
          </Typography>
          <Typography className="text-center font-normal">
            Service booked successfully.
          </Typography>
          <Button variant="gradient" onClick={() => setSuccessAlert(false)}>
            Ok, Got it
          </Button>
        </DialogBody>
      </Dialog>

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
                  LKR {service?.amount}.00
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
                LKR {service?.amount}.00
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
                        onChange={handleInsuranceExpirationDateChange}
                        className={!validateExpirationDate(insuranceExpirationDate) ? 'border-red-500' : ''}
                      />
                      {!validateExpirationDate(insuranceExpirationDate) && (
                        <Typography variant="small" color="red">
                          Please enter a valid expiration date in MM/YYYY format.
                        </Typography>
                      )}

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
                        onChange={handleCardNumberChange}
                        className={!validateCardNumber(cardNumber) ? 'border-red-500' : ''}
                      />
                      {!validateCardNumber(cardNumber) && (
                        <Typography variant="small" color="red">
                          Please enter a valid card number with at least 12 digits.
                        </Typography>
                      )}
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        Name on the Card
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="Enter name on card"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        onChange={handleCardNameChange}
                        className={!validateCardName(cardName) ? 'border-red-500' : ''}
                      />
                      {!validateCardName(cardName) && (
                        <Typography variant="small" color="red">
                          The name on the card can only contain uppercase letters and spaces.
                        </Typography>
                      )}
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
                        onChange={handleExpirationDateChange}
                        className={!validateExpirationDate(expirationDate) ? 'border-red-500' : ''}
                      />
                      {!validateExpirationDate(expirationDate) && (
                        <Typography variant="small" color="red">
                          Please enter a valid expiration date in MM/YYYY format.
                        </Typography>
                      )}

                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-2 text-sm md:text-base">
                        CVC
                      </Typography>
                      <Input
                        size="xs"
                        placeholder="Enter CVC"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        onChange={handleCvvChange}
                        className={!validateCvv(cvv) ? 'border-red-500' : ''}
                      />
                      {!validateCvv(cvv) && (
                        <Typography variant="small" color="red">
                          Please enter a valid 3-digit CVC.
                        </Typography>
                      )}

                    </div>
                  </div>

                  <Button
                    className={`mt-4 bg-dark-blue rounded-full ${selectedPaymentOption ? '' : 'opacity-50 cursor-not-allowed'}`}
                    fullWidth
                    onClick={handleContinue}
                    disabled={!validateCardNumber(cardNumber) || !validateCardName(cardName) || !validateCvv(cvv) || !validateExpirationDate(expirationDate)} // Disable button if no payment option is selected
                  >
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
