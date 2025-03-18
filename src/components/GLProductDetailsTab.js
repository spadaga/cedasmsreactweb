import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Switch, FormControlLabel, Grid } from '@mui/material';

const GLProductDetailsTab = ({ value, index }) => {



  const [isEditing, setIsEditing] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: 'BLINE B2211PAZN1-1/4',
    description: 'DEEP SLOTTED CHANNEL',
    upc: '894563213333',
    category: 'Solar Inverters',
    createdOn: '12/23/2022',
    transmittedOn: '12/23/2022',
    active: true,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Product details saved:', productDetails);
  };

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleActiveChange = (event) => {
    setProductDetails({ ...productDetails, active: event.target.checked });
  };

  if (value !== index) {
    return null; // Don't render if the tab is not active
  }
  return (
    <Box>
{!isEditing && (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 'bold', mb: 0 }}>
              NAME *
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {productDetails.name}
            </Typography>

            <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 'bold', mb: 0 }}>
              DESCRIPTION
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {productDetails.description}
            </Typography>

            <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 'bold', mb: 0 }}>
              UPC
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {productDetails.upc}
            </Typography>

            <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 'bold', mb: 0 }}>
              CATEGORY
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {productDetails.category}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body1" color={productDetails.active ? 'success.main' : 'error.main'}>
                • Active: {productDetails.active ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="body2">TRANSMITTED ON: {productDetails.transmittedOn}</Typography>
              <Typography variant="body2">CREATED ON: {productDetails.createdOn}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" onClick={handleEdit} sx={{ mr: 1, bgcolor: '#673ab7' }}>
            Edit
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#673ab7' }}>
            Transmit
          </Button>
        </Box>
      </Box>
    )}



      {isEditing && (
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Edit Product Details
          </Typography>

          <TextField
            label="NAME"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiInputBase-input': {
                backgroundColor: '#e8eaec',
              },
            }}
          />

          <TextField
            label="DESCRIPTION"
            name="description"
            value={productDetails.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiInputBase-input': {
                backgroundColor: '#e8eaec',
              },
            }}
          />

          <TextField
            label="UPC"
            name="upc"
            value={productDetails.upc}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiInputBase-input': {
                backgroundColor: '#e8eaec',
              },
            }}
          />

          <TextField
            label="CATEGORY"
            name="category"
            value={productDetails.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiInputBase-input': {
                backgroundColor: '#e8eaec',
              },
            }}
          />

          <FormControlLabel
            control={<Switch checked={productDetails.active} onChange={handleActiveChange} />}
            label={productDetails.active ? 'Active' : 'Inactive'}
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleCancel} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GLProductDetailsTab;