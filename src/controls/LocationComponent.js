import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isDarkMode ? theme.palette.grey[900] : '#f0f0f0', // Basic dark/light background
        color: theme.palette.text.primary,
        padding: '16px',
        borderRadius: '4px',
        width: '100%',
        margin: '4px auto',
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Typography variant="body2" sx={{ marginRight: '8px' }}>
          Showing parts and pricing for:
        </Typography>
        <Box
          sx={{
            backgroundColor: isDarkMode ? theme.palette.grey[800] : '#e0e0e0', // Adjust based on mode
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LocationOnIcon sx={{ marginRight: '4px', color: theme.palette.action.active }} />
          <Typography variant="body2" sx={{ fontWeight: '400' }}>
            DENVER / EFFICIENCY ENERGY
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        size="small"
        onClick={handleClick}
        sx={{ marginRight: '16px' }}
      >
        Change
      </Button>

      <Button variant="contained" size="small">
        VIEW SELECTED LIST [99]
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem sx={{ padding: 0 }}>
          <Box sx={{ padding: '16px', width: '300px', backgroundColor: isDarkMode ? theme.palette.grey[900] : theme.palette.background.paper, color: theme.palette.text.primary }}>
            <Typography variant="subtitle1" gutterBottom>
              PC
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="pc-select-label">DENVER</InputLabel>
              <Select labelId="pc-select-label" id="pc-select" value="DENVER" label="DENVER">
                <MenuItem value="DENVER">DENVER</MenuItem>
                {/* Add more PC options here */}
              </Select>
            </FormControl>

            <Typography variant="subtitle1" gutterBottom>
              Account
            </Typography>
            <TextField fullWidth value="1872-COD-JOSHUA GRAGES" />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" sx={{ mr: 1 }}>
                DONE
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                CANCEL
              </Button>
            </Box>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LocationComponent;