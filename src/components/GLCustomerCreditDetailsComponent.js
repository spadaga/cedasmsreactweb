import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  TablePagination,
  TableSortLabel,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GLCCMemoLinesComponent from './GLCCMemoLinesComponent';

function GLCustomerCreditDetailsComponent() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('SEQ_NO');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');

  const billDetails = {
    billNumber: '9876549',
    status: 'Success',
    creditMemoDate: '09/08/2022',
    externalId: 'C628DED6-AF0D-4A32-52AF-B0EA7191AAC7',
    createdDate: '09/16/2023 09:59 AM',
  };

  const tableData = [
    {
      SEQ_NO: 1,
      NAME: 'BLINE B2211PAZN1/1/4',
      DESCRIPTION: '1/1/4 STRUT CLAMP/COMBO 1/221/1 STRUT CLAMP/COMBO-1',
      QUANTITY: 27,
      PRICE: '$11.00',
      AMOUNT: '$297.00',
      BILL_NUMBER: '641564',
    },
    {
      SEQ_NO: 2,
      NAME: 'CLINE X3311PAZN2/2/4',
      DESCRIPTION: '2/2/4 METAL BRACKET/SUPPORT-2',
      QUANTITY: 15,
      PRICE: '$22.50',
      AMOUNT: '$337.50',
      BILL_NUMBER: '641565',
    },
    {
      SEQ_NO: 3,
      NAME: 'DLINE K4411PAZN3/3/4',
      DESCRIPTION: '3/3/4 MOUNTING PLATE/ASSEMBLY-3',
      QUANTITY: 32,
      PRICE: '$18.75',
      AMOUNT: '$600.00',
      BILL_NUMBER: '641566',
    },
    {
      SEQ_NO: 4,
      NAME: 'ELINE P5511PAZN4/4/4',
      DESCRIPTION: '4/4/4 CONNECTOR JOINT/SYSTEM-4',
      QUANTITY: 20,
      PRICE: '$25.00',
      AMOUNT: '$500.00',
      BILL_NUMBER: '641567',
    },
    {
      SEQ_NO: 5,
      NAME: 'FLINE R6611PAZN5/5/4',
      DESCRIPTION: '5/5/4 SUPPORT BRACKET/FRAME-5',
      QUANTITY: 12,
      PRICE: '$39.50',
      AMOUNT: '$474.00',
      BILL_NUMBER: '641568',
    },
    {
        SEQ_NO: 6,
        NAME: 'GLINE T7711PAZN6/6/4',
        DESCRIPTION: '6/6/4 MOUNTING BRACKET/PLATE-6',
        QUANTITY: 18,
        PRICE: '$30.00',
        AMOUNT: '$540.00',
        BILL_NUMBER: '641569',
    },
    {
        SEQ_NO: 7,
        NAME: 'HLINE U8811PAZN7/7/4',
        DESCRIPTION: '7/7/4 SUPPORT PLATE/BRACKET-7',
        QUANTITY: 25,
        PRICE: '$28.00',
        AMOUNT: '$700.00',
        BILL_NUMBER: '641570',
    },
    {
        SEQ_NO: 8,
        NAME: 'ILINE V9911PAZN8/8/4',
        DESCRIPTION: '8/8/4 CONNECTOR BRACKET/JOINT-8',
        QUANTITY: 10,
        PRICE: '$45.00',
        AMOUNT: '$450.00',
        BILL_NUMBER: '641571',
    },
    {
        SEQ_NO: 9,
        NAME: 'JLINE W1122PAZN9/9/4',
        DESCRIPTION: '9/9/4 MOUNTING PLATE/FRAME-9',
        QUANTITY: 30,
        PRICE: '$35.00',
        AMOUNT: '$1050.00',
        BILL_NUMBER: '641572',
    },
    {
        SEQ_NO: 10,
        NAME: 'KLINE X3344PAZN10/10/4',
        DESCRIPTION: '10/10/4 SUPPORT BRACKET/ASSEMBLY-10',
        QUANTITY: 22,
        PRICE: '$50.00',
        AMOUNT: '$1100.00',
        BILL_NUMBER: '641573',
    },
  ];

  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    const isAsc = order === 'asc';
    return isAsc
      ? String(a[orderBy]).localeCompare(String(b[orderBy]))
      : String(b[orderBy]).localeCompare(String(a[orderBy]));
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3 }}>
       <Card sx={{ padding: 2, marginBottom: 3, boxShadow: 3 }}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              Bill Number
            </Typography>
            <Typography variant="body2">{billDetails.billNumber}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              Status
            </Typography>
            <Chip label={billDetails.status} color="success" size="small" />
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              Credit Memo Date
            </Typography>
            <Typography variant="body2">{billDetails.creditMemoDate}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              External ID
            </Typography>
            <Typography variant="body2">{billDetails.externalId}</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" marginTop={2}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              Created Date
            </Typography>
            <Typography variant="body2">{billDetails.createdDate}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Button variant="contained">View Credit Memo</Button>
          </Box>
        </Box>
      </Box>
    </Card>

      <TextField
        label="Search..."
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: 2, width: '100%' }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="bill details table">
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell fontWeight="bold" sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === 'SEQ_NO'}
                  direction={orderBy === 'SEQ_NO' ? order : 'asc'}
                  onClick={handleRequestSort('SEQ_NO')}
                >
                  SEQ NO
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === 'NAME'}
                  direction={orderBy === 'NAME' ? order : 'asc'}
                  onClick={handleRequestSort('NAME')}
                >
                  NAME
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === 'DESCRIPTION'}
                  direction={orderBy === 'DESCRIPTION' ? order : 'asc'}
                  onClick={handleRequestSort('DESCRIPTION')}
                >
                  DESCRIPTION
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === 'QUANTITY'}
                  direction={orderBy === 'QUANTITY' ? order : 'asc'}
                  onClick={handleRequestSort('QUANTITY')}
                >
                  QUANTITY
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === 'PRICE'}
                  direction={orderBy === 'PRICE' ? order : 'asc'}
                  onClick={handleRequestSort('PRICE')}
                >
                  PRICE
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === 'AMOUNT'}
                  direction={orderBy === 'AMOUNT' ? order : 'asc'}
                  onClick={handleRequestSort('AMOUNT')}
                >
                  AMOUNT
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{fontWeight:"bold"}}>
                <TableSortLabel
                  active={orderBy === 'BILL_NUMBER'}
                  direction={orderBy === 'BILL_NUMBER' ? order : 'asc'}
                  onClick={handleRequestSort('BILL_NUMBER')}
                >
                  BILL NUMBER
                </TableSortLabel>
              </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.SEQ_NO}>
                  <TableCell>{row.SEQ_NO}</TableCell>
                  <TableCell>{row.NAME}</TableCell>
                  <TableCell>{row.DESCRIPTION}</TableCell>
                  <TableCell>{row.QUANTITY}</TableCell>
                  <TableCell>{row.PRICE}</TableCell>
                  <TableCell>{row.AMOUNT}</TableCell>
                  <TableCell>{row.BILL_NUMBER}</TableCell>
                </TableRow>
              ))}
             <TableRow sx={{ backgroundColor: '#fff9c4', fontWeight: 'bold' }}>
              <TableCell colSpan={5} align="right" sx={{ backgroundColor: '#fff9c4', fontWeight: 'bold' }}>
                Tax Amount (5.28%)
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">$2,000.00</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
              <TableCell colSpan={5} align="right" sx={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
                Total
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">$2,209.00</Typography>
              </TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <GLCCMemoLinesComponent/>
      </Box>
    );
  }
  
  export default GLCustomerCreditDetailsComponent;