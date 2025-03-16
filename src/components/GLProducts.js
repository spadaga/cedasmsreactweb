// GLProducts.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Pagination,
  InputAdornment,
  Chip,
  useTheme,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import glProductsData from '../data/glproducts.json'; // Import your JSON data

const GLProducts = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(glProductsData);

  useEffect(() => {
    const filtered = glProductsData.filter((product) =>
      product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setPage(1); // Reset page when search term changes
  }, [searchTerm]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getStatusChip = (status) => {
    if (status === 'Transmitted') {
      return <Chip label="Transmitted" color="primary" size="small" />;
    } else if (status === 'In transit ') {
      return <Chip label="In Transit" color="warning" size="small" />;
    } else if (status === 'New') {
      return <Chip label="New" color="success" size="small" />;
    } else if (status === 'Failed') {
      return <Chip label="Failed" color="error" size="small" />;
    }
    return <Chip label={status} size="small" />;
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Define a consistent height for buttons and select
  const buttonHeight = '40px'; // Adjust as needed

  return (
   <Box
           sx={{
             padding: '20px',
             border: `1px solid ${theme.palette.divider}`,
             borderRadius: '5px',
             backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#FFFFFF',
           }}
         >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" sx={{ marginRight: '10px', height: buttonHeight }} startIcon={<AddIcon />}>
             ADD PRODUCTS
          </Button>
          <Button variant="outlined" sx={{ marginRight: '10px', height: buttonHeight }} startIcon={<RefreshIcon />}>
            REFRESH PRICE
          </Button>
          <Button variant="outlined" sx={{ marginRight: '10px', height: buttonHeight }} startIcon={<SendIcon />}>
            TRANSMIT
          </Button>
          <Button variant="outlined" sx={{ marginRight: '10px', height: buttonHeight }} startIcon={<DownloadIcon />}>
            DOWNLOAD
          </Button>
          <Select value="Customer View" variant="outlined" sx={{ height: buttonHeight }}>
            <MenuItem value="Customer View">Customer View</MenuItem>
            <MenuItem value="PC View">PC View</MenuItem>
          </Select>
        </Box>
      </Box>

      <TextField
        label="Search products..."
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '20px' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DESCRIPTION</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>UPC</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>CATEGORY</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>EXTERNAL ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ACTIVE</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>LAST TRANSMITTED ON</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.Externalid}>
                <TableCell>{product.Name}</TableCell>
                <TableCell>{product.Description}</TableCell>
                <TableCell>{product.UPC}</TableCell>
                <TableCell>{product.Category}</TableCell>
                <TableCell>
                  <Tooltip title={product.Externalid}>
                    <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}> {/* Reduced maxWidth */}
                      {product.Externalid}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>{getStatusChip(product.Status)}</TableCell>
                <TableCell>{product.active}</TableCell>
                <TableCell>{product.TransmittedOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: '10px' }}>Rows Per Page</Box>
          <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Box>
        <Box>
          {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
        </Box>
        <Pagination
          count={Math.ceil(filteredProducts.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default GLProducts;