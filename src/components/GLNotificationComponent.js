import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const GLNotificationComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [notificationEmails, setNotificationEmails] = useState({
    billCreditMemoErrors: '',
    poDiscrepancies: '',
    newInventoryItems: '',
    newPurchaseOrders: '',
  });

  const handleEmailChange = (field) => (event) => {
    setNotificationEmails({ ...notificationEmails, [field]: event.target.value });
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log('Notification emails saved:', notificationEmails);
  };

  return (
    <Box
      sx={{
        padding: isMobile ? 2 : 4,
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography
          variant="h5" // Changed to h5 for a slightly larger header
          gutterBottom
          sx={{
            fontWeight: 600, // Make the header bold
            color: theme.palette.primary.main, // Use the primary color from the theme
          }}
        >
          Notification Settings
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: '0.9rem', // Slightly larger font size for notes
            fontStyle: 'italic', // Make the notes italic
            marginBottom: 2, // Add some extra margin at the bottom
          }}
        >
          Please enter one or more email addresses to receive notifications. Use ";" for entering multiple email addresses.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle2">Bill/Credit Memo Errors</Typography>
            <Tooltip title="Enter email addresses separated by ';'">
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            value={notificationEmails.billCreditMemoErrors}
            onChange={handleEmailChange('billCreditMemoErrors')}
            placeholder="Enter email addresses"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle2">PO Discrepancies</Typography>
            <Tooltip title="Enter email addresses separated by ';'">
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            value={notificationEmails.poDiscrepancies}
            onChange={handleEmailChange('poDiscrepancies')}
            placeholder="Enter email addresses"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle2">New Inventory Items</Typography>
            <Tooltip title="Enter email addresses separated by ';'">
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            value={notificationEmails.newInventoryItems}
            onChange={handleEmailChange('newInventoryItems')}
            placeholder="Enter email addresses"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle2">New Purchase Orders</Typography>
            <Tooltip title="Enter email addresses separated by ';'">
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            value={notificationEmails.newPurchaseOrders}
            onChange={handleEmailChange('newPurchaseOrders')}
            placeholder="Enter email addresses"
          />
        </Box>

        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3 }}>
          Save
        </Button>
      </Paper>
    </Box>
  );
};

export default GLNotificationComponent;