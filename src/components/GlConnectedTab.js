import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,Paper
} from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import logo from "../images/icon128x128.png";
import { useNavigate } from "react-router-dom";
import GLCustomersStatsGrid from "./GLCustomersStatsGrid";

const GlConnectedTab = ({
  value,
  index,
  GlCustomers,
  handleCreateNewCustomer,
  theme,
  isSmallScreen,
}) => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("grid");

  const handlecustomercard = () => {
    console.log(" clicked");
    navigate("/glmanagecustomer");
  };

  const toggleViewType = () => {
    setViewType(viewType === "grid" ? "list" : "grid");
  };

  if (value !== index) {
    return null;
  }

  const renderGridView = () => (
    <Grid container spacing={2}>
      {GlCustomers.map((customer, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card 
            onClick={handlecustomercard}
            sx={{
              height: "100%",
              borderRadius: "10px",
              cursor: "pointer",
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
                    variant="body2"
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
  );

  const renderListView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {GlCustomers.map((customer, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            borderRadius: '10px',
            transition: 'all 0.2s ease-out',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 0 0 3px #3f51b5' 
                : '0 0 0 3px #75d1ff',
            }
          }}
        >
          <ListItem 
            onClick={handlecustomercard}
            sx={{
              cursor: "pointer",
              padding: '16px',
              borderRadius: '10px',
              '& .MuiListItemText-primary': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              },
              '& .MuiListItemText-secondary': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }
            }}
          >
            <ListItemAvatar>
              <Avatar 
                sx={{ 
                  variant:"outlined",
                  width: 26, 
                  height: 26, 
                  marginRight: 2,
                  backgroundColor: 'gray',
                  opacity:"0.5"
                }}
              >
                <PersonOutline sx={{ color: '#fefefe' , width:"14px"}} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {customer.companyName}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      fontSize: '0.875rem' 
                    }}
                  >
                    Account ID: {customer.accountId}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "24px", height: "24px", marginRight: "8px" }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.text.secondary, 
                        fontSize: '0.875rem' 
                      }}
                    >
                      {customer.accountCount} Accounts | {customer.billingSettings}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'green', 
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {customer.status}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </Paper>
      ))}
    </Box>
  );

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '16px' 
      }}>
        <Box>
          {/* Placeholder for potential left-side content */}
        </Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2 
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewCustomer}
            sx={{
              height: '40px', // Match the IconButton height
            }}
          >
            Create New Customer
          </Button>
          <IconButton 
            onClick={toggleViewType}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {viewType === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
          </IconButton>
        </Box>
      </Box>

      <GLCustomersStatsGrid/>
      
      {viewType === 'grid' ? renderGridView() : renderListView()}
    </Box>
  );
};

export default GlConnectedTab;