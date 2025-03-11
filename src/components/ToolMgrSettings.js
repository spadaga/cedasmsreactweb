import React, { useEffect, useState } from "react";

import { useThemeContext } from "../context/ThemeContext";
import { getAllSettings } from "../services/api";
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
  Tooltip,
  Chip,
  FormControl,
  RadioGroup,
  Radio,
  Popover,
  InputAdornment,
  Modal,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../utils/toastUtils";
import Header from "../controls/Header";
import Footer from "../controls/Footer";
import Loading from "../utils/Loading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

const ToolMgrSettings = () => {
  const [settings, setSettings] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("CustomerName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useThemeContext();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    fetchToolMgrSettings();
  }, []);

  const fetchToolMgrSettings = async () => {
    setIsLoading(true);
    try {
      const response = await getAllSettings();
      setSettings(response.data);
    } catch (error) {
      showToast("error", "Error fetching ToolMgrSettings");
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredSettings = settings.filter((setting) =>
    setting.CustomerName.toLowerCase().includes(search.toLowerCase())
  );
  const sortedSettings = filteredSettings.sort((a, b) => {
    if (orderBy === "no_of_products") {
      // Numeric comparison
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    } else {
      // String comparison for other columns (CustomerName, Status)
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {" "}
      <Header title="Tool Manager Settings" />
      <Container sx={{ flex: 1, paddingBottom: "60px", marginTop: "16px" }}>
        <Box sx={{ flex: "1 0 auto" }}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              marginBottom: "8px",
              background: "#f5f5f5",
              display: "flex", // Add display flex
              alignItems: "center", // Align items vertically
              justifyContent: "space-between", // Space between search and button
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "80%" }}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={handleSearch}
                placeholder="Customer Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mr: 1, minHeight: "56px", background: "white" }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "56px" }}
              onClick={handleOpenModal}
            >
              Add Catalog
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  style={{ backgroundColor: darkMode ? "#333" : "#f5f5f5" }}
                >
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "CustomerName"}
                      direction={orderBy === "CustomerName" ? order : "asc"}
                      onClick={() => handleRequestSort("CustomerName")}
                    >
                      Customer Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "no_of_products"}
                      direction={orderBy === "no_of_products" ? order : "asc"}
                      onClick={() => handleRequestSort("no_of_products")}
                    >
                      No. of Products
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "Status"}
                      direction={orderBy === "Status" ? order : "asc"}
                      onClick={() => handleRequestSort("Status")}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedSettings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((setting) => (
                    <TableRow key={setting._id}>
                      <TableCell>{setting.CustomerName}</TableCell>
                      <TableCell>{setting.no_of_products}</TableCell>
                      <TableCell>
                        <Tooltip title={setting.Status}>
                          {setting.Status === "active" ? (
                            <Chip
                              icon={
                                <CheckCircleIcon style={{ color: "#296804" }} />
                              }
                              label="Active"
                              style={{
                                backgroundColor: "#EDF2E8",
                                color: "#296804",
                                border: "1px solid green",
                              }}
                              size="small"
                            />
                          ) : (
                            <Chip
                              icon={<CancelIcon style={{ color: "#A91700" }} />}
                              label="Inactive"
                              style={{
                                backgroundColor: "#F8EEEC",
                                color: "#A91700",
                                border: "1px solid #A91700",
                              }}
                              size="small"
                            />
                          )}
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={sortedSettings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Container>
      <Footer sx={{ flexShrink: 0 }} />
      <Loading isLoading={isLoading} />
      {/* Add Catalog Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-catalog-modal-title"
        aria-describedby="add-catalog-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            // Remove padding from the outer Box
          }}
        >
          <Box sx={{ p: 1 }}>
            {" "}
            {/* Add padding to the inner Box */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0,
              }}
            >
              <Typography
                id="add-catalog-modal-title"
                variant="h6"
                component="h2"
                fontWeight="bold"
              >
                {" "}
                {/* Make header bold */}
                Add Catalog
              </Typography>
              <IconButton aria-label="close" onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>{" "}
          <Divider /> {/* Add divider below header */}
          <Box sx={{ pl:2,pr:2}}>
            {" "}
            {/* Add padding to the inner Box */}
            <TextField
              label="Catalog Name*"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {" "}
              {/* Add flexDirection: 'column' and gap */}
              <FormControlLabel control={<Checkbox />} label="Active" />
              <FormControlLabel
                control={<Checkbox />}
                label="Enable Reminders"
              />
            </Box>
            <TextField
              label="Notification Emails"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>
          <Divider sx={{ my: 0,mt:1 }} /> {/* Add divider above buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 0,
              bgcolor: "grey.100",
              p: 2,
            }}
          >
            {" "}
            {/* Add background color */}
            <Button variant="contained" color="primary" sx={{ mr: 1 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ToolMgrSettings;
