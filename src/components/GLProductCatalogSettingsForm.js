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

const ProductCatalogSettingsForm = ({ onClose }) => {
  const [expenseAccount, setExpenseAccount] = useState('');
  const [taxSchedule, setTaxSchedule] = useState('');
  const [readOnly, setReadOnly] = useState(true);

  const handleEdit = () => {
    setReadOnly(false);
  };

  const handleSave = () => {
    // Implement save logic here
    setReadOnly(true);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: 'auto',marginTop:"20px" }}>
      <AppBar position="static" style={{ backgroundColor: '#B0C4DE', marginBottom: '20px' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
            Product catalog - Celigo Settings
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
                  label="Expense Account *"
                  value={expenseAccount}
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
                  label="Expense Account *"
                  value={expenseAccount}
                  onChange={(e) => setExpenseAccount(e.target.value)}
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
              <Tooltip title="Help with Expense Account">
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
                  label="Tax Schedule *"
                  value={taxSchedule}
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
                  label="Tax Schedule *"
                  value={taxSchedule}
                  onChange={(e) => setTaxSchedule(e.target.value)}
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
              <Tooltip title="Help with Tax Schedule">
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

export default ProductCatalogSettingsForm;