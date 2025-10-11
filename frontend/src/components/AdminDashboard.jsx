import { useState } from "react";
import "../css/Dashboard.css"; // CSS file from src/css folder

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="dashboard-container d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-3">
        <h4 className="text-center mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className={`nav-link text-white ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        <div className="dashboard-header mb-4">
          <h2>Welcome, Admin 👋</h2>
          <p className="text-muted">Manage your application efficiently</p>
        </div>

        <div className="dashboard-body">
          {activeTab === "overview" && (
            <div>
              <h4>Overview</h4>
              <p>This section shows key statistics and quick summaries.</p>
            </div>
          )}
          {activeTab === "users" && (
            <div>
              <h4>Manage Users</h4>
              <p>View, add, or remove users from the system.</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div>
              <h4>Settings</h4>
              <p>Update dashboard preferences and account information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
