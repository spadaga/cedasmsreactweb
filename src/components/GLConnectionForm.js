import React, { useState } from 'react';
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
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ConnectionForm = () => {
  const [connectionType, setConnectionType] = useState('Netsuite');
  const [netsuiteAccountId, setNetsuiteAccountId] = useState('12345');
  const [netsuiteAccessTokenId, setNetsuiteAccessTokenId] = useState('abcde');
  const [netsuiteAccessTokenSecret, setNetsuiteAccessTokenSecret] = useState('fghij');
  const [cedCustomScriptFileId, setCedCustomScriptFileId] = useState('klmno');
  const [documentsFolderId, setDocumentsFolderId] = useState('pqrst');
  const [isConnected, setIsConnected] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            borderRadius: 4,
            bgcolor: 'rgb(248, 250, 252)',
            padding: 2,
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center">
            {isConnected ? (
              <>
                <CheckCircleOutlineIcon sx={{ color: 'green', mr: 1 }} />
                <Typography variant="body1" sx={{ color: 'green' }}>
                  Connected
                </Typography>
              </>
            ) : (
              <>
                <HighlightOffIcon sx={{ color: 'red', mr: 1 }} />
                <Typography variant="body1" sx={{ color: 'red' }}>
                  Not Connected
                </Typography>
              </>
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
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Netsuite Access Token Secret"
                value={netsuiteAccessTokenSecret}
                onChange={(e) => setNetsuiteAccessTokenSecret(e.target.value)}
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
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Documents Folder ID"
                value={documentsFolderId}
                onChange={(e) => setDocumentsFolderId(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Tooltip title={tooltips.documentsFolderId}>
                      <IconButton>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                  readOnly: !isEditing && isConnected,
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