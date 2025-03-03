import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu,
  Dashboard,
  AccountCircle,
  Settings,
  Notifications,
} from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';
import logo from '../logo/cedlogo.png';
import { useNavigate } from 'react-router-dom';

const Header1 = ({ title }) => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotificationDrawer = () => {
    setNotificationOpen(!notificationOpen);
  };

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
        text: 'Notifications', // Add Notifications menu item
        icon: <Notifications />,
        onClick: () => navigate('/notifications'), // Redirect to Notifications page
      },
  ];
  const appVersion = '1.0.0';

  const notifications = [
    {
      header: 'Notification 1',
      text: 'This is the first line of notification 1.\nThis is the second line of notification 1.\nThis is the third line of notification 1.',
    },
    {
      header: 'Notification 2',
      text: 'This is the first line of notification 2.\nThis is the second line of notification 2.\nThis is the third line of notification 2.',
    },
    {
      header: 'Notification 3',
      text: 'This is the first line of notification 3.\nThis is the second line of notification 3.\nThis is the third line of notification 3.',
    },
    {
      header: 'Notification 4',
      text: 'This is the first line of notification 4.\nThis is the second line of notification 4.\nThis is the third line of notification 4.',
    },
    {
      header: 'Notification 5',
      text: 'This is the first line of notification 5.\nThis is the second line of notification 5.\nThis is the third line of notification 5.',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white',
        padding: '16px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={toggleMenu} color="inherit">
          <Menu />
        </IconButton>
        <Avatar src={logo} alt="Logo" sx={{ mr: 2, width: 100, height: 40 }} />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4">{title}</Typography>
      </Box>

      <IconButton onClick={toggleDarkMode} color="inherit">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      <IconButton onClick={toggleNotificationDrawer} color="inherit">
        <Notifications />
      </IconButton>

      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={toggleMenu}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary,
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
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <Avatar sx={{ width: 60, height: 60, marginBottom: '8px' }}>
            <AccountCircle sx={{ width: 40, height: 40 }} />
          </Avatar>
          <Typography variant="subtitle1">Deep Sir</Typography>
        </Box>

        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              button={true}
              key={item.text}
              onClick={item.onClick}
              sx={{
                borderBottom: '1px solid',
                borderColor: (theme) => theme.palette.divider,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ color: (theme) => theme.palette.text.primary }}>
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
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <Typography variant="caption">Version {appVersion}</Typography>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={notificationOpen}
        onClose={toggleNotificationDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary,
            width: 320, // Increase the width of the drawer
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center', // Align icon and text vertically
            justifyContent: 'center', // Center content horizontally
            padding: '16px',
            borderBottom: '1px solid',
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <ListItemIcon sx={{ marginRight: '8px' }}>
            <Notifications />
          </ListItemIcon>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Notifications
          </Typography>
        </Box>
        <List>
          {notifications.map((notification, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: '1px solid', // Add border bottom for each notification
                borderColor: (theme) => theme.palette.divider,
              }}
            >
              <ListItemText
                primary={notification.header}
                secondary={notification.text}
              />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            padding: '16px',
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <Button variant="contained" color="primary"  onClick={() => navigate('/notifications')} >
            More
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header1;