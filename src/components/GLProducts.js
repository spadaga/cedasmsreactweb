// GLProducts.jsx
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles'
import {
  Box,
  TextField,
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
  TableSortLabel,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import glProductsData from '../data/glproducts.json'; // Import your JSON data
import ButtonLayout from '../controls/ButtonLayout';
 import { useNavigate } from 'react-router-dom'; // Import useNavigate
const GLProducts = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(glProductsData);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Name'); // Default sorting column
  const navigate = useNavigate(); // Initialize useNavigate
  // Common Styles
const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '600',
  fontSize: '0.7rem',
  fontFamily: 'Roboto, sans-serif',
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  lineHeight:'1'
}));


const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.7rem',
  fontFamily: 'Roboto, sans-serif',
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100px',
}));

const StyledDescriptionCell = styled(StyledTableBodyCell)({});

const StyledExternalIdCell = styled(StyledTableBodyCell)({  maxWidth: '100px',width:"100px"});

const StyledCategoryCell = styled(StyledTableBodyCell)({});

const StyledStattusCell = styled(StyledTableBodyCell)({ maxWidth: '100px', width:"100px"});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#6B7BE5', 
  display: 'inline-block',
  maxWidth: '100px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',fontWeight:'600',
  textOverflow: 'ellipsis',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const StyledTransmittedCell = styled(StyledTableHeaderCell)({
  width: '100px',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

  useEffect(() => {
    let filtered = glProductsData.filter((product) =>
      product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered = filtered.sort(getComparator(order, orderBy));

    setFilteredProducts(filtered);
    setPage(1); // Reset page when search term changes
  }, [searchTerm, order, orderBy]);

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleNameClick = (product) => {
    // Navigate to the new component with product data
    navigate('/glproductdetails');
  };


  const getStatusChip = (status) => {
    if (status === 'Transmitted') {
      return <Chip label="Transmitted" color="primary" variant="outlined" size="small" />;
    } else if (status === 'In transit ') {
      return <Chip label="In Transit" color="warning" variant="outlined" size="small" />;
    } else if (status === 'New') {
      return <Chip label="New" color="success" variant="outlined" size="small" />;
    } else if (status === 'Failed') {
      return <Chip label="Failed" color="error" variant="outlined" size="small" />;
    }
    return <Chip label={status} variant="outlined" size="small" />;
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        padding: '20px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '5px',
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#FFFFFF',
        overflowX: 'auto', // Add overflowX auto to enable horizontal scrolling if needed
      }}
    >
      <ButtonLayout />

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

<TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
          <TableRow>
            <StyledTableHeaderCell>
              <TableSortLabel
                active={orderBy === 'Name'}
                direction={orderBy === 'Name' ? order : 'asc'}
                onClick={() => handleRequestSort('Name')}
              >
                NAME
              </TableSortLabel>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              <TableSortLabel
                active={orderBy === 'Description'}
                direction={orderBy === 'Description' ? order : 'asc'}
                onClick={() => handleRequestSort('Description')}
              >
                DESCRIPTION
              </TableSortLabel>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              <TableSortLabel
                active={orderBy === 'UPC'}
                direction={orderBy === 'UPC' ? order : 'asc'}
                onClick={() => handleRequestSort('UPC')}
              >
                UPC
              </TableSortLabel>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              <TableSortLabel
                active={orderBy === 'Category'}
                direction={orderBy === 'Category' ? order : 'asc'}
                onClick={() => handleRequestSort('Category')}
              >
                CATEGORY
              </TableSortLabel>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              <TableSortLabel
                active={orderBy === 'Externalid'}
                direction={orderBy === 'Externalid' ? order : 'asc'}
                onClick={() => handleRequestSort('Externalid')}
              >
                EXTERNAL ID
              </TableSortLabel>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              <TableSortLabel
                active={orderBy === 'Status'}
                direction={orderBy === 'Status' ? order : 'asc'}
                onClick={() => handleRequestSort('Status')}
              >
                STATUS
              </TableSortLabel>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              <TableSortLabel
                active={orderBy === 'active'}
                direction={orderBy === 'active' ? order : 'asc'}
                onClick={() => handleRequestSort('active')}
              >
                ACTIVE
              </TableSortLabel>
            </StyledTableHeaderCell>
            <StyledTransmittedCell>
              <TableSortLabel
                active={orderBy === 'TransmittedOn'}
                direction={orderBy === 'TransmittedOn' ? order : 'asc'}
                onClick={() => handleRequestSort('TransmittedOn')}
              >
                LAST TRANSMITTED ON
              </TableSortLabel>
            </StyledTransmittedCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentProducts.map((product) => (
            <TableRow key={product.Externalid}>
              <StyledTableBodyCell>
                <StyledLink href="#" title={product.Name} onClick={() => handleNameClick(product)}>
                  {product.Name}
                </StyledLink>
              </StyledTableBodyCell>
              <StyledDescriptionCell>
                <Tooltip title={product.Description}>
                {product.Description}
                </Tooltip>
              </StyledDescriptionCell>
              <StyledTableBodyCell>{product.UPC}</StyledTableBodyCell>
              <StyledCategoryCell>{product.Category}</StyledCategoryCell>
              <StyledExternalIdCell>
                <Tooltip title={product.Externalid}>
                {product.Externalid}
                </Tooltip>
              </StyledExternalIdCell>
              <StyledTableBodyCell>{getStatusChip(product.Status)}</StyledTableBodyCell>
              <StyledStattusCell>{product.active}</StyledStattusCell>
              <StyledTableBodyCell>{product.TransmittedOn}</StyledTableBodyCell>
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