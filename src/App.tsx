import React from 'react';
import './App.css';


import { AuthProvider } from './context/AuthContext';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";


import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {

  return (
    <AuthProvider>
      <Router>
      <Routes>
      <Route  path="Home" element={<Home/> } />
      <Route  path="/" element={<Login/> } />
      <Route  path="Signup" element={<SignUp/> } />      
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
