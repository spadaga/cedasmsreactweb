import React, { useState } from 'react';
import { Box, Typography, useTheme, Slide, Button, styled } from '@mui/material';
import MasterLayout from '../Layout/MasterLayout';
import GLDynamicHeader from '../controls/GLDynamicHeader';
import { useNavigate } from 'react-router-dom';
import LoremIpsum from 'react-lorem-ipsum';
import GLMemoTopComponent from './GLMemoTopComponent';
import GLMemoBottomComponent from './GLMemoBottomComponent';

const StyledSaveCancelBanner = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'flex-end',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const GLCreditMemoForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleBack = () => {
    navigate('/glmanagecustomer');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle the isEditing state
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // Implement your save logic here
    setIsEditing(false);
  };

  const handleCheckboxOrRadioChange = () => {
    if (!isEditing) {
        setIsEditing(true); // Open the slide bar if it's closed
      }
  };

  return (
    <MasterLayout title="Bill/Credit Memo Settings">
      <Box sx={{ padding: '20px', border: `1px solid ${theme.palette.divider}`, borderRadius: '5px', backgroundColor: theme.palette.background.paper }}>
        <GLDynamicHeader
          title="Credit Memo Settings "
          descriptionContent={<p><LoremIpsum p={2} /></p>}
          showBackButton={true}
          backButtonHandler={handleBack}
          showAddButton={!isEditing}
          addButtonText={ 'Save'}
          addButtonHandler={handleEditToggle}
        />
        <GLMemoTopComponent onChange={handleCheckboxOrRadioChange} />
        <GLMemoBottomComponent onChange={handleCheckboxOrRadioChange} />
      </Box>

      <Slide direction="up" in={isEditing} mountOnEnter unmountOnExit>
  <StyledSaveCancelBanner sx={{ zIndex:2, boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)' }}> {/* Added boxShadow */}
    <Button variant="outlined" onClick={handleCancel} sx={{ marginRight: '10px' }}>
      Cancel
    </Button>
    <Button variant="contained" color="primary" onClick={handleSave}>
      Save
    </Button>
  </StyledSaveCancelBanner>
</Slide>
    </MasterLayout>
  );
};

export default GLCreditMemoForm;