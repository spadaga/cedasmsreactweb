import React from 'react';
import { Box } from '@mui/material';
import MasterLayout from '../Layout/MasterLayout'; // Adjust the path as needed

const GLSamplewithMaster = () => {
  return (
    <MasterLayout title="MANAGE GL CUSTOMER">
      <Box sx={{ padding: '20px' }}>
        {/* Your content will go here */}
        <Typography variant="body1">
          This page is currently empty.
        </Typography>
      </Box>
    </MasterLayout>
  );
};

export default GLSamplewithMaster;