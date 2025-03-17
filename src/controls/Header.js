// Header.js

import React, { useState } from "react";
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
  Tooltip,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu,
  Notifications,
} from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";
import logo from "../logo/cedlogo.png";
import { useNavigate } from "react-router-dom";
import LeftMenu from "./LeftMenu"; // Import the LeftMenu component

import Logo from "../controls/Logo";

import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import cedlogo from "../controls/CedLogo";
import CedLogo from "../controls/CedLogo";
const Header = ({ title }) => {
  const { darkMode, toggleDarkMode, theme } = useThemeContext(); // Access theme from context
  console.log(theme); // Add this line
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotificationDrawer = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleLogoClick = () => {
    navigate("/glcustomers"); // Replace with the actual path to your Logo component
  };

  const notifications = [
    {
      header: "Notification 1",
      text: "This is the first line of notification 1.\nThis is the second line of notification 1.\nThis is the third line of notification 1.",
    },
    {
      header: "Notification 2",
      text: "This is the first line of notification 2.\nThis is the second line of notification 2.\nThis is the third line of notification 2.",
    },
    {
      header: "Notification 3",
      text: "This is the first line of notification 3.\nThis is the second line of notification 3.\nThis is the third line of notification 3.",
    },
    {
      header: "Notification 4",
      text: "This is the first line of notification 4.\nThis is the second line of notification 4.\nThis is the third line of notification 4.",
    },
    {
      header: "Notification 5",
      text: "This is the first line of notification 5.\nThis is the second line of notification 5.\nThis is the third line of notification 5.",
    },
  ];

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 30%, ${theme.palette.primary.light} 70%, ${theme.palette.primary.main} 100%)`,
        color: "white",
        padding: "16px",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={toggleMenu}
          color="inherit"
          sx={{ cursor: "pointer" }}
        >
          <Menu />
        </IconButton>
        {/* <Avatar src={logo} alt="Logo" sx={{ mr: 2, width: 100, height: 40, cursor: 'pointer' }} />
         */}

        <Box sx={{ width: "auto", height: "50px" }}>
          <CedLogo />
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Toggle Light/Dark Mode">
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{ cursor: "pointer" }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>

        <Tooltip title="View Notifications">
          <IconButton
            onClick={toggleNotificationDrawer}
            color="inherit"
            sx={{ cursor: "pointer" }}
          >
            <Notifications />
          </IconButton>
        </Tooltip>

        <Box
          sx={{ marginLeft: "16px", cursor: "pointer" }}
          onClick={handleLogoClick}
        >
          <Logo />
        </Box>
      </Box>

      <LeftMenu open={menuOpen} onClose={toggleMenu} />

      <Drawer
        anchor="right"
        open={notificationOpen}
        onClose={toggleNotificationDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            width: 320,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            borderBottom: "1px solid",
            borderColor: theme.palette.divider,
          }}
        >
          <ListItemIcon sx={{ marginRight: "8px" }}>
            <Notifications />
          </ListItemIcon>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Notifications
          </Typography>
        </Box>
        <List>
          {notifications.map((notification, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: "1px solid",
                borderColor: theme.palette.divider,
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
            padding: "16px",
            textAlign: "center",
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/notifications")}
          >
            More
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
