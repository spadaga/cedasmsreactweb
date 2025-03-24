import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

function GLCCMemoLinesComponent() {
  const [expandedItems, setExpandedItems] = useState({});

  const memoLines = [
    { id: 1, description: 'CASH DISCOUNT 4.91 OFF TOTAL DUE (INCLUDING SALES TAX) IF PAID BY THE 10TH OF THE MONTH FOLLOWING PURCHASE' },
    { id: 2, description: '01040 - PO445 A - 1 Electric Co of Charlotte' },
    { id: 3, description: 'Net payment is due by the 15th of the month following purchase' },
    { id: 4, description: 'Net payment is due by the 15th of the month following purchase' },
    { id: 5, description: 'CASH DISCOUNT 4.91 OFF TOTAL DUE (INCLUDING SALES TAX) IF PAID BY THE 10TH OF THE MONTH FOLLOWING PURCHASE' },
  ];

  const handleToggle = (id) => {
    setExpandedItems({
      ...expandedItems,
      [id]: !expandedItems[id],
    });
  };

  return (
    <Paper sx={{ padding: 2, borderRadius: 8, border: '1px solid #e0e0e0' }}> 
     
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <NoteAltIcon sx={{ marginRight: 1 }} />
          <Typography variant="h6">Memo Lines</Typography>
        </Box>
      
      </Box>
      <List>
        {memoLines.map((memo) => (
          <Box key={memo.id}>
            <ListItem button onClick={() => handleToggle(memo.id)}>
              <ListItemIcon>
                <IconButton size="small">
                  {expandedItems[memo.id] ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={memo.id.toString()} />
            </ListItem>
            <Collapse in={expandedItems[memo.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={memo.description} />
                </ListItem>
              </List>
            </Collapse>
          </Box>
        ))}
       </List>
       </Paper>
  );
}

export default GLCCMemoLinesComponent;