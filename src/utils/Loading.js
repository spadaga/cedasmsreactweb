// Loading.js
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // This is the key line
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
      }}
    >
      <CircularProgress />
      <Typography variant="body1" sx={{ marginTop: '16px' }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;