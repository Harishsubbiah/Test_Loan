import React from 'react';
import './App.css';
import { Index } from './components/Index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from './components/Register';
import { LoanPage } from './components/LoanPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/register" element={<Register />} />
      <Route path="/loan" element={<LoanPage />} />
    </Routes>
  </Router>
  );
}

export default App;