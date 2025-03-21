import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Import InfoOutlinedIcon
import SyncIcon from '@mui/icons-material/Sync'; // Import SyncIcon
import ViewListIcon from '@mui/icons-material/ViewList'; // Import ViewListIcon

const GLMemoBottomComponent =({ onChange }) => {
  const [syncOption, setSyncOption] = useState('automatic');
  const [detailLevel, setDetailLevel] = useState('summary');

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: 1,
    marginBottom: 3,
  };
  const handleChange = () => {
    if (onChange) {
      onChange();
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Sync Settings Card */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <SyncIcon sx={{ marginRight: 1, color: '#3f51b5' }} /> {/* Sync Icon */}
                  <Typography variant="h6">Sync Settings</Typography>
                </Box>
                <Tooltip title="Sync Settings Help">
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider> </Divider>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                How do you want to sync Bill/Credit memo?
              </Typography>
              <RadioGroup value={syncOption} onChange={(e) => { handleChange();setSyncOption(e.target.value) }}>
                <FormControlLabel value="automatic" control={<Radio />} label="Automatic" />
                <Typography variant="body2" sx={{ ml: 3 }}>
                  Automatically send Bill/Credit memo when its ready.
                </Typography>
                <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                <Typography variant="body2" sx={{ ml: 3 }}>
                  Manually select and send Bill/Credit memo to Netsuite.
                </Typography>
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Detail Level Card */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <ViewListIcon sx={{ marginRight: 1, color: '#3f51b5' }} /> {/* ViewList Icon */}
                  <Typography variant="h6">Detail Level</Typography>
                </Box>
                <Tooltip title="Detail Level Help">
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider> </Divider>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                What level of details you want to see?
              </Typography>
              <RadioGroup value={detailLevel} onChange={(e) => { handleChange();setDetailLevel(e.target.value)}}>
                <FormControlLabel value="summary" control={<Radio />} label="Summary Level" />
                <Typography variant="body2" sx={{ ml: 3 }}>
                  Send only summary level Bill/Credit memo information.
                </Typography>
                <FormControlLabel value="line" control={<Radio />} label="Line Item Level" />
                <Typography variant="body2" sx={{ ml: 3 }}>
                  Send Line item level Bill/Credit memo information.
                </Typography>
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GLMemoBottomComponent;