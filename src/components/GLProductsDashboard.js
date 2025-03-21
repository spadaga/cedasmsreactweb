// ProductsDashboard.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery, // Import useMediaQuery
  Fade, // Import Fade for smooth transition
  Modal,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MasterLayout from "../Layout/MasterLayout";
import { useNavigate, useLocation } from "react-router-dom";
import GLProducts from "./GLProducts";
import GLDynamicHeader from "../controls/GLDynamicHeader";
import LoremIpsum from "react-lorem-ipsum";
import { useThemeContext } from "../context/ThemeContext";

const ProductsDashboard = () => {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { darkMode } = useThemeContext();
  const style = {
    position: "absolute",
    top: "5%", // Adjust this value as needed
    left: "50%", // This will center it horizontally
    transform: "translateX(-50%)", // This will center it horizontally
    width: "30%",
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadFromExcel = () => {
    navigate("/glproductupload"); // Redirect to GLProductUpload
    setOpen(false); // Close the modal
  };
  const handleSearchAndAdd = () => {
    navigate("/glproductsearch");
    setOpen(false); // Close the modal
  };

  // Check if the user came from the GLProductUpload page
  const cameFromUpload = location.state && location.state.fromUpload;
  const [showGLProducts, setShowGLProducts] = useState(cameFromUpload);

  const handleShowGLProducts = () => {
    setShowGLProducts(true);
    setOpen(false);
  };
  const handleBack = () => {
    navigate(-1); // Navigate to /glnewcustomers
  };

  return (
    <MasterLayout title="Products Dashboard">
      <Box
        sx={{
          padding: "20px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "5px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#F8F9FC",
        }}
      >
        <Box sx={{ minHeight: "100vh", padding: isSmallScreen ? "0px" : "0" }}>
          <GLDynamicHeader
            title="Products Dashboard "
            descriptionContent={
              <p>
                <LoremIpsum p={2} />
              </p>
            }
            showBackButton={true}
            backButtonHandler={handleBack}
            showAddButton={true}
            addButtonText={
              <>
                {<AddIcon />}
                ADD PRODUCTS
              </>
            }
            addButtonHandler={handleClickOpen}
          />

          {isSmallScreen ? (
            <Paper sx={{ padding: 2, marginBottom: 3 }}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Typography variant="subtitle1" fontWeight="bold">
                    CUSTOMER
                  </Typography>
                  <Typography variant="body2">ABC-Electricals</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontWeight="bold">
                    CONNECTION STATUS
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <CheckCircleIcon sx={{ color: "green", marginRight: 1 }} />
                    <Typography variant="body2">Connected</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontWeight="bold">
                    CONNECTION TYPE
                  </Typography>
                  <Typography variant="body2">
                    NetSuite(Account Id:57525)
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontWeight="bold">
                    LAST TRANSMITTED ON
                  </Typography>
                  <Typography variant="body2">12/12/2022</Typography>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <TableContainer
              component={Paper}
              sx={{ marginBottom: 3, borderBottom: "none" }}
            >
              <Table
                aria-label="customer connection table"
                sx={{ m: "16px 0px", borderBottom: "none" }}
              >
                <TableHead sx={{ borderBottom: "none" }}>
                  <TableRow sx={{ borderBottom: "none" }}>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        fontWeight: "bold",
                        width: "20%",
                        padding: "0px 16PX",
                        paddingTop: "8px",
                      }}
                    >
                      CUSTOMER
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        fontWeight: "bold",
                        width: "25%",
                        padding: "0px 16PX",
                        paddingTop: "8px",
                      }}
                    >
                      CONNECTION STATUS
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        fontWeight: "bold",
                        width: "30%",
                        padding: "0px 16PX",
                        paddingTop: "8px",
                      }}
                    >
                      CONNECTION TYPE
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        fontWeight: "bold",
                        width: "25%",
                        padding: "0px 16PX",
                        paddingTop: "8px",
                      }}
                    >
                      LAST TRANSMITTED ON
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ marginBottom: 4, borderBottom: "none" }}>
                  <TableRow sx={{ marginBottom: 4, borderBottom: "none" }}>
                    <TableCell
                      sx={{
                        padding: "8px 16px",
                        width: "20%",
                        borderBottom: "none",
                      }}
                    >
                      ABC-Electricals
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "8px 16px",
                        width: "25%",
                        borderBottom: "none",
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <CheckCircleIcon
                          sx={{ color: "green", marginRight: 1 }}
                        />
                        Connected
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "8px 16px",
                        width: "30%",
                        borderBottom: "none",
                      }}
                    >
                      NetSuite(Account Id:57525)
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "8px 16px",
                        width: "25%",
                        borderBottom: "none",
                      }}
                    >
                      12/12/2022
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
            <Typography variant="h5">Products</Typography>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />}>
              Add Products
            </Button>
          </Box> */}

          {showGLProducts ? (
            <GLProducts />
          ) : (
            <Paper sx={{ padding: 4, textAlign: "center" }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                spacing={2}
              >
                <Grid item>
                  <Inventory2Icon sx={{ fontSize: 150, color: "grey" }} />
                </Grid>
                <Grid item>
                  <Typography variant="h6">No Products Found</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Start by adding products to your inventory.
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleShowGLProducts}
                    fullWidth={isSmallScreen}
                  >
                    Add Products
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="products-modal-title"
        aria-describedby="products-modal-description"
       
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Button
                  variant="contained"
                  style={{ marginBottom: "10px", width: "100%" }}
                  onClick={handleUploadFromExcel}
                >
                  UPLOAD PRODUCTS FROM EXCEL
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={handleSearchAndAdd}
                >
                  SEARCH AND ADD PRODUCTS TO THE CATALOG
                </Button>
              </Grid>
            </Grid>
           
          </Box>
        </Box>
      </Modal>
    </MasterLayout>
  );
};

export default ProductsDashboard;
