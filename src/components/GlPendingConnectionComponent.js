import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { 
  
  Search as SearchIcon, 
  MoreVert as MoreVertIcon, 
  GridView as GridViewIcon, 
  List as ListIcon ,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const NetSuiteIcon = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '26px',
      height: '26px',
      minWidth: '26px',
      minHeight: '26px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)',
      color: 'white',
      marginRight: '8px',
      fontWeight: 'bold',
      fontSize: '0.7em',
      flexShrink: 0,
    }}
  >
    NS
  </Box>
);

const StatusWithIcon = ({ status }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <CheckCircleIcon 
      color="success" 
      sx={{ fontSize: 18 }} 
    />
    <Typography variant="body2" color="success">
      {status}
    </Typography>
  </Box>
);

const GlPendingConnectionComponent = ({ connections }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConnections = connections.filter((connection) =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderGridView = () => (
    <Grid container spacing={2}>
      {filteredConnections.map((connection) => (
        <Grid item xs={12} sm={6} md={4} key={connection.id}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Grid 
                container 
                alignItems="center" 
                justifyContent="space-between" 
                sx={{ mb: 1 }}
              >
                <Grid 
                  item 
                  xs 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    overflow: 'hidden' 
                  }}
                >
                  <NetSuiteIcon />
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                      fontSize: '0.9em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flexGrow: 1,
                    }}
                  >
                    {connection.name}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton aria-label="settings" size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                {connection.products} Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last transmitted on {connection.lastTransmitted}
              </Typography>
              <StatusWithIcon status={connection.status} />
              {/* <Typography variant="body2" color="success">
                {connection.status}
              </Typography> */}
              <Box sx={{ flexGrow: 1 }} />
              <Divider sx={{ mb: 1, mt: 1 }} />
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Account ID: {connection.accountId}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                    View Details
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderListView = () => (
    <List>
      {filteredConnections.map((connection) => (
        <ListItem 
          key={connection.id} 
          divider
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <NetSuiteIcon />
            <ListItemText
              primary={connection.name}
              secondary={`${connection.products} Products | Last transmitted on ${connection.lastTransmitted}`}
              primaryTypographyProps={{
                variant: 'subtitle1',
                sx: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StatusWithIcon status={connection.status} />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mr: 2 }}
            >
              Account ID: {connection.accountId}
            </Typography>
            <IconButton aria-label="settings" size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <TextField
          label="Search Connections"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, mr: 2 }}
        />
        <Box>
          <IconButton 
            onClick={() => setViewMode('grid')} 
            color={viewMode === 'grid' ? 'primary' : 'default'}
          >
            <GridViewIcon />
          </IconButton>
          <IconButton 
            onClick={() => setViewMode('list')} 
            color={viewMode === 'list' ? 'primary' : 'default'}
          >
            <ListIcon />
          </IconButton>
        </Box>
      </Box>
      
      {viewMode === 'grid' ? renderGridView() : renderListView()}
    </Box>
  );
};

const exampleConnections = [
  {
    id: 1,
    name: 'NEWMAN OUTDOOR ADVERTISING',
    products: '166',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 2,
    name: 'ECOLOGY SOLAR',
    products: '333',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 3,
    name: 'WILSON ELECTRIC SERVICES CORP',
    products: '333',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 4,
    name: 'CREDIT CARD - CONTRACTOR CREDIT CARD - CONTRACTOR',
    products: '333',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 5,
    name: 'COURTESY ELECTRIC CO COURTESY ELECTRIC CO',
    products: '333',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 6,
    name: '3E ELECTRICAL CONTR',
    products: '333',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 7,
    name: 'A.W.B. LLC DBA PEAK ELEC',
    products: '333',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 8,
    name: 'AAA ELECTRICAL AAA ELECTRICAL AAA ELECTRICAL',
    products: '333',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 9,
    name: 'CITY OF THORNTON',
    products: '333',
    lastTransmitted: '12/20/2021',
    status: 'Connected',
    accountId: '59963',
  },
  {
    id: 10,
    name: 'GLOBAL LOGISTICS INC',
    products: '250',
    lastTransmitted: '12/18/2021',
    status: 'Connected',
    accountId: '59964',
  },
  {
    id: 11,
    name: 'SUNRISE MARKETING SOLUTIONS',
    products: '180',
    lastTransmitted: '12/19/2021',
    status: 'Connected',
    accountId: '59965',
  },
  {
    id: 12,
    name: 'PRECISION ENGINEERING LTD',
    products: '400',
    lastTransmitted: '12/21/2021',
    status: 'Connected',
    accountId: '59966',
  },
  {
    id: 13,
    name: 'RIVERVIEW RESTAURANT GROUP',
    products: '120',
    lastTransmitted: '12/22/2021',
    status: 'Connected',
    accountId: '59967',
  },
  {
    id: 14,
    name: 'PACIFIC COAST IMPORTS',
    products: '300',
    lastTransmitted: '12/23/2021',
    status: 'Connected',
    accountId: '59968',
  },
  {
    id: 15,
    name: 'MOUNTAIN VIEW TECHNOLOGIES',
    products: '220',
    lastTransmitted: '12/24/2021',
    status: 'Connected',
    accountId: '59969',
  },
  {
    id: 16,
    name: 'LAKE CITY CONSTRUCTION',
    products: '280',
    lastTransmitted: '12/25/2021',
    status: 'Connected',
    accountId: '59970',
  },
  {
    id: 17,
    name: 'VALLEY WIDE DISTRIBUTORS',
    products: '350',
    lastTransmitted: '12/26/2021',
    status: 'Connected',
    accountId: '59971',
  },
  {
    id: 18,
    name: 'DESERT ROSE BEAUTY SALON',
    products: '150',
    lastTransmitted: '12/27/2021',
    status: 'Connected',
    accountId: '59972',
  },
  {
    id: 19,
    name: 'OCEAN BREEZE TRAVEL AGENCY',
    products: '190',
    lastTransmitted: '12/28/2021',
    status: 'Connected',
    accountId: '59973',
  },
  {
    id: 20,
    name: 'FOREST HILLS LANDSCAPING',
    products: '270',
    lastTransmitted: '12/29/2021',
    status: 'Connected',
    accountId: '59974',
  },
];

const GlPendingConnectionComponentWrapper = () => {
  return <GlPendingConnectionComponent connections={exampleConnections} />;
};

export default GlPendingConnectionComponentWrapper;