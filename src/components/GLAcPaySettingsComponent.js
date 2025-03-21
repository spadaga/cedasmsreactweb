import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Alert,
  InputAdornment,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const GLAcPaySettingsComponent = ({ isEditing: propIsEditing, setIsEditing: propSetIsEditing }) => {
    const theme = useTheme();

  const initialData = [
    { id: 1, pc: '0010 -YALE - NEWARK', vendorName: 'CED-0010', accountName: 'CED-0010' },
    { id: 2, pc: '0051 -KANSAS-OMAHA CED', vendorName: 'CED-0051', accountName: 'CED-0051' },
    { id: 3, pc: '0130 -ALBERTVILLE - APE', vendorName: 'CED-0130', accountName: 'CED-0130' },
    { id: 4, pc: '0236 -AUSTIN - CED GREENT', vendorName: 'CED-0236', accountName: 'CED-0236' },
    { id: 5, pc: '0468 -BEAUMONT TX - CED', vendorName: 'CED-0468', accountName: 'CED-0468' },
    { id: 6, pc: '0585 -BELLINGHAM - CED', vendorName: 'CED-0585', accountName: 'CED-0585' },
    { id: 7, pc: '0731 -CHEVERLY - CED', vendorName: 'CED-0731', accountName: 'CED-0731' },
    { id: 8, pc: '0236 -AUSTIN - CED GREENT', vendorName: 'CED-0236', accountName: 'CED-0236' },
    { id: 9, pc: '0468 -BEAUMONT TX - CED', vendorName: 'CED-0468', accountName: 'CED-0468' },
    { id: 10, pc: '0585 -BELLINGHAM - CED', vendorName: 'CED-0585', accountName: 'CED-0585' },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([...initialData]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([...initialData]);

  useEffect(() => {
    setIsEditing(propIsEditing);
  }, [propIsEditing]);

  const handleSaveClick = () => {
    setTableData([...editedData]);
    propSetIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedData([...tableData]);
    propSetIsEditing(false);
  };


  const handleInputChange = (id, field, value) => {
    const updatedData = editedData.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setEditedData(updatedData);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = editedData.filter(
      (row) =>
        row.pc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.accountName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, editedData]);

  const isDuplicateRow = (pc, index) => {
    return tableData.findIndex((row) => row.pc === pc) !== index;
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'Roboto, Arial, sans-serif' }}>
      <Paper sx={{ overflow: 'hidden', margin: '20px 0' }}>
        
        {isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px 24px', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Button variant="outlined" onClick={handleCancelClick}>
                CANCEL
              </Button>
              <Button variant="contained" onClick={handleSaveClick}>
                SAVE
              </Button>
            </Box>
          </Box>
        )}

        <Box sx={{ padding: '16px 24px' }}>
          <Alert severity="error" sx={{ marginBottom: '16px' }}>
            GL vendor name and GL account name should exactly match with your GL system settings.
          </Alert>

          <TextField
            fullWidth
            placeholder="Search by PC, vendor name, or account name..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: '20px' }}
          />

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ border: `1px solid ${theme.palette.divider}` }}> {/* Table border */}
              <TableHead sx={{ backgroundColor: theme.palette.action.hover }}> {/* Header background */}
                <TableRow>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>PC</TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>GL VENDOR NAME</TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>GL ACCOUNT NAME</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      ...(isDuplicateRow(row.pc, index) && { backgroundColor: 'rgba(255, 235, 238, 0.2)' }),
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                    }}
                  >
                    <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>{row.pc}</TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                      <TextField
                        fullWidth
                        value={row.vendorName}
                        readOnly={!isEditing}
                        onChange={(e) => handleInputChange(row.id, 'vendorName', e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: isEditing ? theme.palette.primary.main : theme.palette.divider,
                            },
                          },
                          backgroundColor: !isEditing ? theme.palette.action.disabledBackground : 'inherit',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                      <TextField
                        fullWidth
                        value={row.accountName}
                        readOnly={!isEditing}
                        onChange={(e) => handleInputChange(row.id, 'accountName', e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: isEditing ? theme.palette.primary.main : theme.palette.divider,
                            },
                          },
                          backgroundColor: !isEditing ? theme.palette.action.disabledBackground : 'inherit',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default GLAcPaySettingsComponent;