import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ThemeContextProvider } from './context/ThemeContext';
import NotificationsPage from './components/NotificationsPage';
import AmsUsers from './components/AmsUsers';
import ToolData from './components/ToolData';
import AmsToolData from './components/AmsToolData';
import Transhistory from './components/Transhistory';
const theme = createTheme();

function App() {
  return (
    <ThemeContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
        <Route path="/notifications" element={<NotificationsPage />} /> {/* Add NotificationsPage route */}


        <Route path="/amsusers" element={<AmsUsers />} />
        


        <Route path="/tooldata" element={<AmsToolData />} />


        <Route path="/orders" element={<Transhistory />} />


      </Routes>
    </Router>
  </ThemeContextProvider>
  );
}

export default App;