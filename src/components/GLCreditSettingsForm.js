import React, { useState } from 'react';
import { TextField, Grid, Box, IconButton, Tooltip, Paper, Typography, AppBar, Toolbar, InputAdornment } from '@mui/material';
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

const GLCreditSettingsForm = ({ onClose }) => {
  const [documentsFolderId, setDocumentsFolderId] = useState('');
  const [billLookupSavedSearchId, setBillLookupSavedSearchId] = useState('');
  const [readOnly, setReadOnly] = useState(true);

  const handleEdit = () => {
    setReadOnly(false);
  };

  const handleSave = () => {
    // Implement save logic here
    setReadOnly(true);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: 'auto', marginTop: '20px' }}>
      <AppBar position="static" style={{ backgroundColor: '#B0C4DE', marginBottom: '40px' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
            Credit - Celigo Settings
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon style={{ color: 'black' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={11}>
              {readOnly ? (
                <ReadOnlyTextField
                  label="Documents Folder ID"
                  value={documentsFolderId}
                  fullWidth
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={handleEdit}>
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <TextField
                  label="Documents Folder ID"
                  value={documentsFolderId}
                  onChange={(e) => setDocumentsFolderId(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={handleSave}>
                          Save
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={11}>
              {readOnly ? (
                <ReadOnlyTextField
                  label="Bill Lookup Saved Search Id"
                  value={billLookupSavedSearchId}
                  fullWidth
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={handleEdit}>
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <TextField
                  label="Bill Lookup Saved Search Id"
                  value={billLookupSavedSearchId}
                  onChange={(e) => setBillLookupSavedSearchId(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={handleSave}>
                          Save
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Help with Bill Lookup Saved Search Id">
                <IconButton size="small">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GLCreditSettingsForm;