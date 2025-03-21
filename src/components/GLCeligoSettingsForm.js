import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
  AppBar,
  Toolbar, // Import Typography for heading
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const CustomSettingsForm = ({ onClose }) => {
  const [editStates, setEditStates] = useState({
    approvedPO: false,
    exportFrequency: false,
    cedAck: false,
    cedReceived: false,
    sendToCED: false,
  });

  const [fieldValues, setFieldValues] = useState({
    approvedPO: '1234',
    exportFrequency: '',
    cedAck: 'asdf',
    cedReceived: '12/12/99',
    sendToCED: 'abc@xys.com',
  });

  const handleEditClick = (field) => {
    setEditStates((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleFieldChange = (field, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isEditing = (field) => editStates[field];
  const theme = useTheme();

  return (
    <Box p={3}>
      {/* Heading */}
      <AppBar position="static" style={{ backgroundColor: '#B0C4DE', marginBottom: '40px' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
            Purchase - Celigo Settings
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon style={{ color: 'black' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextField
              fullWidth
              label="Approved PO Saved Search Id"
              value={fieldValues.approvedPO}
              InputProps={{
                readOnly: !isEditing('approvedPO'),
                endAdornment: (
                  <IconButton size="small" onClick={() => handleEditClick('approvedPO')}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: !isEditing('approvedPO') ? theme.palette.action.disabledBackground : 'transparent',
                },
              }}
              onChange={(e) => handleFieldChange('approvedPO', e.target.value)}
            />
            <Tooltip title="Enter the saved search ID for approved purchase orders.">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {isEditing('exportFrequency') ? (
              <FormControl fullWidth>
                <InputLabel id="export-frequency-label">Export Frequency</InputLabel>
                <Select
                  labelId="export-frequency-label"
                  id="export-frequency"
                  label="Export Frequency"
                  value={fieldValues.exportFrequency}
                  onChange={(e) => handleFieldChange('exportFrequency', e.target.value)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                label="Export Frequency"
                value={fieldValues.exportFrequency ? fieldValues.exportFrequency : "Select frequency"}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <IconButton size="small" onClick={() => handleEditClick('exportFrequency')}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: theme.palette.action.disabledBackground,
                  },
                }}
              />
            )}
            <Tooltip title="Select the frequency for exporting data.">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box mt={2} sx={{ backgroundColor:' #B0C4DE', mb: 2, p: 1 }}>
            CUSTOM FIELD ID
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextField
              fullWidth
              label="CED Acknowledgement Number"
              value={fieldValues.cedAck}
              InputProps={{
                readOnly: !isEditing('cedAck'),
                endAdornment: (
                  <IconButton size="small" onClick={() => handleEditClick('cedAck')}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: !isEditing('cedAck') ? theme.palette.action.disabledBackground : 'transparent',
                },
              }}
              onChange={(e) => handleFieldChange('cedAck', e.target.value)}
            />
            <Tooltip title="Enter the CED acknowledgement number.">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextField
              fullWidth
              label="CED Received Date"
              value={fieldValues.cedReceived}
              InputProps={{
                readOnly: !isEditing('cedReceived'),
                endAdornment: (
                  <IconButton size="small" onClick={() => handleEditClick('cedReceived')}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: !isEditing('cedReceived') ? theme.palette.action.disabledBackground : 'transparent',
                },
              }}
              onChange={(e) => handleFieldChange('cedReceived', e.target.value)}
            />
            <Tooltip title="Enter the CED received date.">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextField
              fullWidth
              label="Send to CED"
              value={fieldValues.sendToCED}
              InputProps={{
                readOnly: !isEditing('sendToCED'),
                endAdornment: (
                  <IconButton size="small" onClick={() => handleEditClick('sendToCED')}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: !isEditing('sendToCED') ? theme.palette.action.disabledBackground : 'transparent',
                },
              }}
              onChange={(e) => handleFieldChange('sendToCED', e.target.value)}
            />
            <Tooltip title="Enter the CED details.">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomSettingsForm;