import React, { useState } from 'react';
import { Grid, Switch, Typography, Box, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CeligoSettingsForm from './GLCeligoSettingsForm';
import GLBillSettingsForm from './GLBillSettingsForm';
import GLCreditSettingsForm from './GLCreditSettingsForm';
import GLProductCatalogSettingsForm from './GLProductCatalogSettingsForm';

const ConnectionSetting = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeSwitches, setActiveSwitches] = useState({});
  const [showBanner, setShowBanner] = useState(false);

  const sections = [
    {
      name: 'Purchase Order Workflow',
      settingcomponent: 'Automate your purchase order process with customizable workflows',
      content: <CeligoSettingsForm sectionName="Purchase Order Workflow" />,
    },
    {
      name: 'Bill Workflow',
      description: 'Streamline your billing process with automated workflows',
      isActive: true,
      content: <GLBillSettingsForm sectionName="Purchase Order Workflow4" />,
    },
    {
      name: 'Credit Workflow',
      description: 'Manage credit applications and approvals efficiently',
      content: <GLCreditSettingsForm sectionName="Purchase Order Workflow3" />,
    },
    {
      name: 'Product Catalog Workflow',
      description: 'Automate your product catalog management process',
      content: <GLProductCatalogSettingsForm sectionName="Purchase Order Workflow2" />,
    },
  ];

  const handleSettingsClick = (sectionName) => {
    setActiveSection(sectionName);
  };

  const handleSwitchChange = (sectionName) => {
    setActiveSwitches((prevSwitches) => ({
      ...prevSwitches,
      [sectionName]: !prevSwitches[sectionName],
    }));
    setShowBanner(true);
  };

  const handleCancel = () => {
    setActiveSwitches({});
    setShowBanner(false);
  };

  const handleSave = () => {
    // Save logic here
    setShowBanner(false);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Connection Settings
      </Typography>
      <Grid container sx={{ display: 'flex' }}>
        <Grid item xs={6} sx={{ paddingRight: 2, display: 'flex', flexDirection: 'column' }}>
          {sections.map((section) => (
            <Box
              key={section.name}
              display="flex"
              flexDirection="column"
              mb={2}
              p={2}
              sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Switch
                    checked={activeSwitches[section.name] || false}
                    onChange={() => handleSwitchChange(section.name)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Typography variant="body1">{section.name}</Typography>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ ml: 1 }}
                  onClick={() => handleSettingsClick(section.name)}
                >
                  Celigo Settings {'>'}
                </Button>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {section.description}
              </Typography>
              {section.isActive && (
                <Box mt={1} p={1} bgcolor="#e8f5e9" borderRadius={1}>
                  <Typography variant="caption" color="success.main">
                    This workflow is currently active and running
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Grid>
        <Grid item xs={6} sx={{ border: '1px dashed #9e9e9e', borderRadius: 1, flexGrow: 1 }}>
          {activeSection ? (
            sections.find((section) => section.name === activeSection)?.content
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="body1" color="textSecondary">
                Click "Celigo Settings" to view workflow settings.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
      {showBanner && (
        <Box
          sx={{
            position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      bgcolor: '#f0f0f0',
      p: 2,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 1000, // Add a high z-index
          }}
        >
          <Button onClick={handleCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ConnectionSetting;