import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const GlCommonTab = ({ value, handleChange, theme, children , labels}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="customer tabs"
        sx={{
          mb:4,
          "& .MuiTabs-indicator": {
            backgroundColor: "orange",
          },
          "& .MuiTab-root": {
            border: `1px solid ${theme.palette.divider}`,
            borderBottom: "none",
            borderRadius: "5px 5px 0 0",
            textTransform: "none",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: theme.palette.background.default,
              borderBottom: `1px solid ${theme.palette.background.default}`,
            },
          },
        }}
      >
       {labels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
      {children}
    </Box>
  );
};
GlCommonTab.defaultProps = {
  labels: ["CONNECTED/DISCONNECTED", "PENDING CONNECTION"],
};
export default GlCommonTab;