// ProductsDashboard.jsx
import React , { useState } from 'react';
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
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MasterLayout from '../Layout/MasterLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import GLProducts from './GLProducts';


const ProductsDashboard = () => {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleUploadFromExcel = () => {
    navigate('/glproductupload'); // Redirect to GLProductUpload
    setOpen(false); // Close the modal
  };


    // Check if the user came from the GLProductUpload page
    const cameFromUpload = location.state && location.state.fromUpload;
    const [showGLProducts, setShowGLProducts] = useState(cameFromUpload);
  
    const handleShowGLProducts = () => {
      setShowGLProducts(true);
      setOpen(false);
    }

    

  return (
    <MasterLayout title="Products Dashboard">
      <Box
        sx={{
          padding: '20px',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '5px',
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#F8F9FC',
        }}
      >
        <Box sx={{ padding: 3, minHeight: '100vh' }}>
          <Typography variant="h6" gutterBottom>
            Dashboard / Products
          </Typography>

          <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
            <Table aria-label="customer connection table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: 'bold', width: '20%' }}>
                    CUSTOMER
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: 'bold', width: '25%' }}>
                    CONNECTION STATUS
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: 'bold', width: '30%' }}>
                    CONNECTION TYPE
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: 'bold', width: '25%' }}>
                    LAST TRANSMITTED ON
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ padding: '8px 16px', width: '20%' }}>ABC-Electricals</TableCell>
                  <TableCell sx={{ padding: '8px 16px', width: '25%' }}>
                    <Box display="flex" alignItems="center">
                      <CheckCircleIcon sx={{ color: 'green', marginRight: 1 }} />
                      Connected
                    </Box>
                  </TableCell>
                  <TableCell sx={{ padding: '8px 16px', width: '30%' }}>
                    NetSuite(Account Id:57525)
                  </TableCell>
                  <TableCell sx={{ padding: '8px 16px', width: '25%' }}>12/12/2022</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

         
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
            <Typography variant="h5">Products</Typography>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />}>
              Add Products
            </Button>
          </Box>

          {showGLProducts ? (
            <GLProducts />
          ) : (
            <Paper sx={{ padding: 4, textAlign: 'center' }}>
              <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                <Grid item>
                  <Inventory2Icon sx={{ fontSize: 150, color: 'grey' }} />
                </Grid>
                <Grid item>
                  <Typography variant="h6">No Products Found</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">Start by adding products to your inventory.</Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={handleShowGLProducts}>
                    Add Products
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Confirmation Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Button
              variant="contained"
              style={{ marginBottom: '10px', display: 'block', width: '100%' }}
              onClick={handleUploadFromExcel} // Add onClick handler
            >
              UPLOAD PRODUCTS FROM EXCEL
            </Button>
            <Button variant="contained" style={{ display: 'block', width: '100%' }}>
              SEARCH AND ADD PRODUCTS TO THE CATALOG
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
        </DialogActions>
      </Dialog>
    </MasterLayout>
  );
};

export default ProductsDashboard;