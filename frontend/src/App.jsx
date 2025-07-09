import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThreatDetails from './pages/ThreatDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Analyze from "./pages/Analyze";

import Threats from './pages/Threats';
import SearchThreatById from './pages/SearchThreatById'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/threats" element={<Threats />} />
        <Route path="/threats/:id" element={<ThreatDetails />} />
        <Route path="/search-by-id" element={<SearchThreatById />} />
        <Route path="/analyze" element={<Analyze />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;