import React,{ useState }  from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import MasterLayout from '../Layout/MasterLayout';
import GLDynamicHeader from '../controls/GLDynamicHeader';
import { useNavigate } from 'react-router-dom';
import LoremIpsum from 'react-lorem-ipsum';
import GLAcPaySettingsComponent from './GLAcPaySettingsComponent';

const GLAcPaySettings = () => {
  const theme = useTheme();
  const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

  const handleBack = () => {
    navigate('/glmanagecustomer');
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };


  return (
    <MasterLayout title="Accounts payable">
      <Box sx={{ padding: '20px', border: `1px solid ${theme.palette.divider}`, borderRadius: '5px', backgroundColor: theme.palette.background.paper }}>
        <GLDynamicHeader
          title="Accounts payable(A/P) settings "
          descriptionContent={<p><LoremIpsum p={2} /></p>}
          showBackButton={true}
          backButtonHandler={handleBack}
          showAddButton={!isEditing} // show edit button only when not editing
            addButtonText={isEditing ? 'Save' : 'Edit'}
            addButtonHandler={handleEditToggle}
          
        />
        <GLAcPaySettingsComponent isEditing={isEditing}  setIsEditing={setIsEditing}/>
      </Box>
    </MasterLayout>
  );
};

export default GLAcPaySettings;