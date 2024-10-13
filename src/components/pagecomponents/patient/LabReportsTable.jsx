import React, { useState } from "react";
import { Card, Typography, Button, Accordion, AccordionBody } from "@material-tailwind/react";

const TABLE_HEAD = ["Date", "Test Name", "Result", "Notes", "Action"];

const TABLE_ROWS = [
  {
    date: "01/02/2023",
    testName: "Complete Blood Count (CBC)",
    result: "Normal",
    notes: "All values within normal ranges.",
    additionalInfo: "No abnormalities detected.",
  },
  {
    date: "15/04/2023",
    testName: "Lipid Profile",
    result: "Cholesterol High",
    notes: "Cholesterol level above normal range.",
    additionalInfo: "Recommended lifestyle changes and follow-up in 3 months.",
  },
  {
    date: "20/05/2023",
    testName: "Liver Function Test",
    result: "Normal",
    notes: "Liver enzymes within normal ranges.",
    additionalInfo: "Regular check-ups are recommended.",
  },
  {
    date: "10/07/2023",
    testName: "Thyroid Function Test",
    result: "Hypothyroidism",
    notes: "TSH level elevated.",
    additionalInfo: "Treatment started with Levothyroxine.",
  },
  {
    date: "30/09/2023",
    testName: "Urinalysis",
    result: "Normal",
    notes: "No signs of infection or other issues.",
    additionalInfo: "Continue regular monitoring.",
  },
];

// Function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const LabReportsTable = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Card className="w-full">
      {/* Desktop View */}
      <div className="hidden lg:block">
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 font-poppins"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ date, testName, result, notes, additionalInfo }, index) => {
              const isOpen = openIndex === index;
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <React.Fragment key={date}>
                  <tr>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {testName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {result}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                        {truncateText(notes, 30)} {/* Truncated to 30 characters */}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button onClick={() => handleToggleAccordion(index)} color="blue">
                        See More
                      </Button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={5} className="p-4 bg-blue-gray-50">
                        <Accordion open={isOpen}>
                          <AccordionBody>
                            <div className="grid grid-cols-8 gap-8 justify-center">
                              <div className="col-span-6">
                                <strong className="font-bold text-black">Additional Info:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                  {additionalInfo}
                                </Typography>
                              </div>
                              <div className="col-span-2">
                                <strong className="font-bold text-black">Notes:</strong>
                                <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                                  {notes}
                                </Typography>
                              </div>
                            </div>
                          </AccordionBody>
                        </Accordion>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {TABLE_ROWS.map(({ date, testName, result, notes, additionalInfo }, index) => {
          const isOpen = openIndex === index; // Check if the current index is open
          
          return (
            <div key={date} className="border-b border-blue-gray-100 p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Date:</strong> {date}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Test:</strong> {testName}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                    <strong>Result:</strong> {result}
                  </Typography>
                </div>
                <Button onClick={() => handleToggleAccordion(index)} color="blue">
                  {isOpen ? "See Less" : "See More"}
                </Button>
              </div>
              {isOpen && ( // Display additional info when accordion is open
                <Accordion open={isOpen}>
                  <AccordionBody>
                    <div className="mt-2">
                      <div>
                        <strong className="font-bold text-black">Additional Info:</strong>
                        <Typography variant="medium" color="blue-gray" className="font-normal font-poppins font-medium">
                          {additionalInfo}
                        </Typography>
                      </div>
                      <div className="mt-6">
                        <strong className="font-bold text-black">Notes:</strong>
                        <Typography variant="small" color="blue-gray" className="font-normal font-poppins font-medium">
                          {notes}
                        </Typography>
                      </div>
                    </div>
                  </AccordionBody>
                </Accordion>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LabReportsTable;
