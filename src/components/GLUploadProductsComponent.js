import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const GLUploadProductsComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchTerm, setSearchTerm] = useState('');

  const tableData = [
    {
      fileName: 'products-04752.xlsx',
      pc: '0007 - Yale - West Chester',
      createdOn: '08/01/2021 10:08 am',
      status: 'Failed',
    },
    {
      fileName: 'products-dallas.xlsx',
      pc: '0050 - kansas city - omaha ced',
      createdOn: '08/01/2021 08:08 pm',
      status: 'Failed',
    },
    {
      fileName: 'products-denver-ced.xlsx',
      pc: '1872 COD - BRYAN MCCORMICK',
      createdOn: '09/30/2021 11:08 am',
      status: 'Success',
    },
    {
      fileName: 'products-denver.xlsx',
      pc: '0148 - Albuquerque CED Greentech',
      createdOn: '07/11/2021 06:08 am',
      status: 'Success',
    },
    {
      fileName: 'products-kensas.xlsx',
      pc: '1872 - COD CRAIG GALLOGLY',
      createdOn: '11/12/2021 07:45 pm',
      status: 'Success',
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUploadClick = () => {
    // Implement your upload logic here
    console.log('Upload clicked');
  };

  const StatusCell = styled(TableCell)(({ status }) => ({
    color: status === 'Success' ? theme.palette.success.main : theme.palette.error.main,
    fontWeight: 'bold',
  }));

  return (
    <Box sx={{ padding: isMobile ? 2 : 4, maxWidth: '100%', margin: 'auto' }}>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems="center" gap={2} mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search PC"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{ flexGrow: 1 }}
        />
        <TextField variant="outlined" placeholder="Upload Product excel" sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={handleUploadClick}
          sx={{ whiteSpace: 'nowrap' }}
        >
          UPLOAD
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Product catalog Template.xls
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell>FILE NAME</TableCell>
              <TableCell>PC</TableCell>
              <TableCell>CREATED ON</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>{row.fileName}</TableCell>
                <TableCell>{row.pc}</TableCell>
                <TableCell>{row.createdOn}</TableCell>
                <StatusCell status={row.status}>{row.status}</StatusCell>
                <TableCell>
                  <Tooltip title="Copy">
                    <IconButton size="small">
                      <FileCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GLUploadProductsComponent;