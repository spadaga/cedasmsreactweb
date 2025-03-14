import React, { useState, useEffect } from "react";
import MasterLayout from "../Layout/MasterLayout";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme, // Import useTheme
} from "@mui/material";

import { getglAllCustomers } from "../services/api";
import { useThemeContext } from "../context/ThemeContext";
import { showToast } from "../utils/toastUtils";
import logo from "../images/icon128x128.png";
import PersonOutline from "@mui/icons-material/PersonOutline";
import { useNavigate } from 'react-router-dom';
import Loading from "../utils/Loading";


const Glcustomers = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [GlCustomers, setGlCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useThemeContext();
  const theme = useTheme(); // Use useTheme hook

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchGlCustomers();
  }, []);

  const fetchGlCustomers = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await getglAllCustomers();
      setGlCustomers(response.data);
    } catch (error) {
      showToast("error", "Error fetching GlCustomers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewCustomer = () => {
    navigate('/glnewcustomers');
  };

  const ConnectedDisconnectedContent = () => (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateNewCustomer}
        sx={{ position: 'absolute', top: '-60px', right: 0 }}
      >
        Create New Customer
      </Button>
      <Grid container spacing={2}>
        {GlCustomers.map((customer, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "10px",
                boxShadow: theme.palette.mode === 'dark' ? "0px 0px 1px 0px rgba(255, 255, 255, 0.3)" : "0px 0px 1px 0px rgba(0, 0, 0, 0.3)", // Use theme mode for boxShadow
                border: `1px solid ${theme.palette.divider}`, // Use theme divider
                borderLeft: `4px solid ${theme.palette.divider}`, // Use theme divider
                paddingLeft: "8px",
                borderBottom: `4px solid ${theme.palette.divider}`, // Use theme divider
                backgroundColor: theme.palette.background.paper, // Use theme background
                "&:hover": {
                  transition: "all .2s ease-out",
                  boxShadow: theme.palette.mode === 'dark' ? "0 0 0 3px #3f51b5" : "0 0 0 3px #75d1ff", // Use theme mode for boxShadow
                  top: "initial",
                  border: `1px solid ${theme.palette.divider}`, // Use theme divider
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : "#fff", // Use theme mode for backgroundColor
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
                      color: theme.palette.text.secondary, // Use theme text color
                      opacity: 0.5,
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "0.775rem",
                        color: theme.palette.text.primary, // Use theme text color
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
                        color: theme.palette.text.secondary, // Use theme text color
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
                    borderTop: `1px solid ${theme.palette.divider}`, // Use theme divider
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
                      sx={{ fontSize: "0.875rem", color: theme.palette.text.secondary }} // Use theme text color
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

  const PendingConnectionContent = () => (
    <Typography>Pending Connection Content</Typography>
  );

  return (
    <MasterLayout title={"GL CUSTOMERS"}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="gl customers tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "orange",
            },
            "& .MuiTab-root": {
              border: `1px solid ${theme.palette.divider}`, // Use theme divider
              borderBottom: "none",
              borderRadius: "5px 5px 0 0",
              textTransform: "none",
              fontWeight: "bold",
              "&.Mui-selected": {
                backgroundColor: theme.palette.background.default, // Use theme background
                borderBottom: `1px solid ${theme.palette.background.default}`, // Use theme background
              },
            },
          }}
        >
          <Tab label="CONNECTED/DISCONNECTED" />
          <Tab label="PENDING CONNECTION" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {ConnectedDisconnectedContent()}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {PendingConnectionContent()}
        </TabPanel>
      </Box>
      <Loading isLoading={isLoading} /> {/* Include the Loading component */}
    </MasterLayout>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme(); // Use useTheme hook

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`gl-customers-tabpanel-${index}`}
      aria-labelledby={`gl-customers-tab-${index}`}
      {...other}
    >
      {value === index && (
         <Box sx={{ p: 3, backgroundColor: theme.palette.background.paper }}> {/* Use theme background */}
         <Typography>{children}</Typography>
       </Box>
     )}
   </div>
 );
}

export default Glcustomers;