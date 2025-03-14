import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Pagination,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material"; // Import SearchIcon
import Header from "../controls/Header";
import Footer from "../controls/Footer";
import { getAllSecondaryInventory } from "../services/api"; // Import your API method
import { visuallyHidden } from "@mui/utils";
import { useThemeContext } from "../context/ThemeContext";
import AddInventoryModal from "../modals/AddInventoryModal";
import MasterLayout from "../Layout/MasterLayout";

const InvMgrSettings = () => {
    const [description, setDescription] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [notificationEmails, setNotificationEmails] = useState("");

  // States for table data, search, sorting, and pagination
  const [inventoryData, setInventoryData] = useState([]); // Initialize as empty array
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Description"); // Default sort by Description
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed
  const { darkMode } = useThemeContext();

  // Modal state
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSaveInventory = () => {
    // Implement your save logic here (API calls, etc.)
    console.log("Saving new inventory...");
    console.log("Description:", description);
    console.log("Address Line 1:", addressLine1);
    // ... Log other form data ...
    handleCloseModal(); // Close the modal after saving
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getAllSecondaryInventory();
        setInventoryData(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []); // Run only on mount

  // Function to handle search
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset page to 0 when search changes
  };

  // Function to handle sorting
  const handleRequestSort = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  // Function to sort and filter data
  const sortedAndFilteredData = () => {
    let data = [...inventoryData];

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      data = data.filter((row) => {
        return (
          row.Description.toLowerCase().includes(searchTerm) ||
          row.no_of_products.toString().includes(searchTerm) || // Convert number to string
          row.notif_address.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Sort data
    data.sort((a, b) => {
      let orderValue = order === "asc" ? 1 : -1;
      if (orderBy === "Description") {
        return (a.Description > b.Description ? 1 : -1) * orderValue;
      } else if (orderBy === "# of Products") {
        return (a.no_of_products - b.no_of_products) * orderValue;
      } else if (orderBy === "Notification Email Address") {
        return (a.notif_address > b.notif_address ? 1 : -1) * orderValue;
      }
      return 0;
    });

    return data;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Clear form fields when modal is closed
    setFormData({
      description: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      notificationEmails: "",
    });
    setErrors({
      description: false,
      addressLine1: false,
      city: false,
      state: false,
      zip: false,
      notificationEmails: false,
    });
  };

  // Form states (using a single object)
  const [formData, setFormData] = useState({
    description: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    notificationEmails: "",
  });

  // State to track errors
  const [errors, setErrors] = useState({
    addressLine1: false,
    city: false,
    state: false,
    zip: false,
    notificationEmails: false,
  });

  // State to track if the save button was clicked
  const [saveClicked, setSaveClicked] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      addressLine1: false,
      city: false,
      state: false,
      zip: false,
      notificationEmails: false,
    };

    if (!addressLine1.trim()) {
      newErrors.addressLine1 = true;
      valid = false;
    }
    if (!city.trim()) {
      newErrors.city = true;
      valid = false;
    }
    if (!state) {
      newErrors.state = true;
      valid = false;
    }
    if (!zip.trim()) {
      newErrors.zip = true;
      valid = false;
    }

    // Email validation
    if (notificationEmails.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emails = notificationEmails.split(";");
      for (const email of emails) {
        if (!email.trim() || !emailRegex.test(email.trim())) {
          newErrors.notificationEmails = true;
          valid = false;
          break;
        }
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSaveChanges = () => {
    setSaveClicked(true); // Set saveClicked to true
    if (validateForm()) {
      // Implement your save logic here (API calls, etc.)
      console.log("Saving changes...");
      console.log("Address Line 1:", addressLine1);
      console.log("Address Line 2:", addressLine2);
      console.log("City:", city);
      console.log("State:", state);
      console.log("Zip:", zip);
      console.log("Notification Emails:", notificationEmails);
    } else {
      console.log("Form has validation errors. Not saving.");
    }
  };

  const handleDiscardChanges = () => {
    // Implement your discard logic here
    console.log("Discarding changes...");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setZip("");
    setNotificationEmails("");
    setErrors({
      addressLine1: false,
      city: false,
      state: false,
      zip: false,
      notificationEmails: false,
    });
    setSaveClicked(false); // Reset saveClicked on discard
  };

  // useEffect to clear individual errors on input change
  useEffect(() => {
    if (saveClicked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        addressLine1: !addressLine1.trim() ? true : false,
        city: !city.trim() ? true : false,
        state: !state ? true : false,
        zip: !zip.trim() ? true : false,
        notificationEmails: notificationEmails.trim()
          ? !validateEmails(notificationEmails)
          : false,
      }));
    }
  }, [addressLine1, city, state, zip, notificationEmails, saveClicked]);

  const validateEmails = (emails) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailArray = emails.split(";");
    for (const email of emailArray) {
      if (!email.trim() || !emailRegex.test(email.trim())) {
        return false;
      }
    }
    return true;
  };
  // Function to sort data
  const sortedData = () => {
    const data = [...inventoryData];
    if (search) {
      return data
        .filter((row) =>
          row.Description.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          let orderValue = 1;
          if (order === "desc") {
            orderValue = -1;
          }
          if (orderBy === "Description") {
            return (a.Description > b.Description ? 1 : -1) * orderValue;
          }
          // Add other sorting criteria as needed
          return 0;
        });
    } else {
      return data.sort((a, b) => {
        let orderValue = 1;
        if (order === "desc") {
          orderValue = -1;
        }
        if (orderBy === "Description") {
          return (a.Description > b.Description ? 1 : -1) * orderValue;
        }
        // Add other sorting criteria as needed
        return 0;
      });
    }
  };

  return (
    <MasterLayout title="Inventory Manager Settings">
    
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Project Settings
          </Typography>
          <Typography variant="body2" gutterBottom>
            Account: 78945 - ARCLIGHT TEST
          </Typography>
          <Typography variant="body2" gutterBottom>
            This is the account that will be used for replenishment requests.
            Contact your distributor to change this.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Default Address
          </Typography>
          <Typography variant="body2" gutterBottom>
            This is the address replenishment orders will be shipped to if no
            address is specified on an inventory.
          </Typography>

          <TextField
            label="Address Line 1"
            fullWidth
            margin="normal"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            error={errors.addressLine1}
            helperText={errors.addressLine1 ? "Address Line 1 is required" : ""}
          />
          <TextField
            label="Address Line 2"
            fullWidth
            margin="normal"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{ flex: 1 }}
              error={errors.city}
              helperText={errors.city ? "City is required" : ""}
            />
            <FormControl sx={{ flex: 1 }} error={errors.state}>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                id="state-select"
                value={state}
                label="State"
                onChange={(e) => setState(e.target.value)}
              >
                <MenuItem value="State">State</MenuItem>
                <MenuItem value="CA">CA</MenuItem>
                <MenuItem value="NY">NY</MenuItem>
                {/* Add more states as needed */}
              </Select>
              <FormHelperText>
                {errors.state ? "State is required" : ""}
              </FormHelperText>
            </FormControl>
            <TextField
              label="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              sx={{ flex: 1 }}
              error={errors.zip}
              helperText={errors.zip ? "Zip is required" : ""}
            />
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Notification Emails
          </Typography>
          <Typography variant="body2" gutterBottom>
            These email addresses will receive a notification for any
            transaction in any inventory on this project. You can set
            notification for each inventory in "Inventory Settings" section
            below. Seperate multiple emails with semicolon(;).
          </Typography>

          <TextField
            label="Notification Emails"
            fullWidth
            margin="normal"
            value={notificationEmails}
            onChange={(e) => setNotificationEmails(e.target.value)}
            error={errors.notificationEmails}
            helperText={
              errors.notificationEmails
                ? "Enter valid emails separated by semicolons"
                : ""
            }
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
            <Button variant="outlined" onClick={handleDiscardChanges}>
              Discard Changes
            </Button>
          </Box>
        </Paper>
        {/* Table Section */}
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Secondary Inventories
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
            >
              Add Inventory
            </Button>
          </Box>

          {/* Search Bar */}
          <TextField
            label="Search Description"
            value={search}
            onChange={handleSearch}
            sx={{ mb: 2 }}
            fullWidth
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  style={{ backgroundColor: darkMode ? "#333" : "#f5f5f5" }}
                >
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "Description"}
                      direction={orderBy === "Description" ? order : "asc"}
                      onClick={handleRequestSort("Description")}
                    >
                      Description
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "# of Products"}
                      direction={orderBy === "# of Products" ? order : "asc"}
                      onClick={handleRequestSort("# of Products")}
                    >
                      # of Products
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <TableSortLabel
                      active={orderBy === "Notification Email Address"}
                      direction={
                        orderBy === "Notification Email Address" ? order : "asc"
                      }
                      onClick={handleRequestSort("Notification Email Address")}
                    >
                      Notification Email Address
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAndFilteredData()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.Description}</TableCell>
                      <TableCell>{row.no_of_products}</TableCell>
                      <TableCell>{row.notif_address}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="error" size="small">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Centered Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(inventoryData.length / rowsPerPage)}
              page={page + 1}
              onChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Paper>
     

      {/* Add Inventory Modal */}
      <AddInventoryModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSaveInventory}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
   </MasterLayout>
  );
};

export default InvMgrSettings;
