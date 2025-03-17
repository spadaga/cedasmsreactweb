import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  useTheme,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import MasterLayout from "../Layout/MasterLayout";
import { useNavigate } from "react-router-dom";
import GLDynamicHeader from "../controls/GLDynamicHeader";
import LoremIpsum from "react-lorem-ipsum";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import productData from "../data/glproductcatalog.json";
import GLProductGridView from "./GLProductGrid";
import GLProductListView from "./GLProductListView";
import GLFilterPanel from "./GLFilterPanel";

const GLSearchProductCatalog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState(productData); // Initialize with all data

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);

  useEffect(() => {
    console.log(searchQuery.toLowerCase());
    const newFilteredProducts = productData.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(newFilteredProducts);
    setPage(1); // Reset page when search changes
  }, [searchQuery] , selectedCategories, priceRange, selectedManufacturers);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const handleGoBack = () => {
    navigate("/glproductdb", { state: { fromUpload: true } });
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const [searchCategory, setSearchCategory] = useState("all"); // Default category is "all"


  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };



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
      <Box sx={{ minHeight: "100vh", width: "100%", display: "flex" }}>
       
        <Box
          sx={{
            flexGrow: 1,
            padding: "20px",
            borderLeft: `1px solid ${theme.palette.divider}`,
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
              marginBottom: 2,
              width: "100%",
            }}
          >
            <GLDynamicHeader
              title="Search Product Catalog "
              descriptionContent={<p><LoremIpsum p={2} /></p>}
              showBackButton={true}
              backButtonHandler={handleGoBack}
            />
            <Box sx={{ width: "100%", display: "flex",justifyContent:"center" }}>
              <Box sx={{ width: '250px', borderRight: '1px solid #ccc', padding: '0px', height: '100%', overflowY: 'auto', flexShrink: 0 }} >
            <GLFilterPanel
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedManufacturers={selectedManufacturers}
          setSelectedManufacturers={setSelectedManufacturers}
          
        />
        </Box>
        <Box
                sx={{
                  flexGrow: 1,
                  padding: "20px",
                  borderLeft: `1px solid ${theme.palette.divider}`,
                  borderRadius: "5px",
                }}
              >
                

              <Grid
              flexGrow="1"
                xs={12}
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2, width: "100%" }}
              >
       
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <FormControl
                      variant="standard"
                      sx={{
                        minWidth: 120,
                        borderRight: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      <Select
                        value={searchCategory}
                        onChange={handleSearchCategoryChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        disableUnderline
                        sx={{
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingRight: "24px",
                          },
                        }}
                      >
                        <MenuItem value="all">ALL</MenuItem>
                        <MenuItem value="myList">My List</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={searchQuery}
                      onChange={handleSearchChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {searchQuery && (
                              <IconButton onClick={handleClearSearch}>
                                <ClearIcon />
                              </IconButton>
                            )}
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                      }}
                      sx={{ marginLeft: "-1px" }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                    Showing {startIndex + 1}-{endIndex} of{" "}
                    {filteredProducts.length} items
                  </Typography>
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
                      <Typography
                        sx={{
                          ml: 0.5,
                          whiteSpace: "nowrap",
                          fontSize: "10px",
                        }}
                      >
                        List View
                      </Typography>
                    </ToggleButton>
                    <ToggleButton value="grid" aria-label="grid">
                      <GridViewIcon />
                      <Typography
                        sx={{
                          ml: 0.5,
                          whiteSpace: "nowrap",
                          fontSize: "10px",
                        }}
                      >
                        Grid View
                      </Typography>
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
                  searchQuery={searchQuery}
                />
              ) : (
                <div sx={{ width: "100%" }}>
                  <GLProductListView
                    page={page}
                    products={filteredProducts}
                    itemsPerPage={itemsPerPage}
                    handlePageChange={handlePageChange}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                      searchQuery={searchQuery}
                    />
                  </div>
                )}
              </Box> </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </MasterLayout>
  );
};



export default GLSearchProductCatalog;
