import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import viteLogo from '/book.png'
import './App.css'
import Signup from './pages/Authentication/signup.jsx';
import Login from './pages/Authentication/login.jsx';

import OrganizationContactForm from './pages/Authentication/form.jsx';
import SearchBar from "./components/searchbar.jsx";
import Dashboard from "./pages/Dashboard/dashboard.jsx";
import Trending from "./pages/Dashboard/trending.jsx";
import Browse from "./pages/Dashboard/browse.jsx";
import Product from "./pages/product/product.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  )
}

export default App
