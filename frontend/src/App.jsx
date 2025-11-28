import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import viteLogo from '/book.png'
import './App.css'
import Signup from './pages/Authentication/signup.jsx';
import Login from './pages/Authentication/login.jsx';

import OrganizationContactForm from './pages/Authentication/form.jsx';
import SearchBar from "./components/searchbar.jsx";
import Dashboard from "./components/navbar.jsx";
import Trending from "./pages/Dashboard/trending.jsx";
import Browse from "./pages/Dashboard/browse.jsx";
import Product from "./pages/product/product.jsx";
import Start from "./pages/starting/start.jsx";
import BookFair from "./pages/community/bookfair.jsx";
import Sell from "./pages/sell/sell.jsx";
import Footer from "./components/footer.jsx";
import Donation from "./pages/contribute/donation.jsx";
import ViewCart from "./pages/cart/viewcart.jsx";
import Profile from "./pages/profile/profile.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/contribute" element={<><Dashboard /><Donation /><Footer /></>} />
        <Route path="/community" element={<><Dashboard /><BookFair /><Footer /></>} />
        <Route path="/bookfair" element={<BookFair />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/profile" element={<><Dashboard /><Profile /><Footer /></>} />
      </Routes>
    </Router>
  )
}

export default App
