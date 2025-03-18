import React from 'react';
import {
  Box,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';

const ButtonLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const buttonHeight = '40px'; // Adjust as needed

  return (
    <Box sx={{ marginBottom: '20px' }}>
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button variant="contained" startIcon={<AddIcon />} fullWidth>
            ADD PRODUCTS
          </Button>
          <Button variant="contained" startIcon={<RefreshIcon />} fullWidth>
            REFRESH PRICE
          </Button>
          <Button variant="contained" startIcon={<SendIcon />} fullWidth>
            TRANSMIT
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} fullWidth>
            DOWNLOAD
          </Button>
          <Select value="Customer View" variant="outlined" fullWidth>
            <MenuItem value="Customer View">Customer View</MenuItem>
            <MenuItem value="PC View">PC View</MenuItem>
          </Select>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" sx={{ marginRight: '10px', height: buttonHeight }} startIcon={<AddIcon />}>
              ADD PRODUCTS
            </Button>
            <Button variant="outlined" sx={{ marginRight: '10px', height: buttonHeight }} startIcon={<RefreshIcon />}>
              REFRESH PRICE
            </Button>
            <Button variant="outlined" sx={{ marginRight: '10px', height: buttonHeight }} startIcon={<SendIcon />}>
              TRANSMIT
            </Button>
            <Button variant="outlined" sx={{ marginRight: '10px', height: buttonHeight }} startIcon={<DownloadIcon />}>
              DOWNLOAD
            </Button>
            <Select value="Customer View" variant="outlined" sx={{ height: buttonHeight }}>
              <MenuItem value="Customer View">Customer View</MenuItem>
              <MenuItem value="PC View">PC View</MenuItem>
            </Select>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ButtonLayout;