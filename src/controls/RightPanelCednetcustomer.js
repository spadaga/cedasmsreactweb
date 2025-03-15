// RightPanel.js (Separate Component)
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  Paper,
  Alert,
  Slide,
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Import your JSON data
import pcData from '../data/pcs.json'; // Replace with your actual file path
import customerData from '../data/customers.json'; // Replace with your actual file path
import accountsData from '../data/accounts.json'; // Replace with your actual file path

const RightPanelCednetcustomer = ({ isOpen, onClose, title, readOnly }) => { // Add readOnly prop
  const theme = useTheme();
  const [pcValue, setPcValue] = useState(null);
  const [customerValue, setCustomerValue] = useState(null);
  const [accountValue, setAccountValue] = useState(null);

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
      <Paper
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 400,
          height: '100vh',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(3),
          zIndex: 1200,
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: theme.spacing(3) }}>
          <Typography variant="h6" color={theme.palette.text.primary}>{title}</Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon color={theme.palette.action.active} />
          </IconButton>
        </Box>

        <Autocomplete
          value={pcValue}
          onChange={(event, newValue) => {
            setPcValue(newValue);
          }}
          options={pcData}
          getOptionLabel={(option) => option.PCNAME}
          renderInput={(params) => (
            <TextField {...params} label="PC" margin="normal" variant="outlined" InputProps={{
                readOnly: readOnly, // Apply readonly mode
              }}/>
          )}
          sx={{ mb: 2 }}
          disabled={readOnly} // Disable the Autocomplete
        />

        <Autocomplete
          value={customerValue}
          onChange={(event, newValue) => {
            setCustomerValue(newValue);
          }}
          options={customerData}
          getOptionLabel={(option) => option.customername}
          renderInput={(params) => (
            <TextField {...params} label="CEDNET CUSTOMER" margin="normal" variant="outlined" InputProps={{
                readOnly: readOnly, // Apply readonly mode
              }} />
          )}
          sx={{ mb: 2 }}
          disabled={readOnly} // Disable the Autocomplete
        />

        <Autocomplete
          value={accountValue}
          onChange={(event, newValue) => {
            setAccountValue(newValue);
          }}
          options={accountsData}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="PRICING ACCOUNT" margin="normal" variant="outlined" InputProps={{
                readOnly: readOnly, // Apply readonly mode
              }} />
          )}
          sx={{ mb: 2 }}
          disabled={readOnly} // Disable the Autocomplete
        />

        <Alert
          icon={<InfoOutlinedIcon />}
          severity="info"
          sx={{
            mt: theme.spacing(3),
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
            color: theme.palette.text.secondary,
          }}
        >
          <Typography variant="body2">
            Pricing account is used for GL product catalog price refresh.
          </Typography>
        </Alert>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: theme.spacing(4) }}>
          <Button variant="outlined" disabled={readOnly}  onClick={onClose} color="inherit">Cancel</Button>
          <Button variant="contained" disabled={readOnly} color="primary">Save Changes</Button>
        </Box>
      </Paper>
    </Slide>
  );
};

export default RightPanelCednetcustomer;