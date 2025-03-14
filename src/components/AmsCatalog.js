// AmsCatalog.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useThemeContext } from "../context/ThemeContext";
import { getAllAMSCatalogs } from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  TablePagination,
  TableSortLabel,
  Box,
  Button,
  Popover,
  Typography,
  InputAdornment,
  Chip,
  Tooltip,
  Container,

  // Import Tooltip component
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Header from "../controls/Header";
import Footer from "../controls/Footer";
import Loading from "../utils/Loading";
import { styled } from "@mui/material/styles";
import CatalogProductmodal from "../modals/CatalogProductmodal";
import MasterLayout from "../Layout/MasterLayout";

function AmsCatalog() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("Description");
  const [order, setOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useThemeContext();
  const statusButtonRef = useRef(null);
  const [selectedStatusLabel, setSelectedStatusLabel] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]); // State to manage selected items


    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const handleDescriptionClick = (product) => {
      setSelectedProduct(product);
      setModalOpen(true);
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
      setSelectedProduct(null);
    };
  

    // Handle header checkbox to select/deselect all (basic implementation)
    const handleHeaderCheckboxChange = (event) => {
        if (event.target.checked) {
          setSelectedItems(sortedData.map((item) => item._id)); // Assuming each item has a unique _id
        } else {
          setSelectedItems([]);
        }
      };


        // Handle checkbox changes (for row selection - basic implementation)
  const handleCheckboxChange = (event, itemId) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
      marginLeft: "8px", // Adds left margin
      width: "21px",
      height: "21px",
      borderRadius: "4px",
  
      // Checked State
      "&.Mui-checked": {
        outline: "2px solid #FFF !important", // White outline
        boxShadow: "0px 0px 0px 4px green !important", // Black shadow (Brand-3 equivalent)
        backgroundColor: "white !important", // Black background (Brand-3 equivalent)
      },
  
      "&.MuiCheckbox-indeterminate": {
        backgroundColor: "white !important", // Indeterminate state background
      },
  
      // Checkbox Icon Styling
      "& .MuiSvgIcon-root": {
        fontSize: "28px",
        borderRadius: "6px",
      },
    }));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await getAllAMSCatalogs();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page on search
  };

  const handleStatusFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusFilterClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0); // Reset page on filter
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = data.filter((item) => {
    const searchMatch = item.Description.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const statusMatch = statusFilter ? item.Status === statusFilter : true;
    return searchMatch && statusMatch;
  });

  const sortedData = filteredData.sort((a, b) => {
    const isAsc = order === "asc";
    if (orderBy === "Description") {
      if (a.Description < b.Description) return isAsc ? -1 : 1;
      if (a.Description > b.Description) return isAsc ? 1 : -1;
      return 0;
    } else if (orderBy === "Availability") {
      if (a.Availability < b.Availability) return isAsc ? -1 : 1;
      if (a.Availability > b.Availability) return isAsc ? 1 : -1;
      return 0;
    } else if (orderBy === "Status") {
      if (a.Status < b.Status) return isAsc ? -1 : 1;
      if (a.Status > b.Status) return isAsc ? 1 : -1;
      return 0;
    }
    return 0;
  });
  const open = Boolean(anchorEl);
  
  const renderAvailability = (availability) => {
    if (availability === 'available') {
      return (
        <Typography variant="body2" style={{ fontWeight: 600 }}>Available</Typography>
      );
    } else if (availability === 'out') {
      return (
        <>
          <Typography variant="body2" style={{ fontWeight: 600 }}>Out for maintenance</Typography>
          <Typography variant="body2" style={{ fontSize: '0.9em' }}>
            Expected back on <Typography component="span" style={{ fontWeight: 600 }}>23/08/2024</Typography>
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="body2" style={{ fontWeight: 600 }}>Checked out</Typography>
          <Typography variant="body2" style={{ fontSize: '0.9em' }}>
            Expected back on <Typography component="span" style={{ color: '#A91700', fontWeight: 600 }}>22/08/2024</Typography>
          </Typography>
        </>
      );
    }
  };
  return (
    <MasterLayout title="AMS CATALOG">
        <Box sx={{ flex: "1 0 auto" }}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              marginBottom: "8px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Product Description"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mr: 1, minHeight: "56px" }}
              />
              <Button
                ref={statusButtonRef}
                onClick={handleStatusFilterClick}
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
                onClose={handleStatusFilterClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                sx={{
                  "& .MuiPaper-root": { borderRadius: "8px", width: "160px" },
                }}
              >
                <RadioGroup value={statusFilter} onChange={handleStatusChange}>
                  <FormControlLabel
                    value=""
                    control={<Radio sx={{ pl: 2 }} />}
                    label="All"
                  />
                  <FormControlLabel
                    value="active"
                    control={<Radio sx={{ pl: 2 }} />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="inactive"
                    control={<Radio sx={{ pl: 2 }} />}
                    label="Inactive"
                  />
                </RadioGroup>
              </Popover>
            </Box>
            {selectedStatusLabel && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                  borderRadius: "16px",
                  padding: "0px 8px",
                  width: "fit-content",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                  ...(selectedStatusLabel === "active"
                    ? {
                        backgroundColor: "#EDF2E8",
                        color: "#296804",
                        border: "1px solid green",
                      }
                    : selectedStatusLabel === "inactive"
                    ? {
                        backgroundColor: "#F8EEEC",
                        color: "#A91700",
                        border: "1px solid #A91700",
                      }
                    : {
                        border: "1px solid #ccc",
                      }),
                }}
              >
                <Typography variant="body2" sx={{ mr: 1, fontWeight: "bold" }}>
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
    <TableRow style={{ backgroundColor: darkMode ? "#333" : "#f5f5f5" }}>
      <TableCell padding="checkbox">
        <StyledCheckbox
          onChange={handleHeaderCheckboxChange}
          checked={
            sortedData.length > 0 && selectedItems.length === sortedData.length
          }
          sx={{
            ml:8,
            "&.Mui-checked": {
              color: "green",
            },
          }}
        />
      </TableCell>
      <TableCell
        sx={{
          fontWeight: "bold",
          fontSize: "1.1rem",
          width: "30%",
          paddingLeft: "16px", // Add padding here
        }}
      >
        <TableSortLabel
          active={orderBy === "Description"}
          direction={orderBy === "Description" ? order : "asc"}
          onClick={handleSort("Description")}
        >
          Product
        </TableSortLabel>
      </TableCell>
      <TableCell
        sx={{
          fontWeight: "bold",
          fontSize: "1.1rem",
          width: "30%",
        }}
      >
        <TableSortLabel
          active={orderBy === "Availability"}
          direction={orderBy === "Availability" ? order : "asc"}
          onClick={handleSort("Availability")}
        >
          Availability
        </TableSortLabel>
      </TableCell>
      {/* Moved Status to the end */}
      <TableCell
        sx={{
          fontWeight: "bold",
          fontSize: "1.1rem",
          width: "10%", // Adjusted width for Status
          textAlign: "center", // Align Status header to center
        }}
      >
        <TableSortLabel
          active={orderBy === "Status"}
          direction={orderBy === "Status" ? order : "asc"}
          onClick={handleSort("Status")}
        >
          Status
        </TableSortLabel>
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {sortedData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => (
        <TableRow key={row._id}>
          <TableCell padding="checkbox">
            <StyledCheckbox
              checked={selectedItems.includes(row._id)}
              onChange={(event) => handleCheckboxChange(event, row._id)}
              sx={{
                ml:8,
                "&.Mui-checked": {
                  color: "green",
                },
              }}
            />
          </TableCell>
          <TableCell
            style={{
              width: "30%",
              maxWidth: "30%",
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
              paddingLeft: "16px", // Add padding here
            }}
          >
            <Tooltip
              title={
                <>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ fontWeight: "bold" }}
                    >
                      Description:
                    </Typography>{" "}
                    {row.Description}
                  </div>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ fontWeight: "bold" }}
                    >
                      MfrCode:
                    </Typography>{" "}
                    {row.MfrCode ? ` ${row.MfrCode}` : ""}
                  </div>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ fontWeight: "bold" }}
                    >
                      Catalog:
                    </Typography>{" "}
                    {row.Catalog ? ` ${row.Catalog}` : ""}
                  </div>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ fontWeight: "bold" }}
                    >
                      Customer:
                    </Typography>{" "}
                    {row.customer}
                  </div>
                </>
              }
              placement="bottom-start"
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      row.url
                        ? row.url
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                    }
                    alt="Description Image"
                    style={{
                      marginRight: "8px",
                      height: "40px",
                      width: "40px",
                    }}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src =
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
                    }}
                  />
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 1, // Allow text to take remaining space
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "green", // Add the color property here
                        }}
                      >
                        <Typography
                          component="button" // Use Typography as a button
                          onClick={() => handleDescriptionClick(row)} // Open modal on click
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: darkMode ? "lightblue" : "blue",
                            textAlign: "left", // Align text to the left within the cell
                            display: "block", // Make it take full width for better click area
                            padding: "0", // Reset padding for button-like appearance
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          {row.Description}
                        </Typography>
                      </div>
                    </div>
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        style={{
                          fontWeight: "bold",
                          marginRight: "4px",
                        }}
                      >
                        MfrCode:
                      </Typography>
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {row.MfrCode ? ` ${row.MfrCode}` : ""}
                      </div>
                      {row.MfrCode && row.Catalog ? " | " : ""}
                      <Typography
                        variant="subtitle2"
                        style={{
                          fontWeight: "bold",
                          marginLeft: "4px",
                          marginRight: "4px",
                        }}
                      >
                        Catalog:
                      </Typography>
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {row.Catalog ? ` ${row.Catalog}` : ""}
                      </div>
                    </div>
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: "bold" }}
                      >
                        Customer:
                      </Typography>{" "}
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.customer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tooltip>
          </TableCell>
          <TableCell
            style={{
              width: "30%",
              maxWidth: "30%",
            }}
          >
            {renderAvailability(row.Availability)}
          </TableCell>
          {/* Status moved to the end */}
          <TableCell
            style={{
              width: "10%", // Adjusted width for Status
              maxWidth: "10%",
              textAlign: "center", // Align Status content to center
            }}
          >
            <Tooltip title={row.Status}>
              {row.Status === "active" ? (
                <Chip
                  icon={<CheckCircleIcon style={{ color: "#296804" }} />}
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
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
     
      <Loading isLoading={isLoading} />
      <CatalogProductmodal // Render the Modal
        open={modalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
      />
    </MasterLayout>
  );
}

export default AmsCatalog;
