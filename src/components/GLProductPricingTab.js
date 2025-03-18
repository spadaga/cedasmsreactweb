import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  Pagination,
  Box,
  Typography,
} from '@mui/material';

// Assuming your JSON data is in a file named data.json
import data from '../data/productpricing.json';

const GLPricingTable  = ({ value, index }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);

  if (value !== index) {
    return null; // Don't render if the tab is not active
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Box display="flex" alignItems="center">
          <Button variant="contained" sx={{ mr: 1, bgcolor: '#1976d2' }}>
            + ADD PRICING ACCOUNT
          </Button>
          <Button variant="outlined" sx={{ mr: 1 }}>
            REFRESH ALL PRICE
          </Button>
          <Button variant="outlined" sx={{ mr: 1 }}>
            EDIT
          </Button>
          <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} size="small">
            <MenuItem value={10}>Show 10 entries</MenuItem>
            <MenuItem value={25}>Show 25 entries</MenuItem>
            <MenuItem value={50}>Show 50 entries</MenuItem>
          </Select>
        </Box>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-label="pricing table">
          <TableHead>
            <TableRow>
              <TableCell>PC/ACCOUNT</TableCell>
              <TableCell>CEDNET PRODUCT NAME</TableCell>
              <TableCell align="right">PRICE(S)</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((row) => (
              <TableRow key={`${row.location}-${row.product}`}>
                <TableCell>
                  <Typography variant="body2">{row.location}</Typography>
                  <Typography variant="caption">{row.customer}</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    defaultValue={row.product}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none',
                        },
                      },
                    }}
                  />
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>
                  <Button size="small" sx={{ color: 'red' }}>
                    DELETE
                  </Button>
                  <Button size="small">REFRESH</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </Typography>
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Paper>
  );
};

export default GLPricingTable;