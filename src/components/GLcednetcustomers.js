// GLcednetcustomers.js (Parent Component)
import React, { useState, useEffect } from "react";
import MasterLayout from "../Layout/MasterLayout";
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
  Box,
  Typography,
  Pagination,
  useTheme,
  TableSortLabel,
  Link,
  Modal,
  Alert,
  Snackbar, useMediaQuery, // Import useMediaQuery
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import customersData from "../data/cednetcustomers.json";
import CustomAlertRibbon from "../controls/CustomAlertRibbon";
import RightPanel from "../controls/RightPanelCednetcustomer";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ArrowBack } from "@mui/icons-material";


const GLcednetcustomers = () => {
  const [customers, setCustomers] = useState(customersData);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [panelTitle, setPanelTitle] = useState("Edit CEDNET Customer");
  const [isReadOnly, setIsReadOnly] = useState(false); // New state for readonly mode



  const handleBack = () => {
    navigate("/glmanagecustomer"); // Redirect to /glmanagecustomer
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSort = (property) => (event) => {
    const isAsc = sortColumn === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(property);
  };

  const sortedCustomers = React.useMemo(() => {
    let sorted = [...customers];

    if (sortColumn) {
      sorted.sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sorted;
  }, [customers, sortColumn, sortDirection]);

  const filteredCustomers = React.useMemo(() => {
    return sortedCustomers.filter((customer) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        customer.pc.toLowerCase().includes(searchLower) ||
        customer.cednetCustomer.toLowerCase().includes(searchLower) ||
        customer.pricingAccount.toLowerCase().includes(searchLower)
      );
    });
  }, [sortedCustomers, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentCustomers = React.useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredCustomers.slice(startIndex, endIndex);
  }, [filteredCustomers, page, rowsPerPage]);

  const handleOpenPanel = (customer, readOnly = false) => {
    setSelectedCustomer(customer);
    setPanelTitle(readOnly ? "View CEDNET Customer" : "Edit CEDNET Customer");
    setIsReadOnly(readOnly);
    setIsPanelOpen(true);
  };

  const handleOpenAddPanel = () => {
    setSelectedCustomer(null);
    setPanelTitle("Add CEDNET Customer");
    setIsReadOnly(false);
    setIsPanelOpen(true);
  };
  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedCustomer(null);
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Simulate delete operation (replace with your actual delete logic)
    setCustomers((prevCustomers) =>
      prevCustomers.filter((c) => c.pc !== customerToDelete.pc)
    );
    setDeleteModalOpen(false);
    setSnackbarMessage("Customer deleted successfully!");
    setSnackbarOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setCustomerToDelete(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <MasterLayout title={"CED NET CUSTOMERS"}>
      <Box
        sx={{
          padding: "20px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "5px",
          backgroundColor: theme.palette.background.paper,
          position: "relative",
        }}
      >
        {isPanelOpen && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              zIndex: 1100,
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row", // Stack on small screens
            justifyContent: "space-between",
            alignItems: isSmallScreen ? "flex-start" : "center", // Align left on small screens
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: "1.5rem",
              color: theme.palette.text.primary,
              mb: isSmallScreen ? 1 : 0, // Add margin bottom on small screens
            }}
          >
            CEDNET Customers
          </Typography>
          <Box display="flex" sx={{ mt: isSmallScreen ? 1 : 0 }}>
            <Button
              variant="outlined"
              sx={{ mr: 1, textTransform: "none", fontWeight: 600 }}
              onClick={handleBack}
              startIcon={<ArrowBack />} // Add the back arrow icon
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", fontWeight: 600 }}
              onClick={handleOpenAddPanel}


            >
              + Add CEDNET Customer
            </Button>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: "0.875rem",
            color: theme.palette.text.secondary,
          }}
        >
          Manage customer accounts and pricing information
        </Typography>
        <CustomAlertRibbon message="The pricing accounts are used for GL product catalog price refresh." />
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            label="Search customers..."
            variant="outlined"
            fullWidth
            sx={{
              mr: 1,
              height: "56px",
              backgroundColor: theme.palette.background.paper,
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{ color: theme.palette.action.active, mr: 1, my: 0.5 }}
                />
              ),
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor:
                  theme.palette.grey[
                    theme.palette.mode === "light" ? 200 : 800
                  ],
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  <TableSortLabel
                    active={sortColumn === "pc"}
                    direction={sortColumn === "pc" ? sortDirection : "asc"}
                    onClick={handleSort("pc")}
                  >
                    PC
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  <TableSortLabel
                    active={sortColumn === "cednetCustomer"}
                    direction={
                      sortColumn === "cednetCustomer" ? sortDirection : "asc"
                    }
                    onClick={handleSort("cednetCustomer")}
                  >
                    CEDNET CUSTOMER
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  <TableSortLabel
                    active={sortColumn === "pricingAccount"}
                    direction={
                      sortColumn === "pricingAccount" ? sortDirection : "asc"
                    }
                    onClick={handleSort("pricingAccount")}
                  >
                    PRICING ACCOUNT
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: theme.palette.background.paper }}>
              {currentCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontSize: "0.875rem",
                      color: theme.palette.text.primary,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {customer.pc}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "0.875rem",
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Link
                      href="#"
                      underline="none"
                      sx={{ color: theme.palette.primary.main }}
                      onClick={() => handleOpenPanel(customer, true)}
                    >
                      {customer.cednetCustomer}
                    </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "0.875rem",
                      color: theme.palette.text.primary,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {customer.pricingAccount}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, textTransform: "none", fontSize: "0.75rem" }}
                    >
                      NOTIFICATION SETTINGS
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenPanel(customer)}
                      sx={{
                        mr: 1,
                        textTransform: "none",
                        fontSize: "0.75rem",
                        color: theme.palette.primary.main,
                        
                      }}
                    >
                      EDIT
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.75rem",
                        color: theme.palette.error.main,
                      }}
                      onClick={() => handleDeleteClick(customer)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: "0.875rem", color: theme.palette.text.secondary }}
          >
            Showing {(page - 1) * rowsPerPage + 1}-
            {Math.min(page * rowsPerPage, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} entries
          </Typography>
          <Pagination
            count={Math.ceil(filteredCustomers.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Box>
      <RightPanel isOpen={isPanelOpen} onClose={handleClosePanel} title={panelTitle} readOnly={isReadOnly} />
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      textAlign: 'center',
      borderRadius: '4px',
    }}
  >
    <Typography variant="subtitle2" component="h2"  sx={{ mb: 3 }}>
      Are you sure you want to delete the customer ?
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2, px: 3, py: 1.5, borderRadius: '4px', textTransform: 'uppercase', width: '100%' }}
        onClick={handleConfirmDelete}
      >
        YES
      </Button>
      <Button
        variant="outlined"
        sx={{ px: 3, py: 1.5, borderRadius: '4px', textTransform: 'uppercase', width: '100%' }}
        onClick={handleCloseDeleteModal}
      >
        CANCEL
      </Button>
    </Box>
  </Box>
</Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MasterLayout>
  );
};

export default GLcednetcustomers;
