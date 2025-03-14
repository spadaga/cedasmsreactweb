import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  styled,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slide,
  useTheme, // Import useTheme
} from '@mui/material';
import MasterLayout from '../Layout/MasterLayout';
import EditIcon from '@mui/icons-material/Edit';
import Dashboard from './GlSettingsContentN';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GLmanagecustomer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [customerName, setCustomerName] = useState('NEWMAN OUTDOOR ADVERTISING');
  const [activeStatus, setActiveStatus] = useState('Yes');
  const theme = useTheme(); // Use useTheme hook
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBack = () => {
    navigate('/glnewcustomers'); // Navigate to /glnewcustomers
};

  const StyledGrid = styled(Grid)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`, // Use theme divider
    padding: '16px',
    '&:last-child': {
      borderBottom: 'none',
    },
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    float: 'right',
  }));

  const StyledSaveCancelBanner = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f0f0f0', // Use theme background
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  }));

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleActiveStatusChange = (event) => {
    setActiveStatus(event.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save changes here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally, revert changes here
  };

  return (
    <MasterLayout title="MANAGE GL CUSTOMER">
      <Box sx={{ padding: '20px', border: `1px solid ${theme.palette.divider}`, borderRadius: '5px', backgroundColor: theme.palette.background.paper }}> {/* Use theme divider and background */}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <StyledButton variant="text" onClick={handleBack} startIcon={<ArrowBackIcon />}>
                        Back
                    </StyledButton>
                    <StyledButton variant="text" startIcon={<EditIcon />} onClick={handleEditToggle}>
                        {isEditing ? 'Save' : 'Edit'}
                    </StyledButton>
                </Box>

        <Grid container sx={{ border: `1px solid ${theme.palette.divider}` }}> {/* Use theme divider */}
          <StyledGrid item xs={12} sm={3} sx={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#f5f5f5' }}> {/* Use theme background based on mode */}
            <Typography variant="subtitle1">CUSTOMER NAME:</Typography>
          </StyledGrid>
          <StyledGrid item xs={12} sm={9}>
            {isEditing ? (
              <TextField
                value={customerName}
                onChange={handleCustomerNameChange}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{customerName}</Typography>
            )}
          </StyledGrid>
          <StyledGrid item xs={12} sm={3} sx={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#f5f5f5' }}> {/* Use theme background based on mode */}
            <Typography variant="subtitle1">ACTIVE:</Typography>
          </StyledGrid>
          <StyledGrid item xs={12} sm={9} sx={{ display: 'flex', alignItems: 'center' }}>
            {isEditing ? (
              <FormControl fullWidth>
                <InputLabel id="active-status-label">Active Status</InputLabel>
                <Select
                  labelId="active-status-label"
                  id="active-status-select"
                  value={activeStatus}
                  label="Active Status"
                  onChange={handleActiveStatusChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: activeStatus === 'Yes' ? 'green' : 'red',
                    marginRight: '8px',
                  }}
                />
                <Typography variant="body1">{activeStatus}</Typography>
              </>
            )}
          </StyledGrid>
        </Grid>
        <Dashboard />

        <Slide direction="up" in={isEditing} mountOnEnter unmountOnExit>
          <StyledSaveCancelBanner>
            <Button variant="outlined" onClick={handleCancel} sx={{ marginRight: '10px' }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </StyledSaveCancelBanner>
        </Slide>
      </Box>
    </MasterLayout>
  );
};

export default GLmanagecustomer;