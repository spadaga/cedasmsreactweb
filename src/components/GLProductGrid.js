import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,styled
} from "@mui/material";
import ImageChecker from "../controls/ImageChecker";

function GLProductGridView({ products, page, itemsPerPage, handlePageChange, handleItemsPerPageChange,searchQuery }) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
 // const currentProducts = products.slice(startIndex, endIndex);

 const sortedProducts = [...products].sort((a, b) => {
  // Example: Sort by product title alphabetically
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
});

  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);


    if (!paginatedProducts || paginatedProducts.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="body1">No products found.</Typography>
        </Grid>
      );
    }

    const StyledCardContent = styled(CardContent)(({ theme }) => ({
      display: "flex",
      flexDirection: "column",
      flexGrow: 1, // Allow content to grow and fill available space
    }));
    

  return (
    <Grid container spacing={2}>
      {paginatedProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
           
         
          <ImageChecker imageUrl={product.image}  />
         
            <StyledCardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 ,fontSize: "0.8rem" ,lineHeight:"1",pb:1}}>
                {product.title}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem",opacity:0.7 }}>
                {product.manufacturer}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem",opacity:0.7  }}>
                {product.model}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: "0.9rem", fontWeight: 600,opacity:0.8}}>
                ${product.price} /each
              </Typography>
              <Button variant="contained" fullWidth sx={{ mt: 'auto', textTransform: "none" }}>
                Add to List
              </Button>
            </StyledCardContent>
          </Card>
        </Grid>
      ))}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2,p:2 }}>
        <Grid item>
          <FormControl>
            <InputLabel id="items-per-page-label">Items per page</InputLabel>
            <Select
              labelId="items-per-page-label"
              id="items-per-page"
              value={itemsPerPage}
              label="Items per page"
              onChange={handleItemsPerPageChange}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} items
          </Typography>
        </Grid>
        <Grid item>
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="small"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GLProductGridView;