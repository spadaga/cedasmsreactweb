import React, { useMemo } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LinkIcon from '@mui/icons-material/Link';
import { useTheme } from "@mui/material/styles";

const GLCustomersStatsGrid = () => {
  const theme = useTheme();

  const stats = useMemo(() => [
    { label: 'Total Companies', value: '24', icon: <BusinessIcon />, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0f7fa' },
    { label: 'Active Accounts', value: '101', icon: <PeopleIcon />, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e8f5e9' },
    { label: 'Pending Settings', value: '12', icon: <SettingsIcon />, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fffde7' },
    { label: 'Connected', value: '89', icon: <LinkIcon />, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f3e5f5' },
  ], [theme.palette.mode]);

  return (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              textAlign: 'center',
              backgroundColor: stat.backgroundColor,
              borderRadius: '8px',
              position: 'relative',
              height: '120px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.1,
                color: 'grey',
                fontSize: '6em',
              }}
            >
              {React.cloneElement(stat.icon, { style: { fontSize: 'inherit' } })}
            </Box>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>{stat.label}</Typography>
              <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default GLCustomersStatsGrid;