import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/admindashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🟢 Login Page */}
        <Route path="/" element={<Login />} />

        {/* 🟢 Admin Dashboard */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
