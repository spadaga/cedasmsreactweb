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

function GLProductGridView({ products, page, itemsPerPage, handlePageChange, handleItemsPerPageChange,searchQuery }) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
 // const currentProducts = products.slice(startIndex, endIndex);
  const paginatedProducts = products.slice(startIndex, endIndex);


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
            <CardMedia component="img" height="140" image={product.image} alt={product.title} />
            <StyledCardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {product.title}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {product.manufacturer}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {product.model}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                ${product.price} /each
              </Typography>
              <Button variant="contained" fullWidth sx={{ mt: 'auto', textTransform: "none" }}>
                Add to List
              </Button>
            </StyledCardContent>
          </Card>
        </Grid>
      ))}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
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