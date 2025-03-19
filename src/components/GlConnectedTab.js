// GlConnectedTab.js
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  
} from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline";
import logo from "../images/icon128x128.png";
import { useNavigate } from "react-router-dom";

const GlConnectedTab = ({
  value,
  index,
  GlCustomers,
  handleCreateNewCustomer,
  theme,
  isSmallScreen,
})  => {

const navigate = useNavigate();

const handlecustomercard = () => {
  console.log(" clicked")

  navigate("/glmanagecustomer");
 
}


  if (value !== index) {
    return null;
  }
  
  




  return (
    <Box sx={{ position: "relative" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateNewCustomer}
        sx={{
          position: isSmallScreen ? "static" : "absolute",
          top: isSmallScreen ? "auto" : "-60px",
          right: 0,
          marginBottom: isSmallScreen ? "16px" : "0",
        }}
      >
        Create New Customer
      </Button>
      <Grid container spacing={2}>
        {GlCustomers.map((customer, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {/* Card Content... (same as your original GLCustomerTabContent) */}
            <Card 
             onClick={handlecustomercard}
              sx={{
                height: "100%",
                borderRadius: "10px",
                cursor:"pointer",
               
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0px 0px 1px 0px rgba(255, 255, 255, 0.3)"
                    : "0px 0px 1px 0px rgba(0, 0, 0, 0.3)",
                border: `1px solid ${theme.palette.divider}`,
                borderLeft: `4px solid ${theme.palette.divider}`,
                paddingLeft: "8px",
                borderBottom: `4px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                "&:hover": {
                  transition: "all .2s ease-out",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 0 3px #3f51b5"
                      : "0 0 0 3px #75d1ff",
                  top: "initial",
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : "#fff",
                },
              }}
            >
              <CardContent
               onClick ={handlecustomercard}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  position: "relative",
                  padding: "12px",
                  "&:last-child": {
                    paddingBottom: "12px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <PersonOutline
                    sx={{
                      width: "32px",
                      height: "32px",
                      marginRight: "8px",
                      color: theme.palette.text.secondary,
                      opacity: 0.5,
                    }}
                  />
                  {/* ... rest of the card content */}
                  <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "0.775rem",
                        color: theme.palette.text.primary,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "99%",
                        display: "block",
                      }}
                      title={customer.companyName}
                    >
                      {customer.companyName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.875rem",
                        color: theme.palette.text.secondary,
                        marginBottom: "8px",
                      }}
                    >
                      {customer.accountCount} Accounts
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.675rem",
                        color: "orange",
                        marginBottom: "4px",
                      }}
                    >
                      {customer.billingSettings}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "auto",
                    borderTop: `1px solid ${theme.palette.divider}`,
                    padding: "4px 8px",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "24px", height: "24px", marginRight: "8px" }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="body// GlConnectedTab.js (continued)
                      2"
                      fontWeight="400"
                      sx={{ fontSize: "0.875rem", color: "green" }}
                    >
                      {customer.status}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.875rem", color: theme.palette.text.secondary }}
                    >
                      Account ID: {customer.accountId}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GlConnectedTab;