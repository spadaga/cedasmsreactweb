import React from 'react';
import { Alert, Typography, useTheme } from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const CustomAlertRibbon = ({ message }) => {
  const theme = useTheme();

  return (
    <Alert
      severity="warning"
      icon={<WarningRoundedIcon style={{ color: theme.palette.error.main }} />}
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.error[50] : theme.palette.error[900], // Light red in light mode, dark red in dark mode
        border: `1px solid ${theme.palette.error[200]}`,
        borderRadius: '8px',
        padding: '8px 16px', // Adjusted padding for better fit
        display: 'flex',
        alignItems: 'center',
        boxShadow: theme.palette.mode === 'light' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(255, 255, 255, 0.1)',
        marginBottom: "30px",
      }}
    >
      <Typography variant="body2" style={{ color: theme.palette.mode === 'light' ? theme.palette.error[900] : theme.palette.error[100] }}>
        {message}
      </Typography>
    </Alert>
  );
};

export default CustomAlertRibbon;