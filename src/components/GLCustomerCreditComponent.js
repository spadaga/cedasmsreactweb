import React, { useState } from "react";
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
  TextField,
  InputAdornment,
  IconButton,
  TablePagination,
  TableSortLabel,
  Chip,
  Button,
  Tooltip,Link
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {  useNavigate } from "react-router-dom";
import { PictureAsPdfOutlined } from "@mui/icons-material";

function GLCustomerCreditComponent() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("creditNumber");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Last 30 days");

  const credits = [
    {
      creditNumber: "34685",
      creditMemoDate: "07/18/2021",
      totalAmount: "$44,675.00",
      status: "Failed",
      externalId: "10608066-8043-9BCE-5D7E-A...",
      createdDate: "11/19/2021 08:20 AM",
    },
    {
      creditNumber: "34686",
      creditMemoDate: "07/19/2021",
      totalAmount: "$32,150.00",
      status: "Success",
      externalId: "20606066-9043-8BCE-6D7E-B",
      createdDate: "11/20/2021 09:30 AM",
    },
    {
      creditNumber: "34687",
      creditMemoDate: "07/20/2021",
      totalAmount: "$28,900.00",
      status: "Pending",
      externalId: "30608066-7043-78CE-7D7E-C...",
      createdDate: "11/21/2021 10:45 AM",
    },
    {
      creditNumber: "34688",
      creditMemoDate: "07/21/2021",
      totalAmount: "$51,200.00",
      status: "Success",
      externalId: "40608066-6C43-6BCE-BD7E-D...",
      createdDate: "11/22/2021 11:15 AM",
    },
    {
      creditNumber: "34689",
      creditMemoDate: "07/22/2021",
      totalAmount: "$37,800.00",
      status: "Failed",
      externalId: "50608066-5043-58CE-907E-E",
      createdDate: "11/23/2021 12:00 PM",
    },
    // Add more credit data as needed
  ];

  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleDateFilterChange = (date) => {
    setDateFilter(date);
  };

  const handleCreditNumberClick = (creditNumber) => {
    navigate('/glccdet'); // Navigate to GLCustomerCreditDetails
  };
  const filteredCredits = credits.filter((credit) =>
    Object.values(credit).some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedCredits = filteredCredits.sort((a, b) => {
    const isAsc = order === "asc";
    if (orderBy === "amount") {
      const amountA = parseFloat(a.amount.replace("$", ""));
      const amountB = parseFloat(b.amount.replace("$", ""));
      return isAsc ? amountA - amountB : amountB - amountA;
    }
    return isAsc
      ? String(a[orderBy]).localeCompare(String(b[orderBy]))
      : String(b[orderBy]).localeCompare(String(a[orderBy]));
  });

  const paginatedCredits = sortedCredits.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <Box
        
        marginBottom={2}
      >
        <TextField
          label="Search by credit number, external ID..."
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
          sx={{ marginBottom: 2, width: "100%" }}
        />

        <Box sx={{ marginBottom: 2 }}>
          <Chip
            label="Status: All"
            clickable
            variant={statusFilter === "All" ? "default" : "outlined"}
            onClick={() => handleStatusFilterChange("All")}
            sx={{ marginRight: 1 }}
          />
          <Chip
            label="Date: Last 30 days"
            clickable
            variant={dateFilter === "Last 30 days" ? "default" : "outlined"}
            onClick={() => handleDateFilterChange("Last 30 days")}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customer credit table">
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "creditNumber"}
                    direction={orderBy === "creditNumber" ? order : "asc"}
                    onClick={handleRequestSort("creditNumber")}
                  >
                    CREDIT NUMBER
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "creditMemoDate"}
                    direction={orderBy === "creditMemoDate" ? order : "asc"}
                    onClick={handleRequestSort("creditMemoDate")}
                  >
                    CREDIT MEMO DATE
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "totalAmount"}
                    direction={orderBy === "totalAmount" ? order : "asc"}
                    onClick={handleRequestSort("totalAmount")}
                  >
                    TOTAL AMOUNT
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    onClick={handleRequestSort("status")}
                  >
                    STATUS
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "externalId"}
                    direction={orderBy === "externalId" ? order : "asc"}
                    onClick={handleRequestSort("externalId")}
                  >
                    EXTERNAL ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "createdDate"}
                    direction={orderBy === "createdDate" ? order : "asc"}
                    onClick={handleRequestSort("createdDate")}
                  >
                    CREATED DATE
                  </TableSortLabel>
                </TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCredits.map((credit) => (
                <TableRow key={credit.creditNumber} >
                  <Tooltip title="Navigate to Bill Details">
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() =>
                        handleCreditNumberClick(credit.creditNumber)
                      }
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        paddingLeft: "16px",
                        display: "inline-block", // Add this line
                      }}
                    >
                      {credit.creditNumber}
                    </Link>
                  </Tooltip>
                  <TableCell>{credit.creditMemoDate}</TableCell>
                  <TableCell>{credit.totalAmount}</TableCell>
                  <TableCell>
                    <Chip
                    variant="outlined" 
                      label={credit.status}
                      size="small"
                      color={
                        credit.status === "Success"
                          ? "success"
                          : credit.status === "Failed"
                          ? "error"
                          : "warning"
                      }
                    />
                  </TableCell>
                  <TableCell>{credit.externalId}</TableCell>
                  <TableCell>{credit.createdDate}</TableCell>
                  <TableCell>
                    <Tooltip title="View PDF">
                      <IconButton
                        size="small"
                        sx={{ color: "primary.main", marginRight: 1 }}
                      >
                        <PictureAsPdfOutlined />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={filteredCredits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
}

export default GLCustomerCreditComponent;
