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
  TablePagination,
  TableSortLabel,
  Chip
} from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

// Sample data matching the screenshot
const INITIAL_DATA = [
    {
      pc: 'Aberdeen CED',
      invoiceNumber: 'Invoice1245',
      customer: '1872-COD-BILL HOLLOWAY',
      status: 'Inprocess',
      submittedOn: '04/20/2010 21:00 PM',
    },
    {
      pc: 'Aberdeen SES',
      invoiceNumber: 'Invoice1845',
      customer: 'ECOLOGY SOLAR',
      status: 'Failed',
      submittedOn: '12/11/2011 21:00 PM',
    },
    {
      pc: 'Acq Location: 0011',
      invoiceNumber: 'Invoice1238',
      customer: '1872-M/C-VISA-AX',
      status: 'Pending',
      submittedOn: '04/13/2010 05:00 AM',
    },
    {
      pc: 'Acq Location: 0012',
      invoiceNumber: 'Invoice5678',
      customer: 'WILSON ELECTRIC SERVICES CORP',
      status: 'Completed',
      submittedOn: '08/25/2012 10:30 AM',
    },
    {
      pc: 'Acq Location: 0013',
      invoiceNumber: 'Invoice9012',
      customer: 'CREDIT CARD - CONTRACTOR CREDIT CARD',
      status: 'Inprocess',
      submittedOn: '01/05/2013 14:45 PM',
    },
    {
      pc: 'Acq Location: 0014',
      invoiceNumber: 'Invoice3456',
      customer: 'COURTESY ELECTRIC CO',
      status: 'Failed',
      submittedOn: '06/18/2014 09:15 AM',
    },
    {
      pc: 'Acq Location: 0015',
      invoiceNumber: 'Invoice7890',
      customer: '3E ELECTRICAL CONTR',
      status: 'Pending',
      submittedOn: '11/30/2015 16:20 PM',
    },
    {
      pc: 'Acq Location: 0016',
      invoiceNumber: 'Invoice1122',
      customer: 'A.W.B. LLC DBA PEAK ELEC',
      status: 'Completed',
      submittedOn: '03/12/2016 11:00 AM',
    },
    {
      pc: 'Acq Location: 0017',
      invoiceNumber: 'Invoice3344',
      customer: 'AAA ELECTRICAL AAA ELECTRICAL',
      status: 'Inprocess',
      submittedOn: '07/24/2017 13:30 PM',
    },
    {
      pc: 'Acq Location: 0018',
      invoiceNumber: 'Invoice5566',
      customer: 'CITY OF THORNTON',
      status: 'Failed',
      submittedOn: '12/06/2018 18:00 PM',
    },
    {
      pc: 'Acq Location: 0019',
      invoiceNumber: 'Invoice7788',
      customer: 'GLOBAL LOGISTICS INC',
      status: 'Pending',
      submittedOn: '05/19/2019 08:45 AM',
    },
    {
      pc: 'Acq Location: 0020',
      invoiceNumber: 'Invoice9900',
      customer: 'SUNRISE MARKETING SOLUTIONS',
      status: 'Completed',
      submittedOn: '10/01/2020 15:15 PM',
    },
    {
      pc: 'Acq Location: 0021',
      invoiceNumber: 'Invoice2233',
      customer: 'PRECISION ENGINEERING LTD',
      status: 'Inprocess',
      submittedOn: '02/14/2021 12:30 PM',
    },
    {
      pc: 'Acq Location: 0022',
      invoiceNumber: 'Invoice4455',
      customer: 'RIVERVIEW RESTAURANT GROUP',
      status: 'Failed',
      submittedOn: '06/27/2022 17:00 PM',
    },
    {
      pc: 'Acq Location: 0023',
      invoiceNumber: 'Invoice6677',
      customer: 'PACIFIC COAST IMPORTS',
      status: 'Pending',
      submittedOn: '11/09/2023 10:00 AM',
    },
    {
      pc: 'Acq Location: 0024',
      invoiceNumber: 'Invoice8899',
      customer: 'MOUNTAIN VIEW TECHNOLOGIES',
      status: 'Completed',
      submittedOn: '03/22/2024 14:30 PM',
    },
    {
      pc: 'Acq Location: 0025',
      invoiceNumber: 'Invoice1010',
      customer: 'LAKE CITY CONSTRUCTION',
      status: 'Inprocess',
      submittedOn: '07/04/2025 09:45 AM',
    },
    {
      pc: 'Acq Location: 0026',
      invoiceNumber: 'Invoice1212',
      customer: 'VALLEY WIDE DISTRIBUTORS',
      status: 'Failed',
      submittedOn: '11/16/2026 16:15 PM',
    },
    {
      pc: 'Acq Location: 0027',
      invoiceNumber: 'Invoice1414',
      customer: 'DESERT ROSE BEAUTY SALON',
      status: 'Pending',
      submittedOn: '04/29/2027 11:30 AM',
    },
    {
      pc: 'Acq Location: 0028',
      invoiceNumber: 'Invoice1616',
      customer: 'OCEAN BREEZE TRAVEL AGENCY',
      status: 'Completed',
      submittedOn: '09/11/2028 13:00 PM',
    },
  ];
// Status color mapping
const STATUS_COLORS = {
  'Inprocess': 'info',
  'Failed': 'error',
  'Pending': 'warning'
};

function GLBills() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('submittedOn');
  const [order, setOrder] = useState('desc');
  const {darkMode} = useThemeContext()

  // Filtering and sorting logic
// Filtering and sorting logic
const filteredData = INITIAL_DATA.filter(row => 
    Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).sort((a, b) => {
    // Corrected sorting logic
    if (order === 'asc') {
      return a[orderBy].localeCompare(b[orderBy]);
    } else {
      return b[orderBy].localeCompare(a[orderBy]);
    }
  });


  // Pagination logic
  const paginatedData = filteredData.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TextField
        label="Search Invoices"
        variant="outlined"
        fullWidth
        sx={{ mb: 2, mt: 2, px: 1 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: darkMode ? '#333' : '#f5f5f5' }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'pc'}
                  direction={orderBy === 'pc' ? order : 'asc'}
                  onClick={() => handleRequestSort('pc')}
                >
                  PC #
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'invoiceNumber'}
                  direction={orderBy === 'invoiceNumber' ? order : 'asc'}
                  onClick={() => handleRequestSort('invoiceNumber')}
                >
                  CED Invoice #
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'customer'}
                  direction={orderBy === 'customer' ? order : 'asc'}
                  onClick={() => handleRequestSort('customer')}
                >
                  Customer #
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'submittedOn'}
                  direction={orderBy === 'submittedOn' ? order : 'asc'}
                  onClick={() => handleRequestSort('submittedOn')}
                >
                  Submitted On (UTC)
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.pc}</TableCell>
                <TableCell>{row.invoiceNumber}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>
                  <Chip 
                  variant='outlined'
                    label={row.status} 
                    color={STATUS_COLORS[row.status]} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{row.submittedOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}

export default GLBills;