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
import ToolMgrSettings from './components/ToolMgrSettings';
import AmsCatalog from './components/AmsCatalog';
import InvMgrSettings from './components/InvMgrSettings';
import Glcustomers from './components/Glcustomers';
import GlNewcustomer from './components/GlNewcustomer';
import GLmanagecustomer from './components/GLmanagecustomer';
import GLcednetcustomers from './components/GLcednetcustomers';
import ProductsDashboard from './components/GLProductsDashboard';
import GLProductUpload from './components/GLProductUpload';
import GLSearchProductCatalog from './components/GLSearchProductCatalog';
import GLProductDetails from './components/GLProductDetails';
import GLConnections from './components/GLConnections';
import GLCreditMemoForm from './components/GLCreditMemoForm';
import GLAcPaySettings from './components/GLAcPaySettings';
import GLNotificationsettings from './components/GLNotificationsettings';
import GLUploadProducts from './components/GLUploadProducts';
import GLTransactionhistory from './components/GLTransactionhistory';
import GLPO from './components/GLPO';
import GLCustomerBills from './components/GLCustomerBills';
import GLBillDetails from './components/GLBillDetails';





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

        <Route path="/toolMgrSettings" element={<ToolMgrSettings />} />

        <Route path="/amscatalog" element={<AmsCatalog />} />

        
        <Route path="/invmgrsets" element={<InvMgrSettings />} />

        <Route path="/glcustomers" element={<Glcustomers />} />
        <Route path="/glnewcustomers" element={<GlNewcustomer />} />

        <Route path="/glmanagecustomer" element={<GLmanagecustomer />} />

        <Route path="/glcednetcustomers" element={<GLcednetcustomers />} />

        <Route path="/glproductdb" element={<ProductsDashboard />} />

        <Route path="/glproductupload" element={<GLProductUpload />} />

        <Route path="/glproductsearch" element={<GLSearchProductCatalog />} />

        <Route path="/glproductdetails" element={<GLProductDetails />} />

        <Route path="/glconnections" element={<GLConnections />} />

        <Route path="/glmemosetting" element={<GLCreditMemoForm />} />

        <Route path="/glacpayset" element={<GLAcPaySettings />} />

        <Route path="/glnotification" element={<GLNotificationsettings />} />


        <Route path="/gluploadproducts" element={<GLUploadProducts />} />


        <Route path="/gltranshistory" element={<GLTransactionhistory />} />

        <Route path="/glpo" element={<GLPO />} />

        <Route path="/glcustbill" element={<GLCustomerBills />} />

        <Route path="/glbilldet" element={<GLBillDetails />} />
      </Routes>
    </Router>
  </ThemeContextProvider>
  );
}

export default App;