import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function GLProductListView({
  products,
  page,
  itemsPerPage,
  handlePageChange,
  handleItemsPerPageChange,
  searchQuery,
}) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  console.log("items per page", itemsPerPage);

  if (!products || products.length === 0) {
    return (
      <Grid item xs={12}>
        <Typography variant="body1">No products found.</Typography>
      </Grid>
    );
  }

  // console.log(products);
  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <Grid item xs={12}>
      <List sx={{ width: "100%" }}>
        {currentProducts.map((product) => (
          <ListItem key={product.id} sx={{ padding: 0, marginBottom: 2 }}>
            {" "}
            {/* Add marginBottom */}
            <Card sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Grid container alignItems="center">
                <Grid item xs={2} sx={{ padding: 0 }}>
                  <ListItemAvatar sx={{ paddingLeft: 4 }} >
                    <Avatar
                      src={product.image}
                      alt={product.title}
                      sx={{ width: 60, height: 60,padding: 0  }}
                    />
                  </ListItemAvatar>
                </Grid>
                <Grid item xs={6} >
                <CardContent sx={{ padding: "8px 0" }}>
  <Typography
    variant="subtitle1"
    sx={{ fontWeight: 600, fontFamily: "Roboto, sans-serif", fontSize: "1rem" }} // Larger title
  >
    {product.title}
  </Typography>
  <Typography
    variant="body2"
    sx={{ fontSize: "0.8rem", fontFamily: "Roboto, sans-serif" }} // Slightly larger manufacturer
  >
    {product.manufacturer}
  </Typography>
  <Typography
    variant="body2"
    sx={{ fontSize: "0.8rem", fontFamily: "Roboto, sans-serif" }} // Model, slightly smaller
  >
    {product.model}
  </Typography>
  <Typography
    variant="subtitle2"
    sx={{ fontWeight: 600, mt: 0.5, fontFamily: "Roboto, sans-serif", fontSize: "0.9rem" }} // Price, medium size
  >
    ${product.price} /each
  </Typography>
</CardContent>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right", paddingRight: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    Add to List
                  </Button>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer", display: "block", mt: 1 }}
                  >
                    Quick View
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </ListItem>
        ))}
      </List>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Grid item>
          <FormControl>
            <InputLabel id="items-per-page-label">Show</InputLabel>
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
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="small"
          />
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of{" "}
            {products.length} items
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GLProductListView;
