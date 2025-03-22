import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/api';
import { useThemeContext } from '../context/ThemeContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  TableSortLabel,
  TablePagination,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../utils/toastUtils';
import Header from '../controls/Header';
import Footer from '../controls/Footer';
import Loading from '../utils/Loading';
import MasterLayout from '../Layout/MasterLayout';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const {darkMode} = useThemeContext()

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true); // Start loading
    console.log('fetchEmployees: isLoading set to true'); // Add this line
     // Add a delay here (e.g., 2 seconds)
  await new Promise(resolve => setTimeout(resolve, 2500));
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      showToast('error', 'Error fetching employees');
    } finally {
      setIsLoading(false); // Stop loading
      console.log('fetchEmployees: isLoading set to false'); // Add this line
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (id) => {
    setSelectedEmployeeId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleDelete = async () => {
    setIsLoading(true); // Start loading
    console.log('handleDelete: isLoading set to true'); // Add this line
    try {
      await deleteEmployee(selectedEmployeeId);
      showToast('success', 'Employee deleted successfully');
    
      setTimeout(() => {
        fetchEmployees();
      }, 500); // 2-second delay before fetching employees
    } catch (error) {
      showToast('error', 'Error deleting employee');
    } finally {
      setIsLoading(false); // Stop loading
      console.log('handleDelete: isLoading set to false'); // Add this line
    }
    handleClose();
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (orderBy === 'salary') {
      return order === 'asc' ? a.salary - b.salary : b.salary - a.salary;
    } else {
      return order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <MasterLayout title="Employee Management System">
        <Box sx={{ flex: '1 0 auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/add"
              startIcon={<AddIcon />}
              sx={{
               
                backgroundColor: '#1976d2', // Same color as the header
                '&:hover': {
                  backgroundColor: '#1565c0', // Darker shade for hover effect
                },
              }}
            >
              Add Employee
            </Button>
          </Box>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            value={search}
            onChange={handleSearch}
          />
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow style={{ backgroundColor: darkMode ? '#333' : '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <TableSortLabel
                      active={orderBy === 'position'}
                      direction={orderBy === 'position' ? order : 'asc'}
                      onClick={() => handleRequestSort('position')}
                    >
                      Position
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <TableSortLabel
                      active={orderBy === 'salary'}
                      direction={orderBy === 'salary' ? order : 'asc'}
                      onClick={() => handleRequestSort('salary')}
                    >
                      Salary
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <Box sx={{ paddingRight: '16px' }}>Actions</Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedEmployees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((employee) => (
                    <TableRow key={employee._id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>${employee.salary}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            component={Link}
                            to={`/edit/${employee._id}`}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleClickOpen(employee._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={sortedEmployees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this employee?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <ToastContainer />
        </Box>
     
     
      <Loading isLoading={isLoading} /> {/* Include the Loading component */}
    </MasterLayout>
  );
};

export default EmployeeList;