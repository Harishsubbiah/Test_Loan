import axios from "axios";

const API_URL = 'http://localhost:3000';

const login = (credentials: { email: string; password: string }) => 
    axios.post(`${API_URL}/login`, credentials);

const register = (userData: { fullName: string; email: string; phone: string; gender: string; password: string }) => 
    axios.post(`${API_URL}/register`, userData);
const loan = (userData: {
    first_name: string;
    last_name: string;
    email: string;
    date: string; // Ensure this matches the expected date format
    loan_type: string;
    pan:string;
  
  }) => 
    axios.post(`${API_URL}/loan`, userData);
  

export default {
    login,
    register,loan
};
