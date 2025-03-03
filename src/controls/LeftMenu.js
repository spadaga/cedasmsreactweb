// LeftMenu.js

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  AccountCircle,
  Settings,
  Notifications,
  People, Build, // Import the new icon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

const LeftMenu = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { theme } = useThemeContext(); // Access theme from context

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      onClick: () => navigate('/'),
    },
    {
      text: 'Profile',
      icon: <AccountCircle />,
      onClick: () => navigate('/add'),
    },
    {
      text: 'Settings',
      icon: <Settings />,
      onClick: () => console.log('Settings clicked'),
    },
    {
      text: 'Notifications',
      icon: <Notifications />,
      onClick: () => navigate('/notifications'),
    },
    { // Add AMS Users menu item
        text: 'AMS Users',
        icon: <People />,
        onClick: () => navigate('/amsusers'), // Navigate to AMS Users component
      },

      { // Add AMS Users menu item
        text: 'Tool Data',
        icon: <Build  />,
        onClick: () => navigate('/tooldata'), // Navigate to AMS Users component
      },
  ];
  const appVersion = '1.0.0';

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          background: `linear-gradient(to bottom, ${theme.palette.primary.dark} 0%, ${theme.palette.background.paper} 60%, ${theme.palette.background.default} 100%)`,
          color: theme.palette.text.primary,
          width: 240,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
        }}
      >
        <Avatar sx={{ width: 60, height: 60, marginBottom: '8px' , cursor: 'pointer'}}>
          <AccountCircle sx={{ width: 40, height: 40 }} />
        </Avatar>
        <Typography variant="subtitle1">Shahul Karthik Chandra</Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button={true}
            key={item.text}
            onClick={item.onClick}
            sx={{
              borderBottom: '1px solid',
              borderColor: theme.palette.divider,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              cursor: 'pointer', // 👈 Add hand cursor
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.text.primary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          padding: '16px',
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: theme.palette.divider,
        }}
      >
        <Typography variant="caption">Version {appVersion}</Typography>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;