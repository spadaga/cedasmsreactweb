import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  TextField,
  Divider,
} from '@mui/material';

const GLFilterPanel = () => {
  return (
    <Box sx={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px', height: '100%', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Categories */}
      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      <List>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(41) Builders Products</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(348) Conduit & Raceways</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(1317) Conduit Fittings & Accessories</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(261) Controls</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(1136) Distribution Equipment</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(2055) Fuses & Batteries</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(1643) Lighting</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(29) Line Construction</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">(1907) Miscellaneous Material</Typography>
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Price Range */}
      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField size="small" label="Min" variant="outlined" />
        <TextField size="small" label="Max" variant="outlined" />
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Manufacturer */}
      <Typography variant="subtitle1" gutterBottom>
        Manufacturer
      </Typography>
      <TextField size="small" label="Search manufacturers" variant="outlined" sx={{ mb: 1 }} />
      <List>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">GREENLEE TEXTRON</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">COOPER BUSSMAN</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">SIEMENS</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Checkbox />
          <Typography variant="body2">SCHNEIDER ELECTRIC</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default GLFilterPanel;