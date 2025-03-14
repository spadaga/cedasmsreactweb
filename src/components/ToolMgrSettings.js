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
  TableSortLabel,
  TablePagination,
  Tooltip,
  Chip,
  FormControlLabel,
  Modal,
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  IconButton,
  Divider,
  InputAdornment,
  useTheme, // Import useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../utils/toastUtils";
import Loading from "../utils/Loading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import MasterLayout from "../Layout/MasterLayout";

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
  const theme = useTheme(); // Use useTheme hook

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
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    } else {
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <MasterLayout title="Tool Manager Settings">
      <Box sx={{ flex: "1 0 auto" }}>
        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`, // Use theme divider
            borderRadius: "4px",
            padding: "8px",
            marginBottom: "8px",
            background:
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : "#f5f5f5", // Use theme background
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
              sx={{
                mr: 1,
                minHeight: "56px",
                background: theme.palette.background.paper,
              }} // Use theme background
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
                style={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
                }} // Use theme background
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

      <Loading isLoading={isLoading} />
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
            bgcolor: theme.palette.background.paper, // Use theme background
            border: `2px solid ${theme.palette.divider}`, // Use theme divider
            boxShadow: theme.shadows[24], // Use theme shadows
          }}
        >
          <Box sx={{ p: 1 }}>
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
                Add Catalog
              </Typography>
              <IconButton aria-label="close" onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ pl: 2, pr: 2 }}>
            <TextField
              label="Catalog Name*"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
          <Divider sx={{ my: 0, mt: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 0,
              bgcolor: theme.palette.grey[100], // Use theme background
              p: 2,
            }}
          >
            <Button variant="contained" color="primary" sx={{ mr: 1 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </MasterLayout>
  );
};

export default ToolMgrSettings;
