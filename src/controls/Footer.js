import React from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const Footer = () => {
 const {darkMode} = useThemeContext();
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        color: darkMode ? 'lightgray' : 'gray',
        padding: '16px',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="body2">© 2025 Employee Management System</Typography>
    </Box>
  );
};

export default Footer;