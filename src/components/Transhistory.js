import React, { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import { useThemeContext } from "../context/ThemeContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TableSortLabel,
  TablePagination,
  TextField,
  Box,
  Checkbox,
  Chip,
  IconButton,
  Typography,
  InputAdornment,
  Collapse,
  Menu,
  Button,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../utils/toastUtils";
import Header from "../controls/Header";
import Footer from "../controls/Footer";
import Loading from "../utils/Loading";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

const StyledTableCell = styled(TableCell)(({ theme, expanded }) => ({
  fontSize: "0.9rem",
  fontFamily: "Roboto, sans-serif",
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: "12px 16px",
  borderLeft: expanded ? `4px solid ${theme.palette.primary.main}` : "none", // Add border-left when expanded
}));

const StyledTableHeadCell = styled(StyledTableCell)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: theme.palette.action.hover,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: "16px",
  padding: "4px 8px",
  fontSize: "0.8rem",
  fontWeight: 500,
}));

const ChildTableContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.action.hover,
}));

const RelatedOrdersLabel = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const ChildTable = styled(Table)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  "& .MuiTableCell-root": {
    padding: "8px 16px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, expanded }) => ({
  "&.MuiTableRow-root": {
    // Target the root of the TableRow
    borderLeft: expanded ? `4px solid ${theme.palette.primary.main}` : "none", // Add border-left when expanded
  },
}));

const StyledChildTable = styled(Table)(({ theme }) => ({
  maxHeight: "300px",
  overflowY: "auto",

  display: "block",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.action.hover,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[500],
    borderRadius: "4px",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[700],
  },
}));

const Transhistory = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useThemeContext();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [productAnchorEl, setProductAnchorEl] = useState(null);

  const [productFilter, setProductFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);

  const [productOpen, setProductOpen] = useState(false);

  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs()); // Initialize with today's date
  const [endDate, setEndDate] = useState(dayjs()); // Initialize with today's date

  const [typeAnchorEl, setTypeAnchorEl] = useState(null);
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [mfrFilter, setMfrFilter] = useState("");
const [catalogFilter, setCatalogFilter] = useState("");
const [yourCatalogFilter, setYourCatalogFilter] = useState("");
const [selectedStartDate, setSelectedStartDate] = useState(null);
const [selectedEndDate, setSelectedEndDate] = useState(null);

