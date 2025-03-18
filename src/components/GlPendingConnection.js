// GlPendingConnection.js
import React from "react";
import { Box, Typography } from "@mui/material";

const GlPendingConnection = ({ value, index, theme }) => {
  if (value !== index) {
    return null;
  }

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
          <Typography>Pending Connection Content</Typography>
        </Box>
      )}
    </Box>
  );
};

export default GlPendingConnection;