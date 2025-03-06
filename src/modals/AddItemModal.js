import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Autocomplete,
  TextField,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TableSortLabel,
  TablePagination,
  Checkbox,
  styled,
  Tooltip,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableFooter,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "../context/ThemeContext";
import inventoryOptions from "../data/inventoryOptions.json";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import SearchIcon from "@mui/icons-material/Search";
import { getToolData } from "../services/api";
import { showToast } from "../utils/toastUtils";
import DeleteIcon from "@mui/icons-material/Delete";

const AddItemModal = ({ open, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [transferFrom, setTransferFrom] = useState(null);
  const { darkMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [invToolData, setInvToolData] = useState([]);
  const [invOrder, setInvOrder] = useState("asc");
  const [invOrderBy, setInvOrderBy] = useState("Item");
  const [invPage, setInvPage] = useState(0);
  const [invRowsPerPage, setInvRowsPerPage] = useState(5);
  const [invSearch, setInvSearch] = useState("");
  const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const inputRefs = useRef({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState(null);

  useEffect(() => {
    if (open) {
      fetchInventoryToolData();
    }
  }, [open]);

  const fetchInventoryToolData = async () => {
    try {
      const response = await getToolData();
      setInvToolData(response.data);
    } catch (error) {
      showToast("error", "Error fetching Tool Data");
    }
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

  const filteredInvToolData = useMemo(() => {
    return invToolData.filter((invItem) => {
      return Object.keys(invItem).some((key) => {
        const itemValue = invItem[key];
        if (itemValue !== null && itemValue !== undefined) {
          return itemValue
            .toString()
            .toLowerCase()
            .includes(invSearch.toLowerCase());
        }
        return false;
      });
    });
  }, [invToolData, invSearch]);

  const sortedInvToolData = useMemo(() => {
    return [...filteredInvToolData].sort((a, b) => {
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
  }, [filteredInvToolData, invOrderBy, invOrder]);

  useEffect(() => {
    // Initialize itemQuantities with current values from invToolData
    const initialQuantities = sortedInvToolData.reduce((acc, item) => {
      acc[item._id] = {
        Tran_qty: item.Tran_qty || "",
        Min_Qty: item.Min_Qty || "",
        Max_Qty: item.Max_Qty || "",
      };
      return acc;
    }, {});
    setItemQuantities(initialQuantities);
  }, [sortedInvToolData]);
  // Add a ref for the input field

  const handleQuantityChange = (itemId, field, value) => {
    // Ensure the value is a number or an empty string
    if (value === "" || (/^\d+$/.test(value) && value.length <= 4)) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: {
          ...prevQuantities[itemId],
          [field]: value,
        },
      }));

      // Focus the correct input field after state update
      if (inputRefs.current[itemId + field]) {
        setTimeout(() => {
          inputRefs.current[itemId + field].focus();
        }, 0);
      }
    }
  };

  const handleCheckboxChange = (event, invItemId) => {
    if (event.target.checked) {
      setSelectedInventoryItems([...selectedInventoryItems, invItemId]);
    } else {
      setSelectedInventoryItems(
        selectedInventoryItems.filter((id) => id !== invItemId)
      );
    }
  };

  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedInventoryItems(
        sortedInvToolData.map((invItem) => invItem._id)
      );
    } else {
      setSelectedInventoryItems([]);
    }
  };

  const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    marginLeft: "8px",
    width: "21px",
    height: "21px",
    borderRadius: "4px",
    "&.Mui-checked": {
      outline: "2px solid #FFF !important",
      boxShadow: "0px 0px 0px 4px green !important",
      backgroundColor: "white !important",
    },
    "&.MuiCheckbox-indeterminate": {
      backgroundColor: "white !important",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "28px",
      borderRadius: "6px",
    },
  }));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",
    verticalAlign: "top",
  }));

  const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "1.1rem",
    whiteSpace: "nowrap",
  }));

  const modalStyle = {
    position: "absolute",
    top: "5%",
    left: "50%",
    transform: "translate(-50%, 0)",
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // Function to format product details
  const handleRemoveItem = (itemId) => {
    setItemIdToRemove(itemId); // Store the item ID to remove
    setConfirmDialogOpen(true); // Open the confirmation dialog
  };

  const handleConfirmRemove = () => {
    // Filter the invToolData to remove the item with the given itemIdToRemove
    const updatedToolData = invToolData.filter(
      (item) => item._id !== itemIdToRemove
    );

    // Update the state with the filtered data
    setInvToolData(updatedToolData);

    // Remove the item from selectedInventoryItems if it's selected
    setSelectedInventoryItems(
      selectedInventoryItems.filter((id) => id !== itemIdToRemove)
    );

    setConfirmDialogOpen(false); // Close the dialog after removal

    // Show success toast
    showToast("success", "Item removed successfully!");
  };

  const handleCancelRemove = () => {
    setItemIdToRemove(null); // Reset the item ID
    setConfirmDialogOpen(false); // Close the dialog
  };

  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    mfrCode: "",
    catalog: "",
    yourPart: "",
    description: "",
    minQty: "",
    maxQty: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleAddItem = () => {
    setRows([...rows, newRow]);
    setNewRow({
      mfrCode: "",
      catalog: "",
      yourPart: "",
      description: "",
      minQty: "",
      maxQty: "",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
          Add Item
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <Divider sx={{ my: 2 }} />
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Transfer Items" />
          <Tab label="Request New Items" />
        </Tabs>
        <Divider sx={{ my: 2 }} />
        {selectedTab === 0 && (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Autocomplete
                options={inventoryOptions}
                getOptionLabel={(option) => option.label}
                value={transferFrom}
                onChange={(event, newValue) => {
                  setTransferFrom(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Transfer From"
                    variant="outlined"
                    sx={{ mr: 2, minWidth: 200 }}
                  />
                )}
              />
              <Button
                variant="contained"
                component="label"
                onClick={handleClick}
                endIcon={
                  anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
              >
                Upload
                <input hidden />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <DownloadIcon />
                  </ListItemIcon>
                  Download Template
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <UploadIcon />
                  </ListItemIcon>
                  Upload Template
                </MenuItem>
              </Menu>
            </Box>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                marginBottom: "8px",
                marginTop: "16px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    <StyledHeaderCell padding="checkbox" sx={{ pl: 0.5 }}>
                      <StyledCheckbox
                        onChange={handleHeaderCheckboxChange}
                        checked={
                          sortedInvToolData.length > 0 &&
                          selectedInventoryItems.length ===
                            sortedInvToolData.length
                        }
                        sx={{
                          "&.Mui-checked": {
                            color: "green",
                          },
                        }}
                      />
                    </StyledHeaderCell>
                    <StyledHeaderCell>
                      <TableSortLabel
                        active={invOrderBy === "Description"}
                        direction={
                          invOrderBy === "Description" ? invOrder : "asc"
                        }
                        onClick={() => handleInvRequestSort("Description")}
                      >
                        Product
                      </TableSortLabel>
                    </StyledHeaderCell>
                    <StyledHeaderCell>
                      <TableSortLabel
                        active={invOrderBy === "Item"}
                        direction={invOrderBy === "Item" ? invOrder : "asc"}
                        onClick={() => handleInvRequestSort("Item")}
                      >
                        Item
                      </TableSortLabel>
                    </StyledHeaderCell>
                    <StyledHeaderCell>
                      <TableSortLabel
                        active={invOrderBy === "JobName"}
                        direction={invOrderBy === "JobName" ? invOrder : "asc"}
                        onClick={() => handleInvRequestSort("JobName")}
                      >
                        Job Name
                      </TableSortLabel>
                    </StyledHeaderCell>
                    <StyledHeaderCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <TableSortLabel
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                        active={invOrderBy === "Tran_qty"}
                        direction={invOrderBy === "Tran_qty" ? invOrder : "asc"}
                        onClick={() => handleInvRequestSort("Tran_qty")}
                      >
                        Tran Qty
                      </TableSortLabel>
                    </StyledHeaderCell>
                    <StyledHeaderCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <TableSortLabel
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                        active={invOrderBy === "Min_Qty"}
                        direction={invOrderBy === "Min_Qty" ? invOrder : "asc"}
                        onClick={() => handleInvRequestSort("Min_Qty")}
                      >
                        Min Qty
                      </TableSortLabel>
                    </StyledHeaderCell>
                    <StyledHeaderCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <TableSortLabel
                        active={invOrderBy === "Max_Qty"}
                        direction={invOrderBy === "Max_Qty" ? invOrder : "asc"}
                        onClick={() => handleInvRequestSort("Max_Qty")}
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        Max Qty
                      </TableSortLabel>
                    </StyledHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedInvToolData
                    .slice(
                      invPage * invRowsPerPage,
                      invPage * invRowsPerPage + invRowsPerPage
                    )
                    .map((invItem) => (
                      <TableRow key={invItem._id}>
                        <TableCell padding="checkbox">
                          <StyledCheckbox
                            checked={selectedInventoryItems.includes(
                              invItem._id
                            )}
                            onChange={(event) =>
                              handleCheckboxChange(event, invItem._id)
                            }
                            sx={{
                              "&.Mui-checked": {
                                color: "green",
                              },
                            }}
                          />
                        </TableCell>
                        <StyledTableCell>
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
                                  {invItem.Description}
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
                                  {invItem.MfrCode ? ` ${invItem.MfrCode}` : ""}
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
                                  {invItem.Catalog ? ` ${invItem.Catalog}` : ""}
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
                                  {invItem.customer}
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
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {/* {invItem.Description} */}
                                  <Typography
                                    component="button" // Use Typography as a button
                                    style={{
                                      cursor: "pointer",

                                      textAlign: "left", // Align text to the left within the cell
                                      display: "block", // Make it take full width for better click area
                                      padding: "0", // Reset padding for button-like appearance
                                      border: "none",
                                      backgroundColor: "transparent",
                                      color: "green", // Set the label color to green
                                    }}
                                  >
                                    {invItem.Description}
                                  </Typography>

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
                                        marginRight: "4px",
                                        fontWeight: "bold",
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
                                      {invItem.MfrCode
                                        ? ` ${invItem.MfrCode}`
                                        : ""}
                                    </div>
                                    {invItem.MfrCode && invItem.Catalog
                                      ? " | "
                                      : ""}
                                    <Typography
                                      variant="subtitle2"
                                      style={{
                                        marginLeft: "4px",
                                        marginRight: "4px",
                                        fontWeight: "bold",
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
                                      {invItem.Catalog
                                        ? ` ${invItem.Catalog}`
                                        : ""}
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
                                      sx={{ fontWeight: "bold" }}
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
                                      {invItem.customer}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Tooltip title={invItem.Item}>
                            <span>{invItem.Item}</span>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell>{invItem.JobName}</StyledTableCell>
                        <StyledTableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <TextField
                            value={itemQuantities[invItem._id]?.Tran_qty || ""}
                            onChange={(e) =>
                              handleQuantityChange(
                                invItem._id,
                                "Tran_qty",
                                e.target.value
                              )
                            }
                            size="small"
                            InputProps={{
                              inputRef: (el) =>
                                (inputRefs.current[invItem._id + "Tran_qty"] =
                                  el), // Unique ref
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <TextField
                            value={itemQuantities[invItem._id]?.Min_Qty || ""}
                            onChange={(e) =>
                              handleQuantityChange(
                                invItem._id,
                                "Min_Qty",
                                e.target.value
                              )
                            }
                            size="small"
                            InputProps={{
                              inputRef: (el) =>
                                (inputRefs.current[invItem._id + "Min_Qty"] =
                                  el), // Unique ref
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                          />
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <TextField
                            value={itemQuantities[invItem._id]?.Max_Qty || ""}
                            onChange={(e) =>
                              handleQuantityChange(
                                invItem._id,
                                "Max_Qty",
                                e.target.value
                              )
                            }
                            size="small"
                            InputProps={{
                              inputRef: (el) =>
                                (inputRefs.current[invItem._id + "Max_Qty"] =
                                  el), // Unique ref
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              mt: 1,
                            }}
                          >
                            {" "}
                            {/* Added Box for spacing and centering */}
                            <Link
                              href="#"
                              onClick={() => handleRemoveItem(invItem._id)}
                              sx={{
                                color: "red",
                                textAlign: "center", // Center the link text
                              }}
                            >
                              Remove
                            </Link>
                          </Box>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedInvToolData.length}
              rowsPerPage={invRowsPerPage}
              page={invPage}
              onPageChange={handleInvChangePage}
              onRowsPerPageChange={handleInvChangeRowsPerPage}
            />
            {/* Buttons below the table */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  mr: 1,
                  borderRadius: "4px", // Rounded corners
                }}
              >
                Transfer Items
              </Button>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{ borderRadius: "4px" }} // Rounded corners
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
        {selectedTab === 1 && (
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "orange" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 2, // Add space between button and table
              
              }}
            >
              <Button
                variant="contained"
                component="label"
                onClick={handleClick}
                endIcon={
                  anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
              >
                Upload
                <input hidden />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <DownloadIcon />
                  </ListItemIcon>
                  Download Template
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <UploadIcon />
                  </ListItemIcon>
                  Upload Template
                </MenuItem>
              </Menu>
            </Box>

            <Box>
              {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Button variant="contained" color="success" onClick={handleAddItem}>
          Add Item
        </Button>
      </Box> */}

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#eee" }}>
                      <StyledHeaderCell>MFR Code</StyledHeaderCell>
                      <StyledHeaderCell>Catalog #</StyledHeaderCell>
                      <StyledHeaderCell>Your Part #</StyledHeaderCell>
                      <StyledHeaderCell>Your Description</StyledHeaderCell>
                      <StyledHeaderCell>Min Qty</StyledHeaderCell>
                      <StyledHeaderCell>Max Qty</StyledHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            name="mfrCode"
                            value={row.mfrCode}
                            onChange={(event) => {
                              const newRows = [...rows];
                              newRows[index].mfrCode = event.target.value;
                              setRows(newRows);
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="catalog"
                            value={row.catalog}
                            onChange={(event) => {
                              const newRows = [...rows];
                              newRows[index].catalog = event.target.value;
                              setRows(newRows);
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="yourPart"
                            value={row.yourPart}
                            onChange={(event) => {
                              const newRows = [...rows];
                              newRows[index].yourPart = event.target.value;
                              setRows(newRows);
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="description"
                            value={row.description}
                            onChange={(event) => {
                              const newRows = [...rows];
                              newRows[index].description = event.target.value;
                              setRows(newRows);
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="minQty"
                            value={row.minQty}
                            onChange={(event) => {
                              const newRows = [...rows];
                              newRows[index].minQty = event.target.value;
                              setRows(newRows);
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="maxQty"
                            value={row.maxQty}
                            onChange={(event) => {
                              const newRows = [...rows];
                              newRows[index].maxQty = event.target.value;
                              setRows(newRows);
                            }}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <TextField
                          name="mfrCode"
                          value={newRow.mfrCode}
                          onChange={handleInputChange}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="catalog"
                          value={newRow.catalog}
                          onChange={handleInputChange}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="yourPart"
                          value={newRow.yourPart}
                          onChange={handleInputChange}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="description"
                          value={newRow.description}
                          onChange={handleInputChange}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="minQty"
                          value={newRow.minQty}
                          onChange={handleInputChange}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="maxQty"
                          value={newRow.maxQty}
                          onChange={handleInputChange}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    {" "}
                    {/* Added TableFooter */}
                    <TableRow>
                      <TableCell colSpan={6} align="right">
                        {" "}
                        {/* Span across all columns and align right */}
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleAddItem}
                        >
                          Add Item
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Typography>
        )}

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={handleCancelRemove}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Remove"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelRemove}>Cancel</Button>
            <Button onClick={handleConfirmRemove} autoFocus color="error">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
