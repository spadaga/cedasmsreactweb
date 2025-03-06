import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useThemeContext } from "../context/ThemeContext"; // Assuming you have ThemeContext
// Assuming you have the sorting and filtering logic in the parent component
const Productdetailmodal = ({
  isModalOpen,
  handleCloseModal,
  selectedItemForModal,
  invSearch,
  handleInvSearch,
  invOrder,
  invOrderBy,
  handleInvRequestSort,
  invPage,
  invRowsPerPage,
  handleInvChangePage,
  handleInvChangeRowsPerPage,
  sortedInvToolData,
}) => {
  const { darkMode } = useThemeContext();

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

  return (
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
          AMS  Product Details
          </Typography>
          <IconButton onClick={handleCloseModal} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {selectedItemForModal && (
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* Use Stack for vertical layout */}
            <Box sx={{ display: "flex" }}>
              {/* Use Box for horizontal layout */}
              {/* Left Column: Image */}
              <Box sx={{ flex: 1 }}>
                {/* Use Box with flex for image container */}
                <img
                  src="https://cdn.myced.com/images/Products/000000/082472/30000/08247230014_O1_600x600.jpg"
                  alt="Product"
                  style={{ width: "80%", maxHeight: "400px" }}
                />
              </Box>
              {/* Right Column: Product Details */}
              <Box sx={{ flex: 2, ml: 2 }}>
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
                  Changes made to the product description or your catalog # will
                  be reflected in all inventories. Clicking on "Revert to
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
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      <TableSortLabel
                        active={invOrderBy === "Item"}
                        direction={invOrderBy === "Item" ? invOrder : "asc"}
                        onClick={() => handleInvRequestSort("Item")}
                      >
                        Item
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
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
                        direction={invOrderBy === "Min_Qty" ? invOrder : "asc"}
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
                        direction={invOrderBy === "Max_Qty" ? invOrder : "asc"}
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
                        direction={invOrderBy === "Ordered" ? invOrder : "asc"}
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
          <Button variant="outlined" color="primary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" color="success">
            Done
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default Productdetailmodal;