import React from 'react';
import { Box, Typography,useTheme } from '@mui/material';
import MasterLayout from '../Layout/MasterLayout'; // Adjust the path as needed
import GLDynamicHeader from '../controls/GLDynamicHeader';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LoremIpsum from 'react-lorem-ipsum';
import GLCustomerCreditComponent from './GLCustomerCreditComponent';

const GLCustomerCredit = () => {
  const theme = useTheme(); // Use useTheme hook
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBack = () => {
    navigate('/glmanagecustomer'); // Navigate to /glnewcustomers
};


  return (
    <MasterLayout title="Customer Credit ">
      <Box sx={{ padding: '20px', border: `1px solid ${theme.palette.divider}`, borderRadius: '5px', backgroundColor: theme.palette.background.paper }}> {/* Use theme divider and background */}

         <GLDynamicHeader
                        title="Customer Credit  "
                        descriptionContent={<p><LoremIpsum p={2} /></p>}
                        showBackButton={true}
                        backButtonHandler={handleBack}
                        // showAddButton={true}
                        // addButtonText= {isEditing ? 'Save' : 'Edit'}
                        // addButtonHandler={handleEditToggle}
                      />
        {/* Your content will go here */}
        <GLCustomerCreditComponent/>
      </Box>  
    </MasterLayout>
  );
};

export default GLCustomerCredit;