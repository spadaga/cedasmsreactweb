import React, { useState, useEffect, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TablePagination,
    TextField,
    InputAdornment,
    Box,
    Chip,
    Button,
    Tooltip,
    IconButton, Link, // Import Link
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
function GLCustomerBillsComponent() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('BILL_NUMBER');
    const [order, setOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [successFilter, setSuccessFilter] = useState(true);
    const [failedFilter, setFailedFilter] = useState(true);
    const navigate = useNavigate();
    const {darkMode} = useThemeContext()
    const handleBillNumberClick = (billNumber) => {
        // Implement your navigation logic here
        // Example: Open a new tab with the bill number as a parameter
        navigate('/glbilldet')
    };
    useEffect(() => {
        // Replace with your actual data fetching logic
        const mockData = [
            {
                BILL_NUMBER: '34685', PO_NUMBER: 'PO33931', BILL_DATE: '07/18/2021', TOTAL_AMOUNT: '$ 44,675.00', STATUS: 'Failed', EXTERNAL_ID: '10608066-8043-98CE-5D7E-A311FC9E448D', CREATED_DATE: '11/19/2021 08:20 AM'
            },
            {
                BILL_NUMBER: '34686', PO_NUMBER: 'PO33932', BILL_DATE: '07/19/2021', TOTAL_AMOUNT: '$ 12,675.00', STATUS: 'Success', EXTERNAL_ID: '10606066-8043-9BCE-5D7E-A311FC9E449D', CREATED_DATE: '11/20/2021 09:20 AM'
            },
            {
                BILL_NUMBER: '34687', PO_NUMBER: 'PO33933', BILL_DATE: '07/20/2021', TOTAL_AMOUNT: '$ 33,675.00', STATUS: 'Success', EXTERNAL_ID: '10608066-8043-9BCE-5D7E-A311FC9E450D', CREATED_DATE: '11/21/2021 10:20 AM'
            },
            {
                BILL_NUMBER: '34688', PO_NUMBER: 'PO33934', BILL_DATE: '07/21/2021', TOTAL_AMOUNT: '$ 22,675.00', STATUS: 'Failed', EXTERNAL_ID: '10608066-8043-98CE-5D7E-A311FC9E451D', CREATED_DATE: '11/22/2021 11:20 AM'
            },
            {
                BILL_NUMBER: '34689', PO_NUMBER: 'PO33935', BILL_DATE: '07/22/2021', TOTAL_AMOUNT: '$ 55,675.00', STATUS: 'Success', EXTERNAL_ID: '10608066-8043-9BCE-5D7E-A311FC9E452D', CREATED_DATE: '11/23/2021 12:20 PM'
            },
            {
                BILL_NUMBER: '34690', PO_NUMBER: 'PO33936', BILL_DATE: '07/23/2021', TOTAL_AMOUNT: '$ 66.675.00', STATUS: 'Success', EXTERNAL_ID: '10608066-8043-98CE-5D7E-A311FC9E453D', CREATED_DATE: '11/24/2021 01:20 PM'
            },
            {
                BILL_NUMBER: '34691', PO_NUMBER: 'PO33937', BILL_DATE: '07/24/2021', TOTAL_AMOUNT: '$ 77,675.00', STATUS: 'Failed', EXTERNAL_ID: '10608066-8043-9BCE-5D7E-A311FC9E454D', CREATED_DATE: '11/25/2021 02:20 PM'
            },
            {
                BILL_NUMBER: '34692', PO_NUMBER: 'PO33938', BILL_DATE: '07/25/2021', TOTAL_AMOUNT: '$ 88,675.00', STATUS: 'Success', EXTERNAL_ID: '10608066-8043-98CE-5D7E-A311FC96455D', CREATED_DATE: '11/26/2021 03:20 PM'
            },
            {
                BILL_NUMBER: '34693', PO_NUMBER: 'PO33939', BILL_DATE: '07/26/2021', TOTAL_AMOUNT: '$ 99,675.00', STATUS: 'Success', EXTERNAL_ID: '10608066-8043-98CE-5D7E-A311FC9E456D', CREATED_DATE: '11/27/2021 04:20 PM'
            },
        ];
        setData(mockData);
    }, []);

    const handleRequestSort = (property) => {
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
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleSuccessFilterChange = () => {
        setSuccessFilter(!successFilter);
        setPage(0);
    };

    const handleFailedFilterChange = () => {
        setFailedFilter(!failedFilter);
        setPage(0);
    };

    const filteredData = useMemo(() => {
        return data.filter((row) => {
            const statusFilter = (successFilter && row.STATUS === 'Success') || (failedFilter && row.STATUS === 'Failed');
            return statusFilter && Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [data, searchQuery, successFilter, failedFilter]);

    const sortedData = useMemo(() => {
        return filteredData.slice().sort((a, b) => {
            const isAsc = order === 'asc';
            if (b[orderBy] < a[orderBy]) {
                return isAsc ? 1 : -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return isAsc ? -1 : 1;
            }
            return 0;
        });
    }, [filteredData, order, orderBy]);

    const paginatedData = useMemo(() => {
        return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [sortedData, page, rowsPerPage]);

    return (
      <div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <TextField
            label="Search bills..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: "300px" }} // Adjust width as needed
          />
          <Box>
            <Chip
              label="Success"
              clickable
              variant="outlined" 
              color={successFilter ? "success" : "default"}
              onClick={handleSuccessFilterChange}
              sx={{ marginRight: 1 }}
            />
            <Chip
              label="Failed"
              clickable
              variant="outlined" 
              color={failedFilter ? "error" : "default"}
              onClick={handleFailedFilterChange}
            />
          </Box>
          <Tooltip title="Export Data">
            <IconButton>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow style={{ backgroundColor: darkMode ? '#333' : '#f5f5f5' }}>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "BILL_NUMBER"}
                    direction={orderBy === "BILL_NUMBER" ? order : "asc"}
                    onClick={() => handleRequestSort("BILL_NUMBER")}
                  >
                    BILL NUMBER
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "PO_NUMBER"}
                    direction={orderBy === "PO_NUMBER" ? order : "asc"}
                    onClick={() => handleRequestSort("PO_NUMBER")}
                  >
                    PO NUMBER
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "BILL_DATE"}
                    direction={orderBy === "BILL_DATE" ? order : "asc"}
                    onClick={() => handleRequestSort("BILL_DATE")}
                  >
                    BILL DATE
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "TOTAL_AMOUNT"}
                    direction={orderBy === "TOTAL_AMOUNT" ? order : "asc"}
                    onClick={() => handleRequestSort("TOTAL_AMOUNT")}
                  >
                    TOTAL AMOUNT
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "STATUS"}
                    direction={orderBy === "STATUS" ? order : "asc"}
                    onClick={() => handleRequestSort("STATUS")}
                  >
                    STATUS
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "EXTERNAL_ID"}
                    direction={orderBy === "EXTERNAL_ID" ? order : "asc"}
                    onClick={() => handleRequestSort("EXTERNAL_ID")}
                  >
                    EXTERNAL ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "CREATED_DATE"}
                    direction={orderBy === "CREATED_DATE" ? order : "asc"}
                    onClick={() => handleRequestSort("CREATED_DATE")}
                  >
                    CREATED DATE
                  </TableSortLabel>
                </TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.BILL_NUMBER}>
                    <Tooltip title="Navigate to Bill Details">
                  <Link
                    component="button"
                    variant="body2"
                    
                    onClick={() => handleBillNumberClick(row.BILL_NUMBER)}
                    sx={{ textDecoration: "underline", cursor: "pointer" ,paddingLeft:2}}
                  >
                    {row.BILL_NUMBER}
                  </Link></Tooltip>
                  <TableCell>{row.PO_NUMBER}</TableCell>
                  <TableCell>{row.BILL_DATE}</TableCell>
                  <TableCell>{row.TOTAL_AMOUNT}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.STATUS}
                      variant="outlined" 
                      color={row.STATUS === "Success" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.EXTERNAL_ID}</TableCell>
                  <TableCell>{row.CREATED_DATE}</TableCell>
                  <TableCell
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Tooltip title="View PDF">
                      <IconButton
                        size="small"
                        sx={{ color: "primary.main", marginRight: 1 }}
                      >
                        <PictureAsPdfIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Resend">
                      <IconButton size="small" sx={{ color: "primary.main" }}>
                        <ReplayIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    );
}

export default GLCustomerBillsComponent;