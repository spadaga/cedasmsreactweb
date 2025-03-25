import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Card,
  CardContent,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  TableSortLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GLTransactionProductModal from './GLTransactionProductModal';
import { useThemeContext } from '../context/ThemeContext';
// Generate 50 mock transactions
const generateMockData = () => {
  const statuses = ['Success', 'Failed', 'Pending'];
  const mockData = [];
  
  for (let i = 1; i <= 100; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomDate = new Date(2021, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    mockData.push({
      id: `tx-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      transmitted: randomDate.toLocaleDateString() + ' ' + 
                 String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') + ':' + 
                 String(Math.floor(Math.random() * 60)).padStart(2, '0') + 
                 (Math.random() > 0.5 ? 'am' : 'pm'),
      status: randomStatus,
      products: Math.floor(Math.random() * 10) + 1
    });
  }
  
  return mockData;
};

const GLTransactionHistoryComponent = () => {
  const [dateRange, setDateRange] = useState('Last 1 Month');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const {darkMode} = useThemeContext()
  // Sorting states
  const [orderBy, setOrderBy] = useState('transmitted');
  const [order, setOrder] = useState('desc');

  // Initialize mock data
  useEffect(() => {
    const mockData = generateMockData();
    setTransactions(mockData);
    setFilteredTransactions(mockData);
    setTotalTransactions(mockData.length);
    setSuccessCount(mockData.filter(tx => tx.status === 'Success').length);
    setFailedCount(mockData.filter(tx => tx.status === 'Failed').length);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...transactions];
    
    // Apply status filter
    if (statusFilter !== 'All Status') {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(tx => 
        tx.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];
      
      // For dates, convert to comparable format
      if (orderBy === 'transmitted') {
        aValue = new Date(aValue.split(' ')[0]);
        bValue = new Date(bValue.split(' ')[0]);
      }
      
      if (order === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
    
    setFilteredTransactions(filtered);
  }, [transactions, statusFilter, searchQuery, order, orderBy]);

  const handleDateRangeChange = (event) => setDateRange(event.target.value);
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1); // Reset to first page when changing filters
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when searching
  };
  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when changing rows per page
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a notification/toast here
  };

  

  // Calculate pagination
  const indexOfLastRecord = page * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = filteredTransactions.slice(indexOfFirstRecord, indexOfLastRecord);
  const pageCount = Math.ceil(filteredTransactions.length / rowsPerPage);
  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [modalTransactionId, setModalTransactionId] = useState('');
  const [modalTransactionStatus, setModalTransactionStatus] = useState('');
  // Calculate success rate
  const successRate = totalTransactions > 0 ? Math.round((successCount / totalTransactions) * 100) : 0;

  const handleOpenModal = (transactionId, transactionStatus) => {
    setModalTransactionId(transactionId);
    setModalTransactionStatus(transactionStatus);
    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Filters Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              onChange={handleDateRangeChange}
              label="Date Range"
            >
              <MenuItem value="Last 1 Month">Last 1 Month</MenuItem>
              <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
              <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
              <MenuItem value="Last Year">Last Year</MenuItem>
              <MenuItem value="Custom">Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="All Status">All Status</MenuItem>
              <MenuItem value="Success">Success</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search by ID..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            label="Search Transaction ID"
          />
        </Grid>
      </Grid>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" color="textSecondary">
                Total Transmissions
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {totalTransactions.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ bgcolor: 'rgba(46, 204, 113, 0.1)' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" color="textSecondary">
                Success Rate
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {successRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" color="textSecondary">
                Failed Count
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {failedCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Transactions Table */}
      <TableContainer component={Paper} elevation={3} sx={{ mb: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow style={{ backgroundColor: darkMode ? '#333' : '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleSort('id')}
                >
                  TRANSACTION ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'transmitted'}
                  direction={orderBy === 'transmitted' ? order : 'asc'}
                  onClick={() => handleSort('transmitted')}
                >
                  TRANSMITTED ON
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  STATUS
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((transaction) => (
              <TableRow key={transaction.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {transaction.id.substring(0, 16)}...
                    <IconButton size="small" onClick={() => copyToClipboard(transaction.id)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>{transaction.transmitted}</TableCell>
                <TableCell>
                  <Chip 
                    label={transaction.status} 
                    color={
                      transaction.status === 'Success' ? 'success' : 
                      transaction.status === 'Failed' ? 'error' : 'warning'
                    } 
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button 
                    variant="contained" 
                    size="small" 
                    color="primary"
                    sx={{ 
                      bgcolor: 'black', 
                      '&:hover': { bgcolor: 'grey.800' } 
                    }}
                    onClick={() => handleOpenModal(transaction.id, transaction.status)}
                  >
                    View Products
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 2 }}>Show</Typography>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            size="small"
            sx={{ minWidth: 80 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <Typography variant="body2" sx={{ ml: 2 }}>entries</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredTransactions.length)} of {filteredTransactions.length} entries
          </Typography>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={handlePageChange}
            variant="outlined" 
            shape="rounded"
            showFirstButton
            showLastButton
          />

<GLTransactionProductModal
        open={openModal}
        onClose={handleCloseModal}
        transactionId={modalTransactionId}
        transactionStatus={modalTransactionStatus}
      />
        </Box>
      </Box>
    </Box>
  );
};

export default GLTransactionHistoryComponent;