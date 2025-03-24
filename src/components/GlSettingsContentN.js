import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  useTheme,
} from '@mui/material';
import {
  PeopleOutlined,
  LinkOutlined as LinkIcon,
  SettingsOutlined,
  NotificationsNoneOutlined,
  UploadFileOutlined as Upload,
  SearchOutlined,
  AccessTimeOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  Inventory2,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DashboardCard = ({ icon: Icon, title, subtitle, extraContent, chip, action,onClick  }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
        height: '100px',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        transition: 'transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out', // Added transition
        transform: isHovered ? 'scale(1.03)' : 'scale(1)', // Added scale effect on hover
        boxShadow: isHovered ? theme.shadows[5] : theme.shadows[1], // Added shadow effect on hover
        cursor: 'pointer', // Added cursor style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Add onClick handler
    >
      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#f0f8ff',
          border: `1px solid ${theme.palette.divider}`,
          width: 30,
          height: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon sx={{ color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main, fontSize: 20, flexShrink: 0 }} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1" fontWeight="medium" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {subtitle}
        </Typography>
        {extraContent && (
          <Typography variant="caption" color="text.secondary" display="block" noWrap>
            {extraContent}
          </Typography>
        )}
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        {chip && (
          <Chip
            label={chip.label}
            color={chip.color}
            size="small"
            sx={{ borderRadius: 1 }}
          />
        )}
        {action}
      </Box>
    </Paper>
  );
};

function Dashboard() {
  const theme = useTheme();

  const navigate = useNavigate(); // Initialize useNavigate

  const handleCednetCustomersClick = () => {
    navigate('/glcednetcustomers'); // Navigate to the GLcednetcustomers route
  };

  const handleProductoperationsClick = () => {
    navigate('/glproductupload'); // Navigate to the GLcednetcustomers route
  };

  const handleconnectiosClick = () => {
    navigate('/glconnections'); // Navigate to the GLcednetcustomers route
  };
  

  const handlecreditsmemosettingClick = () => {
    navigate('/glmemosetting'); // Navigate to the GLcednetcustomers route
  };

  const handlapsettingsClick = () => {
    navigate('/glacpayset'); // Navigate to the GLcednetcustomers route
  };

  const handleNotificationClick = () => {
    navigate('/glnotification'); // Navigate to the GLcednetcustomers route
  };

  const handleUploadProductsClick = () => {
    navigate('/glproductdb'); // Navigate to the GLcednetcustomers route
  };


  
  const handleSearchProductsClick = () => {
    navigate('/glproductsearch'); // Navigate to the GLcednetcustomers route
  };
  const handleProductcatalogClick = () => {
    navigate('/glproductdb '); // Navigate to the GLcednetcustomers route
  };


  const handleTransactionhistoryClick = () => {
    navigate('/gltranshistory '); // Navigate to the GLcednetcustomers route
  };


  const handlePOClick = () => {
    navigate('/glpo '); // Navigate to the GLcednetcustomers route
  };



  

  
//gluploadproducts

  
  //glnotification
  


  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          {/* ... (rest of your Dashboard component remains the same) */}
          {/* System Settings */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              System Settings
            </Typography>
            <DashboardCard
              icon={PeopleOutlined}
              title="CEDNET Customers"
              subtitle="8 Active Accounts"
              onClick={handleCednetCustomersClick} // Add onClick handler
            />
            <DashboardCard
              icon={LinkIcon}
              title="Connections"
              subtitle="NetSuite - 1 Connection"
              chip={{ label: 'Active', color: 'success' }}
              onClick={handleconnectiosClick} // Add onClick handler
            />
            <DashboardCard
              icon={SettingsOutlined}
              title="Bill/Credit Settings"
              subtitle="Automatic - Item Level"
              onClick={handlecreditsmemosettingClick} // Add onClick handler
            />
            <DashboardCard
              icon={SettingsOutlined}
              title="A/P Settings"
              subtitle="⚠️ Requires Connection"
              onClick={handlapsettingsClick} // Add onClick handler
            />
            <DashboardCard
              icon={NotificationsNoneOutlined}
              title="Notification Settings"
              subtitle="4 Active Settings"
              onClick={handleNotificationClick} // Add onClick handler
            />
          </Grid>

          {/* Product Operations */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Product Operations
            </Typography>

            <DashboardCard
              icon={Inventory2}
              title="Product Catalog"
              subtitle="166 Products"
              onClick={handleProductcatalogClick} // Add onClick handler
             
            />

            <DashboardCard
              icon={Upload}
              title="Upload Products Excel"
              subtitle="16 Recent Uploads"
              onClick={handleProductoperationsClick} // Add onClick handler
              action={
                <Button variant="contained" size="small">
                  Upload
                </Button>
              }
            />
            <DashboardCard
              icon={SearchOutlined}
              title="Search Products"
              subtitle="Add to Catalog"
              onClick={handleSearchProductsClick} // Add onClick handler
              
            />
            <DashboardCard
              icon={AccessTimeOutlined}
              title="Transmit History"
              subtitle="100 Records"
              extraContent="Last Transmitted on 12/20/2021"

           onClick={handleTransactionhistoryClick}   
            />
          </Grid>

          {/* Transaction Center */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Transaction Center
            </Typography>
            <DashboardCard
              icon={CreditCardOutlined}
              title="Customer Bills"
              subtitle="100 Records"
              extraContent="Last Transmitted on 12/20/2021"
            />
            <DashboardCard
              icon={CreditCardOutlined}
              title="Customer Credits"
              subtitle="100 Records"
              extraContent="Last Transmitted on 12/20/2021"
            />
            <DashboardCard
              icon={ShoppingCartOutlined}
              title="Purchase Orders"
              subtitle="166 Orders"
              extraContent="Last Received on 01/01/2024"
              onClick={handlePOClick}   
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;