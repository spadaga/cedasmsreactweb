import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';

const GLCustomersStatsGrid = () => {
  const stats = [
    { label: 'Total Companies', value: '24' },
    { label: 'Active Accounts', value: '101' },
    { label: 'Pending Settings', value: '12' },
    { label: 'Connected', value: '89' },
  ];

  return (
    <Grid container spacing={2} sx={{marginBottom:2}}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {stat.label}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default GLCustomersStatsGrid;