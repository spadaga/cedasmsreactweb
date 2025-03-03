import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, createEmployee, updateEmployee } from '../services/api';
import Loading from '../utils/Loading'; // Import Loading

import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from '@mui/material';
import { showToast } from '../utils/toastUtils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../controls/Header';
import Footer from '../controls/Footer';

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await getEmployeeById(id);
        setName(response.data.name);
        setPosition(response.data.position);
        setSalary(response.data.salary);
      } catch (error) {
        showToast('error', 'Error fetching employee details');
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
  
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { name, position, salary };
    
    setIsLoading(true); // Start loading
   
    try {
     
      if (id) {
        await updateEmployee(id, employee);
        showToast('success', 'Employee updated successfully');
      } else {
        await createEmployee(employee);
        showToast('success', 'Employee added successfully');
      }
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Display the server's error message
        showToast('error', error.response.data.message);
      } else {
        // Handle other errors (e.g., network errors)
        showToast('error', 'Error saving employee details');
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header title={id ? 'Edit Employee' : 'Add Employee'} />
      <Container sx={{ flex: 1, paddingBottom: '60px',marginTop:'16px' }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Position"
              fullWidth
              margin="normal"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <TextField
              label="Salary"
              fullWidth
              margin="normal"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mr: 2,
                backgroundColor: '#1976d2', // Same color as the header
                '&:hover': {
                  backgroundColor: '#1565c0', // Darker shade for hover effect
                },
              }}
            >
              {id ? 'Update' : 'Add'} Employee
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleBack}
            >
              Back
            </Button>
          </form>
        </Paper>
        <ToastContainer />
      </Container>
      <Footer />
    </Box>
  );
};

export default EmployeeForm;