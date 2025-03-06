import React, { useEffect, useState } from "react";
import { getToolData } from "../services/api";
import { useThemeContext } from "../context/ThemeContext";
import inventoryOptions from "../data/inventoryOptions.json"; // Import the JSON
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
  Autocomplete, // Import Autocomplete
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
import Productdetailmodal from "../modals/Productdetailmodal";
import AddItemModal from "../modals/AddItemModal";

const AmsToolData = () => {
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
  // New state for inventory selection
  const [selectedInventory, setSelectedInventory] = useState(null);

  // ... your state variables
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // ... your functions

  const handleOpenAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setIsAddItemModalOpen(false);
  };

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
      <Header title="AMS Tool Data" />
      <Container sx={{ flex: 1, paddingBottom: "60px", marginTop: "16px" }}>
        <Box sx={{ flex: "1 0 auto" }}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              marginBottom: "8px",
              display: "flex", // Make the box a flex container
              alignItems: "center", // Align items vertically in the center
              justifyContent: "space-between", // Add this line
            }}
          >
            {/* Inventory Autocomplete */}
            <Autocomplete
              options={inventoryOptions} // Use the imported JSON // Replace with your actual inventory options
              getOptionLabel={(option) => option.label} // Specify how to get the label
              value={selectedInventory}
              onChange={(event, newValue) => {
                setSelectedInventory(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Inventory"
                  variant="outlined"
                  sx={{ mr: 2, minWidth: 200 }} // Add margin right
                />
              )}
            />

            {/* Add Item Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddItemModal}
            >
              Add Item
            </Button>
          </Box>

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
                    <TableRow
                      key={item._id}
                      sx={{ borderBottom: "1px solid #ddd" }}
                    >
                      <TableCell
                        padding="checkbox"
                        sx={{ borderBottom: "0px solid green" }}
                      >
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
                      </TableCell>
                      <TableCell
                        style={{
                          width: "300px",
                          maxWidth: "300px",
                          borderBottom: "0px solid",
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
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
                                }}
                              />
                              <div
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  flex: 1,
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
                                        color: "green",
                                      }}
                                    >
                                      <Typography
                                        component="button"
                                        onClick={() => handleOpenModal(item)}
                                        style={{
                                          textDecoration: "underline",
                                          cursor: "pointer",
                                          color: darkMode
                                            ? "lightblue"
                                            : "blue",
                                          textAlign: "left",
                                          display: "block",
                                          padding: "0",
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
                                  </Typography>
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
                      <TableCell
                        sx={{
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
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
                          <WarningAmberIcon sx={{ mr: 1, color: "orange" }} />
                          {item.price}
                        </div>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderBottom: "0px solid green",
                        }}
                      >
                        {item.Min_Qty}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderBottom: "0px solid green",
                        }}
                      >
                        {item.Max_Qty}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderBottom: "0px solid green",
                        }}
                      >
                        {item.Available}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderBottom: "0px solid green",
                        }}
                      >
                        {item.Ordered}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "0px solid green" }}>
                        {item.BinLocation}
                      </TableCell>
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

      {/* Modal Component */}
      <Productdetailmodal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedItemForModal={selectedItemForModal}
        invSearch={invSearch}
        handleInvSearch={handleInvSearch}
        invOrder={invOrder}
        invOrderBy={invOrderBy}
        handleInvRequestSort={handleInvRequestSort}
        invPage={invPage}
        invRowsPerPage={invRowsPerPage}
        handleInvChangePage={handleInvChangePage}
        handleInvChangeRowsPerPage={handleInvChangeRowsPerPage}
        sortedInvToolData={sortedInvToolData} // Pass the sorted inventory data
      />
      {/* AddItemModal Component */}
      <AddItemModal
        open={isAddItemModalOpen}
        onClose={handleCloseAddItemModal}
      />
    </Box>
  );
};

export default AmsToolData;
