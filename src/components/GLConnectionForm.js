import React, { useState, useMemo } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Grid,
  Button,
  Typography,
  Box,
  Chip,
  useTheme,
  Paper,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LinkIcon from '@mui/icons-material/Link';

const ConnectionForm = () => {
  const [connectionType, setConnectionType] = useState('Netsuite');
  const [netsuiteAccountId, setNetsuiteAccountId] = useState('12345');
  const [netsuiteAccessTokenId, setNetsuiteAccessTokenId] = useState('abcde');
  const [netsuiteAccessTokenSecret, setNetsuiteAccessTokenSecret] = useState('fghij');
  const [cedCustomScriptFileId, setCedCustomScriptFileId] = useState('klmno');
  const [documentsFolderId, setDocumentsFolderId] = useState('pqrst');
  const [isConnected, setIsConnected] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();

  const [approvedPOSavedSearchId, setApprovedPOSavedSearchId] = useState('');
  const [exportFrequency, setExportFrequency] = useState('');
  const [cedAcknowledgementNumber, setCedAcknowledgementNumber] = useState('');
  const [cedReceivedDate, setCedReceivedDate] = useState('');
  const [sendToCedDetails, setSendToCedDetails] = useState('');

  const handleConnectionTypeChange = (event) => {
    setConnectionType(event.target.value);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsEditing(true);
  };

  const handleChangeConnection = () => {
    setIsConnected(false);
    setIsEditing(true);
  };

  const handleConnect = () => {
    setIsConnected(true);
    setIsEditing(false);
  };

  const handleSaveConnection = () => {
    setIsConnected(true);
    setIsEditing(false);
  };

  const tooltips = {
    netsuiteAccountId: 'Enter your Netsuite Account ID.',
    netsuiteAccessTokenId: 'Enter your Netsuite Access Token ID.',
    netsuiteAccessTokenSecret: 'Enter your Netsuite Access Token Secret.',
    cedCustomScriptFileId: 'Enter the CED Custom Script File ID.',
    documentsFolderId: 'Enter the Documents Folder ID.',
    approvedPOSavedSearchId: 'Enter Approved PO Saved Search ID.',
    exportFrequency: 'Select Export Frequency.',
    cedAcknowledgementNumber: 'Enter CED Acknowledgement Number.',
    cedReceivedDate: 'Enter CED Received Date.',
    sendToCedDetails: 'Enter Send to CED Details.',
  };

  const ConnectionStatusIndicator = ({ isConnected = true, size = 'medium' }) => {
    return (
      <Chip
        icon={isConnected ? <CheckCircleIcon /> : <CancelIcon />}
        label={isConnected ? 'Connected' : 'Disconnected'}
        color={isConnected ? 'success' : 'error'}
        variant="outlined"
        size={size}
        sx={{
          borderRadius: '16px',
          fontWeight: 500,
          '& .MuiChip-icon': {
            color: isConnected ? '#10b981' : 'error.main',
          },
          backgroundColor: isConnected ? '#ecfdf5' : '#fef2f2',
          opacity: 0.8,
          '& .MuiChip-label': {
            px: 1,
          },
        }}
      />
    );
  };

  const stats = useMemo(() => [
    { label: 'Total Companies', value: '24', icon: <BusinessIcon />, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0f7fa' },
    { label: 'Active Accounts', value: '101', icon: <PeopleIcon />, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e8f5e9' },
    { label: 'Pending Settings', value: '12', icon: <SettingsIcon />, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fffde7' },
    { label: 'Connected', value: '89', icon: <LinkIcon />, backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f3e5f5' },
  ], [theme.palette.mode]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            borderRadius: 4,
            bgcolor: theme.palette.background.paper,
            padding: 2,
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center">
            {isConnected ? (
              <Box>
                <ConnectionStatusIndicator isConnected={true} size="small" />
              </Box>
            ) : (
              <Box>
                <ConnectionStatusIndicator isConnected={false} size="small" />
              </Box>
            )}
          </Box>
          {isConnected ? (
            <Box>
              <Button
                variant="outlined"
                onClick={handleDisconnect}
                sx={{ mr: 1, borderColor: 'red', color: 'red' }}
              >
                Disconnect
              </Button>
              <Button variant="contained" onClick={handleChangeConnection}>
                Change Connection
              </Button>
            </Box>
          ) : (
            <Box>
              <Button variant="contained" onClick={handleConnect} sx={{ mr: 1 }}>
                Connect
              </Button>
              <Button variant="contained" onClick={handleSaveConnection}>
                Save Connection
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
      <Box sx={{ width: '100%', p: 4 }}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="connection-type-label">Connection Type</InputLabel>
            <Select
              labelId="connection-type-label"
              id="connection-type"
              value={connectionType}
              label="Connection Type"
              onChange={handleConnectionTypeChange}
              disabled={!isEditing && isConnected}
            >
              <MenuItem value="Netsuite">Netsuite</MenuItem>
              <MenuItem value="QBO">QBO</MenuItem>
              <MenuItem value="QBD">QBD</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {connectionType === 'Netsuite' && (
          <>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Netsuite Account Id"
                value={netsuiteAccountId}
                onChange={(e) => setNetsuiteAccountId(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Tooltip title={tooltips.netsuiteAccountId}>
                      <IconButton>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                  readOnly: !isEditing && isConnected,
                }}
                sx={{
                  backgroundColor: !isEditing && isConnected ? theme.palette.action.disabledBackground : 'transparent',
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Netsuite Access Token Id"
                value={netsuiteAccessTokenId}
                onChange={(e) => setNetsuiteAccessTokenId(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Tooltip title={tooltips.netsuiteAccessTokenId}>
                      <IconButton>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                  readOnly: !isEditing && isConnected,
                }}
                sx={{
                  backgroundColor: !isEditing && isConnected ? theme.palette.action.disabledBackground : 'transparent',
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Netsuite Access Token Secret"
                value={netsuiteAccessTokenSecret } onChange={(e) => setNetsuiteAccessTokenSecret(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Tooltip title={tooltips.netsuiteAccessTokenSecret}>
                      <IconButton>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                  readOnly: !isEditing && isConnected,
                }}
                sx={{
                  backgroundColor: !isEditing && isConnected ? theme.palette.action.disabledBackground : 'transparent',
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="CED Custom Script File ID"
                value={cedCustomScriptFileId}
                onChange={(e) => setCedCustomScriptFileId(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Tooltip title={tooltips.cedCustomScriptFileId}>
                      <IconButton>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                  readOnly: !isEditing && isConnected,
                }}
                sx={{
                  backgroundColor: !isEditing && isConnected ? theme.palette.action.disabledBackground : 'transparent',
                }}
              />
            </Grid>
           
          </>
        )}
      </Box>

      
    </Grid>
  );
};

export default ConnectionForm;