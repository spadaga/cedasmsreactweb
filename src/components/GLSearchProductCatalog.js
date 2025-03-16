// GLProductUpload.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  useTheme,
  Autocomplete,
  InputAdornment,
  Chip,
  IconButton,
  Divider,
  styled,
  ListItemText,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MasterLayout from "../Layout/MasterLayout";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import pcData from "../data/pcs.json";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBackIcon
import GLDynamicHeader from "../controls/GLDynamicHeader";
import LoremIpsum from "react-lorem-ipsum";
import DynamicAutocomplete from "../controls/DynamicAutocomplete";
import GLProductGrid from "./GLProductGrid";

import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";

import productData from "../data/glproductcatalog.json";
import GLProductGridView from "./GLProductGrid";
import GLProductListView from "./GLProductListView";
// import GLProductGridView from "./GLProductGridView";
// import GLProductListView from "./GLProductListView";

const GLSearchProductCatalog = () => {
  const theme = useTheme();
  const [pcSearchValue, setPcSearchValue] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const filteredProducts = productData.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusChip = (status) => {
    if (status === "Success") {
      return (
        <Chip label="Success" color="success" size="small" variant="outlined" />
      );
    } else if (status === "Failed") {
      return (
        <Chip label="Failed" color="error" size="small" variant="outlined" />
      );
    } else {
      return <Chip label="Unknown" size="small" variant="outlined" />;
    }
  };

  const handleGoBack = () => {
    navigate("/glproductdb", { state: { fromUpload: true } });
  };

  const labelKey = "PCNAME"; // Or 'ID', or any other key from your JSON
  return (
    <MasterLayout title="Search Product Catalog">
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
        <Box sx={{ minHeight: "100vh",width:"100%" }}>
          {/* Back Button */}
          <Box
            sx={{
              padding: "20px",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "5px",
              backgroundColor: theme.palette.background.paper,
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "theme.palette.background.paper",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginBottom: 2,width:"100%"
              }}
            >
              <GLDynamicHeader
                title="Product Upload "
                descriptionContent={
                  <p>
                    <LoremIpsum p={2} />
                  </p>
                }
                showBackButton={true}
                backButtonHandler={handleGoBack}
              />

              <Box sx={{width:"100%"}}>
                <Grid
                xs={12}
                  container
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 ,width:"100%"}}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Search products..."
                      variant="outlined"
                      fullWidth
                      value={searchQuery}
                      onChange={handleSearchChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "right" }}>
                    <ToggleButtonGroup
                      value={viewMode}
                      exclusive
                      onChange={handleViewModeChange}
                      aria-label="view mode"
                    >
                      <ToggleButton value="list" aria-label="list">
                        <ViewListIcon />
                      </ToggleButton>
                      <ToggleButton value="grid" aria-label="grid">
                        <GridViewIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>

                {viewMode === "grid" ? (
                  <GLProductGridView
                    products={filteredProducts}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    handlePageChange={handlePageChange}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                  />
                ) : (
                    <div sx={{width:"100%"}}>
                  <GLProductListView products={filteredProducts}  searchQuery={searchQuery}/>
                  </div>
                )}
              </Box>
            </Box>{" "}
          </Box>{" "}
        </Box>
      </Box>
    </MasterLayout>
  );
};

export default GLSearchProductCatalog;
