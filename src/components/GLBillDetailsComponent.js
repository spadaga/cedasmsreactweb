import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  TablePagination,
  TableSortLabel,
  Card,
  Tooltip, // Import Card
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { styled } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GLBillMemoLinesComponent from "./GLBillMemoLinesComponent";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const commonTableCellStyle = {
    fontWeight: 'bold', // Apply bold font weight
};

function GLBillDetailsComponent() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("SEQ_NO");
  const [order, setOrder] = useState("asc");

  const data = [
    {
      SEQ_NO: 1,
      NAME: "BLINE B2211PAZN1 / 1 / 4",
      DESCRIPTION: "1/1/4 STRUT CLAMP / COMBO 1/221/1 STRUT CLAMP / COMBO - 1",
      QUANTITY: 27,
      PRICE: "$ 11.00",
      AMOUNT: "$ 297.00",
    },
    {
      SEQ_NO: 2,
      NAME: "BLINE B2214PAZN2",
      DESCRIPTION: "2 STRUT CLAMP / COMBO ZINC PLATED",
      QUANTITY: 15,
      PRICE: "$ 14.50",
      AMOUNT: "$ 217.50",
    },
    {
      SEQ_NO: 3,
      NAME: "BLINE B2216PAZN3",
      DESCRIPTION: "3 STRUT CLAMP / COMBO ZINC PLATED",
      QUANTITY: 20,
      PRICE: "$ 18.75",
      AMOUNT: "$ 375.00",
    },
    {
      SEQ_NO: 4,
      NAME: "BLINE B2218PAZN4",
      DESCRIPTION: "4 STRUT CLAMP / COMBO ZINC PLATED",
      QUANTITY: 12,
      PRICE: "$ 22.00",
      AMOUNT: "$ 264.00",
    },
    {
      SEQ_NO: 5,
      NAME: "BLINE B2220PAZN5",
      DESCRIPTION: "5 STRUT CLAMP / COMBO ZINC PLATED",
      QUANTITY: 18,
      PRICE: "$ 25.50",
      AMOUNT: "$ 459.00",
    },
    {
      SEQ_NO: 6,
      NAME: "BLINE B2222PAZN6",
      DESCRIPTION: "6 STRUT CLAMP / COMBO ZINC PLATED",
      QUANTITY: 10,
      PRICE: "$ 28.00",
      AMOUNT: "$ 280.00",
    },
    {
      SEQ_NO: 7,
      NAME: "BLINE B2224PAZN7",
      DESCRIPTION: "7 STRUT CLAMP / COMBO ZINC PLATED",
      QUANTITY: 8,
      PRICE: "$ 32.50",
      AMOUNT: "$ 260.00",
    },
    {
      SEQ_NO: 8,
      NAME: "BLINE B2226PAZN8",
      DESCRIPTION: "8 STRUT CLAMP / COMBO ZINC PLATED",
      QUANTITY: 14,
      PRICE: "$ 35.00",
      AMOUNT: "$ 490.00",
    },
    {
      SEQ_NO: 9,
      NAME: "BLINE B2228PAZN9",
      DESCRIPTION: "9 STRUT CLAMP / COMBO ZINC PLATED",
      QUANTITY: 16,
      PRICE: "$ 38.50",
      AMOUNT: "$ 616.00",
    },
    {
      SEQ_NO: 10,
      NAME: "BLINE B2230PAZN 10",
      DESCRIPTION: '10 " STRUT CLAMP / COMBO ZINC PLATED',
      QUANTITY: 22,
      PRICE: "$ 42.00",
      AMOUNT: "$ 924.00",
    },
  ];

  const handleRequestSort = (property) => {
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
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = filteredData.slice().sort((a, b) => {
    const isAsc = order === "asc";
    if (b[orderBy] < a[orderBy]) {
      return isAsc ? 1 : -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return isAsc ? -1 : 1;
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Card sx={{ padding: 2, marginBottom: 3, boxShadow: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2.4}>
            <Typography variant="subtitle2" color="textSecondary">
              Bill Number:
            </Typography>
            <Typography variant="body1">9876549</Typography>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Typography variant="subtitle2" color="textSecondary">
              PO Number:
            </Typography>
            <Typography variant="body1">PO98288282</Typography>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Typography variant="subtitle2" color="textSecondary">
              Status:
            </Typography>
            <Typography
              variant="body1"
              style={{
                backgroundColor: "#ffe0e0",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              Failed
            </Typography>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Typography variant="subtitle2" color="textSecondary">
              Created Date:
            </Typography>
            <Typography variant="body1">09/16/2023 09:59 AM</Typography>
          </Grid>

          <Grid item xs={12} md={2.4}>
            <Typography variant="subtitle2" color="textSecondary">
              Bill Date:
            </Typography>
            <Typography variant="body1">09/08/2022</Typography>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Typography variant="subtitle2" color="textSecondary">
              Due Date:
            </Typography>
            <Typography variant="body1">12/12/2022</Typography>
          </Grid>
          <Grid item xs={12} md={4.8}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ marginRight: 1 }}
            >
              External ID:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                C628DED6-AF0D-4A32-52AF-B0EA71
              </Typography>
              <IconButton
                onClick={() =>
                  handleCopyToClipboard("C628DED6-AF0D-4A32-52AF-B0EA71")
                }
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4.8}>
            <Button
              variant="contained"
              sx={{
                marginLeft: 1,
                marginRight: 1,
                whiteSpace: "nowrap",
                marginBottom: 1,
              }}
            >
              View Invoice
            </Button>
            <Button
              variant="contained"
              sx={{ whiteSpace: "nowrap", marginBottom: 1 }}
            >
              View POD
            </Button>{" "}
          </Grid>
        </Grid>
      </Card>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <TextField
          label="Search"
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
          sx={{ width: "90%" }}
        />
        <Tooltip title="Export Data">
          <IconButton>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell sx={commonTableCellStyle}>
                <TableSortLabel
                  active={orderBy === "SEQ_NO"}
                  direction={orderBy === "SEQ_NO" ? order : "asc"}
                  onClick={() => handleRequestSort("SEQ_NO")}
                >
                  SEQ NO
                </TableSortLabel>
              </TableCell>
              <TableCell sx={commonTableCellStyle}>
                <TableSortLabel
                  active={orderBy === "NAME"}
                  direction={orderBy === "NAME" ? order : "asc"}
                  onClick={() => handleRequestSort("NAME")}
                >
                  NAME
                </TableSortLabel>
              </TableCell>
              <TableCell sx={commonTableCellStyle}>
                <TableSortLabel
                  active={orderBy === "DESCRIPTION"}
                  direction={orderBy === "DESCRIPTION" ? order : "asc"}
                  onClick={() => handleRequestSort("DESCRIPTION")}
                >
                  DESCRIPTION
                </TableSortLabel>
              </TableCell>
              <TableCell sx={commonTableCellStyle}>
                <TableSortLabel
                  active={orderBy === "QUANTITY"}
                  direction={orderBy === "QUANTITY" ? order : "asc"}
                  onClick={() => handleRequestSort("QUANTITY")}
                >
                  QUANTITY
                </TableSortLabel>
              </TableCell>
              <TableCell sx={commonTableCellStyle}>
                <TableSortLabel
                  active={orderBy === "PRICE"}
                  direction={orderBy === "PRICE" ? order : "asc"}
                  onClick={() => handleRequestSort("PRICE")}
                >
                  PRICE
                </TableSortLabel>
              </TableCell>
              <TableCell sx={commonTableCellStyle}>
                <TableSortLabel
                  active={orderBy === "AMOUNT"}
                  direction={orderBy === "AMOUNT" ? order : "asc"}
                  onClick={() => handleRequestSort("AMOUNT")}
                >
                  AMOUNT
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <StyledTableRow key={row.SEQ_NO}>
                <TableCell>{row.SEQ_NO}</TableCell>
                <TableCell>{row.NAME}</TableCell>
                <TableCell>{row.DESCRIPTION}</TableCell>
                <TableCell>{row.QUANTITY}</TableCell>
                <TableCell>{row.PRICE}</TableCell>
                <TableCell>{row.AMOUNT}</TableCell>
              </StyledTableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={5}
                align="right"
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Tax Amount (5.28%)
                </Typography>
              </TableCell>
              <TableCell align="left" style={{ backgroundColor: "#f0f0f0" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  $220.90
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={5}
                align="right"
                style={{ backgroundColor: "#e0e0e0" }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="left" style={{ backgroundColor: "#e0e0e0" }}>
                <Typography variant="h6" fontWeight="bold">
                  $4,403.40
                </Typography>
              </TableCell>
            </TableRow>
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

      <GLBillMemoLinesComponent/>
    </Box>
  );
}

export default GLBillDetailsComponent;
