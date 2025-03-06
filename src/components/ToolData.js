import React, { useEffect, useState } from "react";
import { getToolData } from "../services/api";
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
  InputAdornment,
  Checkbox, // Import Checkbox component
  Tooltip,
  Typography, // Import Tooltip component
  Modal, // Import Modal component
  Link,
  Stack,
  Hidden, // Import Link component
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../utils/toastUtils";
import Header from "../controls/Header";
import Footer from "../controls/Footer";
import Loading from "../utils/Loading";
import SearchIcon from "@mui/icons-material/Search";
import CustomCheckbox from "../controls/CustomCheckbox";
import WarningAmberIcon from "@mui/icons-material/WarningAmber"; // Import WarningAmberIcon
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid"; // Import Grid for layout
import Button from "@mui/material/Button";

const ToolData = () => {
  const [toolData, setToolData] = useState([]);
  const [invToolData, setInvToolData] = useState([]); // Corrected state name
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Description");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useThemeContext();
  const [selectedItems, setSelectedItems] = useState([]); // State to manage selected items

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [invSearch, setInvSearch] = useState("");
  const [invOrder, setInvOrder] = useState("asc");
  const [invOrderBy, setInvOrderBy] = useState("Item");
  const [invPage, setInvPage] = useState(0);
  const [invRowsPerPage, setInvRowsPerPage] = useState(5);

  useEffect(() => {
    fetchToolData();
    fetchInventoryToolData();
  }, []);

  const fetchToolData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await getToolData();
      setToolData(response.data);
    } catch (error) {
      showToast("error", "Error fetching Tool Data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventoryToolData = async () => {
    try {
      const response = await getToolData();
      setInvToolData(response.data);
    } catch (error) {
      showToast("error", "Error fetching Tool Data");
    } finally {
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to first page on search
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter tool data based on search input across all columns
  const filteredToolData = toolData.filter((item) => {
    return Object.keys(item).some((key) => {
      const itemValue = item[key];
      if (itemValue !== null && itemValue !== undefined) {
        return itemValue
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());
      }
      return false;
    });
  });

  // Sort filtered data
  const sortedToolData = filteredToolData.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
    }
  });

  // Handle checkbox changes (for row selection - basic implementation)
  const handleCheckboxChange = (event, itemId) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  // Handle header checkbox to select/deselect all (basic implementation)
  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedItems(sortedToolData.map((item) => item._id)); // Assuming each item has a unique _id
    } else {
      setSelectedItems([]);
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

  // Modal Functions
  const handleOpenModal = (item) => {
    setSelectedItemForModal(item);
    setIsModalOpen(true);
    fetchInventoryToolData(); // Fetch inventory data when the modal opens
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemForModal(null); // Clear selected item when modal closes
  };

  const modalStyle = {
    position: "absolute",
    top: "5%", // Adjust this value as needed
    left: "50%", // This will center it horizontally
    transform: "translateX(-50%)", // This will center it horizontally
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    backgroundColor: darkMode ? "#444" : "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: darkMode ? "white" : "black",
    marginTop: "20px",
    marginBottom: "20px",
    // ... (other modal styles)
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: darkMode ? "#222" : "#f0f0f0",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: darkMode ? "#666" : "#ccc",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: darkMode ? "#888" : "#aaa",
    },
  };
  const handleInvRequestSort = (property) => {
    const isAsc = invOrderBy === property && invOrder === "asc";
    setInvOrder(isAsc ? "desc" : "asc");
    setInvOrderBy(property);
  };

  const handleInvSearch = (event) => {
    setInvSearch(event.target.value);
    setInvPage(0);
  };

  const handleInvChangePage = (event, newPage) => {
    setInvPage(newPage);
  };

  const handleInvChangeRowsPerPage = (event) => {
    setInvRowsPerPage(parseInt(event.target.value, 10));
    setInvPage(0);
  };

  const filteredInvToolData = invToolData.filter((item) => {
    return Object.keys(item).some((key) => {
      const itemValue = item[key];
      if (itemValue !== null && itemValue !== undefined) {
        return itemValue
          .toString()
          .toLowerCase()
          .includes(invSearch.toLowerCase());
      }
      return false;
    });
  });

  const sortedInvToolData = filteredInvToolData.sort((a, b) => {
    const aValue = a[invOrderBy];
    const bValue = b[invOrderBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return invOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return invOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
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
      <Header title="Tool Data" />
      <Container sx={{ flex: 1, paddingBottom: "60px", marginTop: "16px" }}>
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
                value={search}
                onChange={handleSearch}
                placeholder="Search across all columns"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mr: 1, minHeight: "56px" }}
              />
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  style={{ backgroundColor: darkMode ? "#333" : "#f5f5f5" }}
                >
                  <TableCell padding="checkbox" sx={{ pl: 0.5 }}>
                    <StyledCheckbox
                      onChange={handleHeaderCheckboxChange}
                      checked={
                        sortedToolData.length > 0 &&
                        selectedItems.length === sortedToolData.length
                      }
                      sx={{
                       
                        "&.Mui-checked": {
                          color: "green",
                        },
                      }}
                    />

                    {/* <Checkbox
                      onChange={handleHeaderCheckboxChange}
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < sortedToolData.length
                      }
                      checked={
                        sortedToolData.length > 0 &&
                        selectedItems.length === sortedToolData.length
                      }
                    /> */}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "Description"}
                      direction={orderBy === "Description" ? order : "asc"}
                      onClick={() => handleRequestSort("Description")}
                    >
                      Product
                    </TableSortLabel>
                  </TableCell>
                  {/* Warning Icon Column Header */}
                  {/*                   <TableCell> </TableCell> Empty header */}
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "price"}
                      direction={orderBy === "price" ? order : "asc"}
                      onClick={() => handleRequestSort("price")}
                    >
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "Min_Qty"}
                      direction={orderBy === "Min_Qty" ? order : "asc"}
                      onClick={() => handleRequestSort("Min_Qty")}
                    >
                      Min
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "Max_Qty"}
                      direction={orderBy === "Max_Qty" ? order : "asc"}
                      onClick={() => handleRequestSort("Max_Qty")}
                    >
                      Max
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "Available"}
                      direction={orderBy === "Available" ? order : "asc"}
                      onClick={() => handleRequestSort("Available")}
                    >
                      Available
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "Ordered"}
                      direction={orderBy === "Ordered" ? order : "asc"}
                      onClick={() => handleRequestSort("Ordered")}
                    >
                      Ordered
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "BinLocation"}
                      direction={orderBy === "BinLocation" ? order : "asc"}
                      onClick={() => handleRequestSort("BinLocation")}
                    >
                      Bin Location
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedToolData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item._id} sx={{ borderBottom: '1px solid #ddd' }}>
                      <TableCell padding="checkbox" sx={{ borderBottom: '0px solid green' }}>
                        <StyledCheckbox
                          checked={selectedItems.includes(item._id)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item._id)
                          }
                          sx={{
                            "&.Mui-checked": {
                              color: "green",
                            },
                          }}
                        />

                        {/* Checkbox Row Cell */}
                        {/* <CustomCheckbox
                          item={item}
                          selectedItems={selectedItems}
                          handleCheckboxChange={handleCheckboxChange}
                        /> */}
                      </TableCell>
                      <TableCell style={{ width: "300px", maxWidth: "300px",borderBottom:"0px solid" }}>
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
                                {item.Description}
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
                                {item.MfrCode ? ` ${item.MfrCode}` : ""}
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
                                {item.Catalog ? ` ${item.Catalog}` : ""}
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
                                {item.customer}
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
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                // src={item.url ? item.url : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"}
                                src={
                                  item.url && item.url.startsWith("example.com")
                                    ? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                    : item.url
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
                                      {/* {item.Description} */}
                                      <Typography
                                        component="button" // Use Typography as a button
                                        onClick={() => handleOpenModal(item)}
                                        style={{
                                          textDecoration: "underline",
                                          cursor: "pointer",
                                          color: darkMode
                                            ? "lightblue"
                                            : "blue",
                                          textAlign: "left", // Align text to the left within the cell
                                          display: "block", // Make it take full width for better click area
                                          padding: "0", // Reset padding for button-like appearance
                                          border: "none",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        {item.Description}
                                      </Typography>
                                    </div>
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
                                    {item.MfrCode ? ` ${item.MfrCode}` : ""}
                                  </div>
                                  {item.MfrCode && item.Catalog ? " | " : ""}
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
                                    {item.Catalog ? ` ${item.Catalog}` : ""}
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
                                    {item.customer}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tooltip>
                      </TableCell>
                      {/* Warning Icon TableCell */}                   {" "}
                      {/* Warning Icon and Price in the same TableCell */}
                      <TableCell
                        sx={{
                          width: "100px",
                          display: "flex",
                          alignItems: "center", // Align items vertically in the center
                          justifyContent: "flex-end", // Align items to the right end of the flex container
                          paddingRight: "10px",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "14px",
                          borderBottom: "0px solid #ddd",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            paddingBottom: "20px",
                          }}
                        >
                          {" "}
                          {/* Add a wrapper div */}
                          <WarningAmberIcon sx={{ mr: 1, color: "orange" }} />
                          {item.price}
                        </div>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center",borderBottom: '0px solid green' }}>
                        {item.Min_Qty}
                      </TableCell>{" "}
                      {/* Centered Data */}
                      <TableCell sx={{ textAlign: "center" ,borderBottom: '0px solid green'}}>
                        {item.Max_Qty}
                      </TableCell>{" "}
                      {/* Centered Data */}
                      <TableCell sx={{ textAlign: "center" ,borderBottom: '0px solid green'}}>
                        {item.Available}
                      </TableCell>{" "}
                      {/* Centered Data */}
                      <TableCell sx={{ textAlign: "center" ,borderBottom: '0px solid green'}}>
                        {item.Ordered}
                      </TableCell>{" "}
                      {/* Centered Data */}
                      <TableCell sx={{ borderBottom: '0px solid green'}}>{item.BinLocation}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={sortedToolData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <ToastContainer />
        </Box>
      </Container>
      <Footer sx={{ flexShrink: 0 }} />
      <Loading isLoading={isLoading} />
      {/*  Modal Component */}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {/* Modal Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold" }}
            >
              Product Details
            </Typography>
            <IconButton onClick={handleCloseModal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          {selectedItemForModal && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              {" "}
              {/* Use Stack for vertical layout */}
              <Box sx={{ display: "flex" }}>
                {" "}
                {/* Use Box for horizontal layout */}
                {/* Left Column: Image */}
                <Box sx={{ flex: 1 }}>
                  {" "}
                  {/* Use Box with flex for image container */}
                  <img
                    src="https://cdn.myced.com/images/Products/000000/082472/30000/08247230014_O1_600x600.jpg"
                    alt="Product"
                    style={{ width: "80%", maxHeight: "400px" }}
                  />
                </Box>
                {/* Right Column: Product Details */}
                <Box sx={{ flex: 2, ml: 2 }}>
                  {" "}
                  {/* Use Box with flex and margin for details */}
                  <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    value={selectedItemForModal.Description}
                  />
                  <Tooltip
                    title={
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="subtitle2"
                            style={{ fontWeight: "bold" }}
                          >
                            Mfr:
                          </Typography>{" "}
                          {selectedItemForModal.MfrCode
                            ? ` ${selectedItemForModal.MfrCode}`
                            : ""}
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="subtitle2"
                            style={{ fontWeight: "bold" }}
                          >
                            Catalog:
                          </Typography>{" "}
                          {selectedItemForModal.Catalog
                            ? ` ${selectedItemForModal.Catalog}`
                            : ""}
                        </div>
                      </>
                    }
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{
                          display: "inline-block",
                          maxWidth: "150px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mfr:{" "}
                        {selectedItemForModal.MfrCode
                          ? ` ${selectedItemForModal.MfrCode}`
                          : ""}
                      </Typography>
                      <Typography sx={{ mx: 1 }}>|</Typography>
                      <Typography
                        sx={{
                          display: "inline-block",
                          maxWidth: "150px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Catalog #:{" "}
                        {selectedItemForModal.Catalog
                          ? ` ${selectedItemForModal.Catalog}`
                          : ""}
                      </Typography>
                    </Box>
                  </Tooltip>
                  <TextField
                    label="Your Catalog #"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    value="POWST"
                  />
                  <Typography>$9999999.99 UOM</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1rem",
                    }}
                  >
                    <Button variant="contained" color="primary">
                      Save
                    </Button>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="outlined">Revert to default</Button>
                  </Box>
                  <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                    Changes made to the product description or your catalog #
                    will be reflected in all inventories. Clicking on "Revert to
                    Default" will remove your customized product description and
                    your catalog #.
                  </Typography>
                </Box>
              </Box>
              {/* Table Section */}
              <TableContainer component={Paper} sx={{ overflow: "Hidden" }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={invSearch}
                  onChange={handleInvSearch}
                  placeholder="Search across all columns"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mr: 1, minHeight: "56px", p: 1 }}
                />
                <Table sx={{ tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow
                      style={{ backgroundColor: darkMode ? "#333" : "#f5f5f5" }}
                    >
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        <TableSortLabel
                          active={invOrderBy === "Item"}
                          direction={invOrderBy === "Item" ? invOrder : "asc"}
                          onClick={() => handleInvRequestSort("Item")}
                        >
                          Item
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        <TableSortLabel
                          active={invOrderBy === "BinLocation"}
                          direction={
                            invOrderBy === "BinLocation" ? invOrder : "asc"
                          }
                          onClick={() => handleInvRequestSort("BinLocation")}
                        >
                          Bin Location
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        <TableSortLabel
                          active={invOrderBy === "Min_Qty"}
                          direction={
                            invOrderBy === "Min_Qty" ? invOrder : "asc"
                          }
                          onClick={() => handleInvRequestSort("Min_Qty")}
                          sx={{ textAlign: "center" }} // Add textAlign to TableSortLabel
                        >
                          Min Qty
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        <TableSortLabel
                          active={invOrderBy === "Max_Qty"}
                          direction={
                            invOrderBy === "Max_Qty" ? invOrder : "asc"
                          }
                          onClick={() => handleInvRequestSort("Max_Qty")}
                          sx={{ textAlign: "center" }} // Add textAlign to TableSortLabel
                        >
                          Max Qty
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        <TableSortLabel
                          active={invOrderBy === "Available"}
                          direction={
                            invOrderBy === "Available" ? invOrder : "asc"
                          }
                          onClick={() => handleInvRequestSort("Available")}
                          sx={{ textAlign: "center" }} // Add textAlign to TableSortLabel
                        >
                          Available
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        <TableSortLabel
                          active={invOrderBy === "Ordered"}
                          direction={
                            invOrderBy === "Ordered" ? invOrder : "asc"
                          }
                          onClick={() => handleInvRequestSort("Ordered")}
                        >
                          Ordered
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedInvToolData
                      .slice(
                        invPage * invRowsPerPage,
                        invPage * invRowsPerPage + invRowsPerPage
                      )
                      .map((item) => (
                        <TableRow key={item._id}>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "150px",
                            }}
                          >
                            <Tooltip title={item.Item}>
                              <span>{item.Item}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              textAlign: "center",
                              maxWidth: "100px",
                            }}
                          >
                            <Tooltip title={item.BinLocation}>
                              <span>{item.BinLocation}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Min_Qty}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Max_Qty}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Available}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Ordered}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={sortedInvToolData.length}
                  rowsPerPage={invRowsPerPage}
                  page={invPage}
                  onPageChange={handleInvChangePage}
                  onRowsPerPageChange={handleInvChangeRowsPerPage}
                />
              </TableContainer>
            </Stack>
          )}
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="contained" color="success">
              Save
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Done
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default ToolData;
