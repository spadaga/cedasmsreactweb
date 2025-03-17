import React from 'react';
import { IconButton, Box, Typography, Tooltip } from '@mui/material'; // Import Tooltip

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
  return (
    <Tooltip title="Navigate to General Ledger "> {/* Add Tooltip */}
      <IconButton disableRipple sx={{ padding: '0px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(8px)' }}>
          <div style={logoStyles.square}>
            <Typography style={logoStyles.initials}>GL</Typography>
          </div>
          <Typography style={logoStyles.text}>General Ledger</Typography>
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default Logo;