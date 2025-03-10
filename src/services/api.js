import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000/API/employees/';
const API_URL = process.env.REACT_APP_API_URL 
const api = axios.create({
  baseURL: API_URL,
});


// Log a message when the API is connected
api.interceptors.request.use((config) => {
    console.log('API Connected:', config.baseURL);
    return config;
  });

// Employees API
export const getEmployees = () => api.get('employees/getallemployees');
export const getEmployeeById = (id) => api.get(`employees/getempbyid/${id}`);
export const createEmployee = (employee) => api.post('employees/createemployee', employee);
export const updateEmployee = (id, employee) => api.put(`employees/updateemp/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`employees/deleteemp/${id}`);



// AMSUSER API
export const getAllAmsusers = () => api.get('amsusers/getAllAmsusers');
export const getAmsuserByUserid = (userid) => api.get(`amsusers/getAmsuserByUserid/${userid}`);
export const createAmsuser = (amsuser) => api.post('amsusers/createAmsuser', amsuser);
export const updateAmsuserByUserid = (userid, amsuser) => api.put(`amsusers/updateAmsuserByUserid/${userid}`, amsuser);
export const deleteAmsuserByUserid = (userid) => api.delete(`amsusers/deleteAmsuserByUserid/${userid}`);



// TOOLDATA API
export const getToolData = () => api.get('/tooldata/gettooldata');



// Transhistory API
export const getOrders = () => api.get('/orders/getorders');
// Transhistory API
export const createorder = () => api.post('/orders/createorder');

export default api;