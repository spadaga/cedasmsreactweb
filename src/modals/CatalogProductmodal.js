import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useThemeContext } from "../context/ThemeContext"; 
import { Button, Divider } from '@mui/material';
function CatalogProductmodal({ open, onClose, product }) {
  const [manufacturerCode, setManufacturerCode] = useState('');
  const [catalogNumber, setCatalogNumber] = useState('');
  const [assetNumber, setAssetNumber] = useState('');
  const [binLocation, setBinLocation] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);

  // Update state when product prop changes (if needed)
  // useEffect(() => {
  //   if (product) {
  //     setManufacturerCode(product.manufacturerCode || '');
  //     setCatalogNumber(product.catalogNumber || '');
  //     setAssetNumber(product.assetNumber || '');
  //     setBinLocation(product.binLocation || '');
  //     setDescription(product.description || '');
  //     setActive(product.active || false);
  //   }
  // }, [product]);
  const { darkMode } = useThemeContext();
  const style = {
    position: "absolute",
    top: "5%", // Adjust this value as needed
    left: "50%", // This will center it horizontally
    transform: "translateX(-50%)", // This will center it horizontally
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    backgroundColor: darkMode ? "#444" : "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: darkMode ? "white" : "black",
    marginTop: "20px",
    marginBottom: "20px",
    // ... (other modal styles)
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: darkMode ? "#222" : "#f0f0f0",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: darkMode ? "#666" : "#ccc",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: darkMode ? "#888" : "#aaa",
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-details-modal"
      aria-describedby="product-details-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="product-details-modal" variant="h6" component="h2">
            Tool Details
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '40%', mr: 2 }}>
            <img src="https://cdn.myced.com/images/Products/000000/082472/30000/08247230014_O1_600x600.jpg" alt="Product" style={{ width: '180px', height: '180px' }} />
            <Typography variant="body2" sx={{ mt: 2 ,fontWeight:600}}>
              Current Availability:
            </Typography>
            <Typography variant="body2">
              Checked Out: 09/24/2024 by Suresh Padaga
            </Typography>
            <Typography variant="body2">
              Expected Back: 09/27/2024
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 ,fontWeight:600}}>
              Previous Checkout:
            </Typography>
            <Typography variant="body2">
              Checked Out: 09/20/2024 by Fred Rogers
            </Typography>
            <Typography variant="body2">
              Checked In: 09/23/2024
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 ,fontWeight:600}}>
              Last Maintenance:
            </Typography>
            <Typography variant="body2">
              Checked Out: 09/02/2024 by Bart Simpson
            </Typography>
            <Typography variant="body2">
              Checked In: 09/30/2024
            </Typography>
          </Box>

          <Box sx={{ width: '60%' }}>
            <TextField
              label="Manufacturer Code*"
              variant="outlined"
              fullWidth
              margin="normal"
              value={manufacturerCode}
              onChange={(e) => setManufacturerCode(e.target.value)}
            />
            <TextField
              label="Catalog Number*"
              variant="outlined"
              fullWidth
              margin="normal"
              value={catalogNumber}
              onChange={(e) => setCatalogNumber(e.target.value)}
            />
            <TextField
              label="Asset Number*"
              variant="outlined"
              fullWidth
              margin="normal"
              value={assetNumber}
              onChange={(e) => setAssetNumber(e.target.value)}
            />
            <TextField
              label="Bin Location"
              variant="outlined"
              fullWidth
              margin="normal"
              value={binLocation}
              onChange={(e) => setBinLocation(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{ maxLength: 50 }}
              helperText={`${description.length}/50 Chars Max.`}
            />
            <FormControlLabel
              control={<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />}
              label="Active"
            />
            {/* Scheduled Maintenance Section */}
            <Box sx={{ mt: 2, borderTop: '1px solid #ccc', pt: 2 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                    fontWeight: 'bold',
                    borderLeft: '4px solid #4CAF50', // Add border left
                    pl: 1, // Add padding left
                }}
              >
                Scheduled Maintenance
              </Typography>
              <TextField
                label="Maintenance Type"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Due On"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Email Reminder"
              />
            </Box>
             {/* Divider */}
             
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />

{/* Save and Cancel Buttons */}
<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
  <Button variant="contained" color="success" sx={{ mr: 1 }}>
    Save
  </Button>
  <Button variant="outlined" onClick={onClose}>
    Cancel
  </Button>
</Box>
      </Box>
    </Modal>
  );
}

export default CatalogProductmodal;