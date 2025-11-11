import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import viteLogo from '/book.png'
import './App.css'
import Signup from './pages/Authentication/signup.jsx';
import Login from './pages/Authentication/login.jsx';

import OrganizationContactForm from './pages/Authentication/form.jsx';

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
