import React, { useEffect, useState, useRef } from "react";
import { getAllAmsusers } from "../services/api";
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
  Tooltip,
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Popover,
  IconButton,
  Typography, InputAdornment
} from "@mui/material";
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
import SearchIcon from '@mui/icons-material/Search';
import MasterLayout from "../Layout/MasterLayout";

const AmsUsers = () => {
  const [amsUsers, setAMSUsers] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstname");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useThemeContext();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const statusButtonRef = useRef(null);
  const [selectedStatusLabel, setSelectedStatusLabel] = useState(null);

  useEffect(() => {
    fetchAMSUsers();
  }, []);

  const fetchAMSUsers = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await getAllAmsusers();
      setAMSUsers(response.data);
    } catch (error) {
      showToast("error", "Error fetching AMS users");
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

  const filteredAMSUsers = amsUsers.filter(
    (user) =>
      user.firstname.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedAMSUsers = filteredAMSUsers.sort((a, b) => {
    return order === "asc"
      ? a[orderBy].localeCompare(b[orderBy])
      : b[orderBy].localeCompare(a[orderBy]);
  });

  const handleSelectUser = (userId) => {
    const selectedIndex = selectedUsers.indexOf(userId);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, userId);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
    setSelectAll(newSelectedUsers.length === sortedAMSUsers.length);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedUsers = sortedAMSUsers.map((user) => user._id);
      setSelectedUsers(newSelectedUsers);
      setSelectAll(true);
    } else {
      setSelectedUsers([]);
      setSelectAll(false);
    }
  };

  const handleStatusButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setAnchorEl(null);
    if (event.target.value) {
      setSelectedStatusLabel(event.target.value);
    } else {
      setSelectedStatusLabel(null);
    }
  };
  const handleCloseSelectedStatus = () => {
    setStatusFilter("");
    setSelectedStatusLabel(null);
  };
  const open = Boolean(anchorEl);
  return (
    <MasterLayout title="AMS Users List">
    
        <Box sx={{ flex: "1 0 auto" }}>
        <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
              marginBottom: '8px',
            }}
          >

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              value={search}
              onChange={handleSearch}
              placeholder="Email, first name, last name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mr: 1, minHeight: '56px' }}
              />

            <Button
              ref={statusButtonRef}
              onClick={handleStatusButtonClick}
              variant="outlined"
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                minHeight: "56px",
                mt: 1,
              }}
            >
              Status
              <IconButton size="small" sx={{ ml: 1 }}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{
                "& .MuiPaper-root": { borderRadius: "8px", width: "160px" },
              }}
            >
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="status"
                  name="status"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                >
                  <FormControlLabel
                    value="Active"
                    control={<Radio sx={{ pl: 2 }} />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="Inactive"
                    control={<Radio sx={{ pl: 2 }} />}
                    label="Inactive"
                  />
                </RadioGroup>
              </FormControl>
            </Popover>
          </Box>
          {selectedStatusLabel && (
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 1,
                borderRadius: '16px',
                padding: '0px 8px',
                width: 'fit-content',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                },
                ...(selectedStatusLabel === 'Active'
                    ? {
                        backgroundColor: '#EDF2E8',
                        color: '#296804',
                        border: '1px solid green',
                    }
                    : selectedStatusLabel === 'Inactive'
                    ? {
                        backgroundColor: '#F8EEEC',
                        color: '#A91700',
                        border: '1px solid #A91700',
                    }
                    : {
                        border: '1px solid #ccc',
                    }),
                }}
            >
              <Typography variant="body2" sx={{ mr: 1,fontWeight:"bold"}}>
                {selectedStatusLabel}
              </Typography>
              <IconButton size="small" onClick={handleCloseSelectedStatus}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  style={{ backgroundColor: darkMode ? "#333" : "#f5f5f5" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < sortedAMSUsers.length
                      }
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "firstname"}
                      direction={orderBy === "firstname" ? order : "asc"}
                      onClick={() => handleRequestSort("firstname")}
                    >
                      First Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "lastname"}
                      direction={orderBy === "lastname" ? order : "asc"}
                      onClick={() => handleRequestSort("lastname")}
                    >
                      Last Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "email"}
                      direction={orderBy === "email" ? order : "asc"}
                      onClick={() => handleRequestSort("email")}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "status"}
                      direction={orderBy === "status" ? order : "asc"}
                      onClick={() => handleRequestSort("status")}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAMSUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user._id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.indexOf(user._id) !== -1}
                          onChange={() => handleSelectUser(user._id)}
                        />
                      </TableCell>
                      <TableCell>{user.firstname}</TableCell>
                      <TableCell>{user.lastname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Tooltip title={user.status}>
                          {user.status === "active" ? (
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
            count={sortedAMSUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <ToastContainer />
        </Box>
     
      <Loading isLoading={isLoading} />
    </MasterLayout>
  );
};

export default AmsUsers;
