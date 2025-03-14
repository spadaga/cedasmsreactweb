// src/components/NotificationsPage.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,Container
} from '@mui/material';
import Header from '../controls/Header';
import Footer from '../controls/Footer';
import Loading from '../utils/Loading';
import MasterLayout from '../Layout/MasterLayout';

const NotificationsPage = () => {
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState([
    {
      header: 'Notification 1',
      text: 'This is the first line of notification 1.',
      dateTime: new Date('2023-10-26T10:00:00'),
    },
    {
      header: 'Notification 2',
      text: 'This is the first line of notification 2.',
      dateTime: new Date('2023-10-26T11:30:00'),
    },
    {
      header: 'Notification 3',
      text: 'This is the first line of notification 3.',
      dateTime: new Date('2023-10-26T12:45:00'),
    },
    {
      header: 'Notification 4',
      text: 'This is the first line of notification 4.',
      dateTime: new Date('2023-10-26T14:15:00'),
    },
    {
      header: 'Notification 5',
      text: 'This is the first line of notification 5.',
      dateTime: new Date('2023-10-26T15:30:00'),
    },
    {
      header: 'Notification 6',
      text: 'This is the first line of notification 6.',
      dateTime: new Date('2023-10-26T16:45:00'),
    },
    {
      header: 'Notification 7',
      text: 'This is the first line of notification 7.',
      dateTime: new Date('2023-10-26T17:00:00'),
    },
    {
      header: 'Notification 8',
      text: 'This is the first line of notification 8.',
      dateTime: new Date('2023-10-26T18:15:00'),
    },
    {
      header: 'Notification 9',
      text: 'This is the first line of notification 9.',
      dateTime: new Date('2023-10-26T19:30:00'),
    },
    {
      header: 'Notification 10',
      text: 'This is the first line of notification 10.',
      dateTime: new Date('2023-10-26T20:45:00'),
    },
  ]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.header.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MasterLayout title="NOTIFICATIONS">
    <Box sx={{ padding: '16px' }}>
      
      <TextField
        label="Search Notifications"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />
      <Paper sx={{ maxHeight: '400px', overflowY: 'auto', marginTop: '16px' }}>
        <List>
          {filteredNotifications.map((notification, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={notification.header}
                secondary={`${notification.text} - ${notification.dateTime.toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>

   
    </MasterLayout>
  );
};

export default NotificationsPage;