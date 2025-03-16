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
  InputLabel,
} from "@mui/material";

function GLProductGridView({ products, page, itemsPerPage, handlePageChange, handleItemsPerPageChange }) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <Grid container spacing={2}>
      {currentProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.title}>
          <Card>
            <CardMedia component="img" height="140" image={product.image} alt={product.title} />
            <CardContent>
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
              <Button variant="contained" fullWidth sx={{ mt: 1, textTransform: "none" }}>
                Add to List
              </Button>
            </CardContent>
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