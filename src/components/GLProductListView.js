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

function GLProductListView({ products }) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (!products || products.length === 0) {
    return (
      <Grid item xs={12}>
        <Typography variant="body1">No products found.</Typography>
      </Grid>
    );
  }

//   console.log(products);
// const filteredProducts = products.filter((product) =>
//   product.title.toLowerCase().includes(searchQuery.toLowerCase())
// );


  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <Grid item xs={12}>
      <List sx={{ width: "100%" }}>
        {currentProducts.map((product) => (
          <ListItem key={product.title} sx={{ padding: 0, marginBottom: 2 }}> {/* Add marginBottom */}
            <Card sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <ListItemAvatar sx={{ paddingLeft: 2 }}>
                    <Avatar src={product.image} alt={product.title} sx={{ width: 60, height: 60 }} />
                  </ListItemAvatar>
                </Grid>
                <Grid item xs={6}>
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
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                      ${product.price} /each
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right", paddingRight: 2 }}>
                  <Button variant="contained" size="small" sx={{ textTransform: "none" }}>
                    Add to List
                  </Button>
                  <Typography variant="body2" color="primary" sx={{ cursor: "pointer", display: "block", mt: 1 }}>
                    Quick View
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </ListItem>
        ))}
      </List>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Grid item>
          <FormControl>
            <InputLabel id="items-per-page-label">Show</InputLabel>
            <Select
              labelId="items-per-page-label"
              id="items-per-page"
              value={itemsPerPage}
              label="Show"
              onChange={handleItemsPerPageChange}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={20}>20 items</MenuItem>
              <MenuItem value={50}>50 items</MenuItem>
              <MenuItem value={100}>100 items</MenuItem>
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
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} items
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GLProductListView;