import React, { useState } from 'react';
import { TextField, Grid, Box, IconButton, Tooltip,AppBar,Toolbar,Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

const ReadOnlyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
  },
}));

const GLBillSettingsForm = ({ onClose }) => {
  const [documentsFolderId, setDocumentsFolderId] = useState('');
  const [poLookupSavedSearchId, setPoLookupSavedSearchId] = useState('');
  const [productLookupSavedSearchId, setProductLookupSavedSearchId] = useState('');
  const [readOnly, setReadOnly] = useState(true);

  const handleEdit = () => {
    setReadOnly(false);
  };

  const handleSave = () => {
    // Implement save logic here
    setReadOnly(true);
  };

  return (
    
      <Box p={3}>
            <AppBar position="static" style={{ backgroundColor: '#B0C4DE', marginBottom: '40px' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
            Bill - Celigo Settings
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon style={{ color: 'black' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
              {readOnly ? (
                <ReadOnlyTextField
                  label="Documents Folder ID"
                  value={documentsFolderId}
                  fullWidth
                  disabled
                />
              ) : (
                <TextField
                  label="Documents Folder ID"
                  value={documentsFolderId}
                  onChange={(e) => setDocumentsFolderId(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Help with Documents Folder ID">
                <IconButton size="small">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={1}>
              {readOnly ? (
                <IconButton size="small" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton size="small" onClick={handleSave}>
                  Save
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
              {readOnly ? (
                <ReadOnlyTextField
                  label="PO Lookup Saved Search Id"
                  value={poLookupSavedSearchId}
                  fullWidth
                  disabled
                />
              ) : (
                <TextField
                  label="PO Lookup Saved Search Id"
                  value={poLookupSavedSearchId}
                  onChange={(e) => setPoLookupSavedSearchId(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Help with PO Lookup Saved Search Id">
                <IconButton size="small">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={1}>
              {readOnly ? (
                <IconButton size="small" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton size="small" onClick={handleSave}>
                  Save
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
              {readOnly ? (
                <ReadOnlyTextField
                  label="Product Lookup Saved Search Id"
                  value={productLookupSavedSearchId}
                  fullWidth
                  disabled
                />
              ) : (
                <TextField
                  label="Product Lookup Saved Search Id"
                  value={productLookupSavedSearchId}
                  onChange={(e) => setProductLookupSavedSearchId(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Help with Product Lookup Saved Search Id">
                <IconButton size="small">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={1}>
              {readOnly ? (
                <IconButton size="small" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton size="small" onClick={handleSave}>
                  Save
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GLBillSettingsForm;