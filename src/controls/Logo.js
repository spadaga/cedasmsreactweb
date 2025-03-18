import React from 'react';
import { IconButton, Box, Typography, Tooltip, useMediaQuery, useTheme } from '@mui/material'; // Import useMediaQuery and useTheme

const logoStyles = {
  square: {
    width: '35px',
    height: '35px',
    border: '2px solid #ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: '0.8em',
    fontWeight: 'bold',
    color: '#ffffff',
    padding: '5px',
  },
  text: {
    fontSize: '0.5em',
    marginTop: '2px',
    color: '#ffffff',
    textAlign: 'center',
  },
};

const Logo = () => {
  const mqTheme = useTheme();
  const isSmallScreen = useMediaQuery(mqTheme.breakpoints.down('sm'));

  return (
    <Tooltip title="Navigate to General Ledger ">
      <IconButton disableRipple sx={{ padding: '0px',marginBottom:"10px" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(8px)' }}>
          <div style={logoStyles.square}>
            <Typography style={logoStyles.initials}>GL</Typography>
          </div>
          {!isSmallScreen && <Typography style={logoStyles.text}>General Ledger</Typography>}
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default Logo;