const [productApplyClicked, setProductApplyClicked] = useState(false);
const [dateApplyClicked, setDateApplyClicked] = useState(false);


  const handleProductClick = (event) => {
    setProductAnchorEl(event.currentTarget);
    setProductOpen(!productOpen);
  };

  const handleDateClick = (event) => {
    setDateAnchorEl(event.currentTarget);
    setDateOpen(!dateOpen);
  };

  const handleTypeClick = (event) => {
    setTypeAnchorEl(event.currentTarget);
    setTypeOpen(!typeOpen);
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleProductSelect = (option) => {
    setProductFilter(option);
    setProductOpen(false);
  };

  const handleDateSelect = (option) => {
    setDateFilter(option);
    setDateOpen(false);
  };

  const handleTypeSelect = (option) => {
    setTypeFilter(option);
    setTypeOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      showToast("error", "Error fetching orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.type.toLowerCase().includes(search.toLowerCase()) ||
      order.inventory.toLowerCase().includes(search.toLowerCase()) ||
      order.po.toLowerCase().includes(search.toLowerCase()) ||
      order.jobName.toLowerCase().includes(search.toLowerCase()) ||
      order.account.toLowerCase().includes(search.toLowerCase())
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    return order === "asc"
      ? a[orderBy].localeCompare(b[orderBy])
      : b[orderBy].localeCompare(a[orderBy]);
  });

  const handleSelectOrder = (orderId) => {
    const selectedIndex = selectedOrders.indexOf(orderId);
    let newSelectedOrders = [];

    if (selectedIndex === -1) {
      newSelectedOrders = newSelectedOrders.concat(selectedOrders, orderId);
    } else if (selectedIndex === 0) {
      newSelectedOrders = newSelectedOrders.concat(selectedOrders.slice(1));
    } else if (selectedIndex === selectedOrders.length - 1) {
      newSelectedOrders = newSelectedOrders.concat(selectedOrders.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedOrders = newSelectedOrders.concat(
        selectedOrders.slice(0, selectedIndex),
        selectedOrders.slice(selectedIndex + 1)
      );
    }

    setSelectedOrders(newSelectedOrders);
    setSelectAll(newSelectedOrders.length === sortedOrders.length);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedOrders = sortedOrders.map((order) => order._id);
      setSelectedOrders(newSelectedOrders);
      setSelectAll(true);
    } else {
      setSelectedOrders([]);
      setSelectAll(false);
    }
  };

  const handleRowClick = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      "In Process": { color: "success", label: "In Process" },
      "Back Ordered": { color: "warning", label: "Back Ordered" },
      "Could Not Deliver": { color: "error", label: "Could Not Deliver" },
    };

    const config = statusConfig[status] || { color: "default", label: status };

    return (
      <StyledChip label={config.label} color={config.color} size="small" />
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Header title="Transaction History" />
      <Container sx={{ flex: 1, pb: "60px", mt: 2 }}>
        <Box sx={{ mb: 2, p: 1, border: "1px solid #ccc", borderRadius: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              placeholder="Search for Inventory, Account #, Job Name, or PO"
              variant="outlined"
              size="small"
              sx={{
                borderRadius: "4px",
                padding: "4px 8px", // Adjusted padding
                fontSize: "0.9rem",
                border: "0px solid #ccc", // Added border
                width: "70%", // Increased width
                "& .MuiOutlinedInput-root": {
                  paddingRight: "8px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  paddingRight: "0px", // Remove default right padding
                },
              }}
            />

            {/* Product Button */}
            <Button
              onClick={handleProductClick}
              sx={{
                ml: 1,
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "0.9rem",
                border: "1px solid #ccc", // Added border

                "&:hover": {
                  backgroundColor: "transparent", // Removed hover background
                },
              }}
              endIcon={productOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              Product
            </Button>
            <Menu
              anchorEl={productAnchorEl}
              open={productOpen}
              onClose={() => setProductOpen(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                sx: {
                  width: 240, // Set an explicit width
                  mt: 0.5,
                },
              }}
              MenuListProps={{
                sx: {
                  mt: 1, // Add top margin to the menu list
                },
              }}
            >
              <Box sx={{ p: 2, minWidth: 140 }}>
                {" "}
                {/* Added Box to wrap the content */}
                <TextField
                  label="MFR"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                  value={mfrFilter}
                  onChange={(e) => setMfrFilter(e.target.value)}
                />
                <TextField
                  label="Catalog #"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                  value={catalogFilter}
                  onChange={(e) => setCatalogFilter(e.target.value)}
                />
                <TextField
                  label="Your Catalog #"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={yourCatalogFilter}
                  onChange={(e) => setYourCatalogFilter(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    // Apply logic here (you can add filter logic later)
                    setProductOpen(false);
                    setProductApplyClicked(true); // Update state
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Menu>

            {/* Date Button */}
            {/* Date Button */}
            <Button
              onClick={handleDateClick}
              sx={{
                ml: 1,
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "0.9rem",
                border: "1px solid #ccc",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              endIcon={dateOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              Date
            </Button>
            <Menu
              anchorEl={dateAnchorEl}
              open={dateOpen}
              onClose={() => setDateOpen(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  width: 450, // Set an explicit width
                  mt: 0.5,
                },
              }}
              MenuListProps={{
                sx: {
                  mt: 1, // Add top margin to the menu list
                },
              }}
            >
              <Box sx={{ padding: "0 16px", minWidth: 450 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              sx={{ width: "48%" }}
                            />
                          )}
                          sx={{ mr: 1 }} // Added right margin to DatePicker
                        />
                        <DatePicker
                          label="End Date"
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              sx={{ width: "48%" }}
                            />
                          )}
                          sx={{ ml: 1 }} // Added left margin to DatePicker
                        />
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          setSelectedStartDate(startDate);
                          setSelectedEndDate(endDate);
                          setDateOpen(false);
                          setDateApplyClicked(true); // Update state
                        }}
                      >
                        Apply
                      </Button>
                    </Box>
                  </LocalizationProvider>
                </Box>
              </Box>
            </Menu>

            {/* Type Button */}

            {/* Type Button */}
            <Button
              onClick={handleTypeClick}
              sx={{
                ml: 1,
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "0.9rem",
                border: "1px solid #ccc",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              endIcon={typeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              Type
            </Button>
            <Menu
              anchorEl={typeAnchorEl}
              open={typeOpen}
              onClose={() => setTypeOpen(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                sx: {
                  width: 240, // Set an explicit width
                  mt: 0.5,
                },
              }}
              MenuListProps={{
                sx: {
                  mt: 1, // Add top margin to the menu list
                },
              }}
            >
              <div style={{ padding: "0 16px" }}>
                {" "}
                {/* Removed MenuListProps */}
                <Box sx={{ display: "block" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTypes.includes("Replenishments")}
                        onChange={() => handleTypeChange("Replenishments")}
                      />
                    }
                    label="Replenishments"
                  />
                </Box>
                <Box sx={{ display: "block" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTypes.includes("Adjustment")}
                        onChange={() => handleTypeChange("Adjustment")}
                      />
                    }
                    label="Adjustment"
                  />
                </Box>
                <Box sx={{ display: "block" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTypes.includes("Cycle Count")}
                        onChange={() => handleTypeChange("Cycle Count")}
                      />
                    }
                    label="Cycle Count"
                  />
                </Box>
                <Box sx={{ display: "block" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTypes.includes("Transfer")}
                        onChange={() => handleTypeChange("Transfer")}
                      />
                    }
                    label="Transfer"
                  />
                </Box>
              </div>
            </Menu>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
            {productApplyClicked && mfrFilter && (
              <Chip
                label={`MFR: ${mfrFilter}`}
                sx={{ mr: 1, mb: 1 }}
                onDelete={() => {
                  setMfrFilter("");
                  setProductApplyClicked(false);
                }}
              />
            )}
            {productApplyClicked && catalogFilter && (
              <Chip
                label={`Catalog #: ${catalogFilter}`}
                sx={{ mr: 1, mb: 1 }}
                onDelete={() => {
                  setCatalogFilter("");
                  setProductApplyClicked(false);
                }}
              />
            )}
            {productApplyClicked && yourCatalogFilter && (
              <Chip
                label={`Your Catalog #: ${yourCatalogFilter}`}
                sx={{ mr: 1, mb: 1 }}
                onDelete={() => {
                  setYourCatalogFilter("");
                  setProductApplyClicked(false);
                }}
              />
            )}
            {dateApplyClicked && selectedStartDate && (
              <Chip
                label={`Start Date: ${selectedStartDate.format(
                  "YYYY-MM-DD"
                )} `}
                sx={{ mr: 1, mb: 1 }}
                onDelete={() => {
                  setSelectedStartDate(null);
                  setSelectedEndDate(null);
                  setDateApplyClicked(false);
                }}
              />
            )}


      {dateApplyClicked &&  selectedEndDate && (
                    <Chip
                      label={`End Date:  ${selectedEndDate.format("YYYY-MM-DD")}`}
                      sx={{ mr: 1, mb: 1 }}
                      onDelete={() => {
                        setSelectedStartDate(null);
                        setSelectedEndDate(null);
                        setDateApplyClicked(false);
                      }}
                    />
                  )}
            {selectedTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                sx={{ mr: 1, mb: 1 }}
                onDelete={() => handleTypeChange(type)}
              />
            ))}
          </Box>
        </Box>

        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeadCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedOrders.length > 0 &&
                      selectedOrders.length < sortedOrders.length
                    }
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </StyledTableHeadCell>
                <StyledTableHeadCell />
                <StyledTableHeadCell>
                  <TableSortLabel
                    active={orderBy === "type"}
                    direction={orderBy === "type" ? order : "asc"}
                    onClick={() => handleRequestSort("type")}
                  >
                    Type
                  </TableSortLabel>
                </StyledTableHeadCell>
                <StyledTableHeadCell>
                  <TableSortLabel
                    active={orderBy === "inventory"}
                    direction={orderBy === "inventory" ? order : "asc"}
                    onClick={() => handleRequestSort("inventory")}
                  >
                    Inventory
                  </TableSortLabel>
                </StyledTableHeadCell>
                <StyledTableHeadCell>
                  <TableSortLabel
                    active={orderBy === "date"}
                    direction={orderBy === "date" ? order : "asc"}
                    onClick={() => handleRequestSort("date")}
                  >
                    Date
                  </TableSortLabel>
                </StyledTableHeadCell>
                <StyledTableHeadCell>PO</StyledTableHeadCell>
                <StyledTableHeadCell>Job Name</StyledTableHeadCell>
                <StyledTableHeadCell>Account</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <React.Fragment key={order._id}>
                    <StyledTableRow
                      expanded={expandedRow === order._id}
                      hover
                      onClick={() => handleRowClick(order._id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          checked={selectedOrders.indexOf(order._id) !== -1}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectOrder(order._id);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton size="small">
                          {expandedRow === order._id ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell>{order.type}</StyledTableCell>
                      <StyledTableCell>{order.inventory}</StyledTableCell>
                      <StyledTableCell>{order.date}</StyledTableCell>
                      <StyledTableCell>{order.po}</StyledTableCell>
                      <StyledTableCell>{order.jobName}</StyledTableCell>
                      <StyledTableCell>{order.account}</StyledTableCell>
                    </StyledTableRow>
                    <TableRow sx={{ width: "100%" }}>
                      <StyledTableCell
                        colSpan={8}
                        sx={{ p: 0, border: 0 }}
                        expanded={expandedRow === order._id} // Pass expanded prop
                      >
                        <Collapse
                          in={expandedRow === order._id}
                          timeout="auto"
                          unmountOnExit
                          sx={{ width: "100%" }}
                        >
                          <ChildTableContainer sx={{ width: "100%" }}>
                            <RelatedOrdersLabel>
                              Related Orders ({order.childOrders.length})
                            </RelatedOrdersLabel>
                            <StyledChildTable sx={{ width: "100%" }}>
                              <TableHead sx={{ width: "100%" }}>
                                <TableRow sx={{ width: "100%" }}>
                                  <StyledTableHeadCell sx={{ width: "40%" }}>
                                    Order Number
                                  </StyledTableHeadCell>
                                  <StyledTableHeadCell sx={{ width: "30%" }}>
                                    Order Date
                                  </StyledTableHeadCell>
                                  <StyledTableHeadCell sx={{ width: "30%" }}>
                                    Order Status
                                  </StyledTableHeadCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ width: "100%" }}>
                                {order.childOrders.map((childOrder) => (
                                  <TableRow key={childOrder.orderNumber}>
                                    <StyledTableCell sx={{ width: "40%" }}>
                                      {childOrder.orderNumber}
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ width: "30%" }}>
                                      {childOrder.orderDate}
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ width: "30%" }}>
                                      {getStatusChip(childOrder.orderStatus)}
                                    </StyledTableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </StyledChildTable>
                          </ChildTableContainer>
                        </Collapse>
                      </StyledTableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={sortedOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      <Footer />
      <Loading isLoading={isLoading} />
      <ToastContainer />
    </Box>
  );
};

export default Transhistory;
