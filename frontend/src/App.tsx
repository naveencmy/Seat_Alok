import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Exams from "./pages/Exams";
import Subjects from "./pages/Subjects";
import Halls from "./pages/Halls";
import Departments from "./pages/Departments";
import Students from "./pages/Students";
import Allocation from "./pages/Allocation";
import Seating from "./pages/Seating";

// const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
//   children,
// }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// };

const Navbar: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h1>Exam Seat Allocation</h1>
      <nav style={{ display: "flex", alignItems: "center" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/exams">Exams</Link>
        <Link to="/subjects">Subjects</Link>
        <Link to="/halls">Halls</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/students">Students</Link>
        <Link to="/allocation">Allocation</Link>
        <Link to="/seating">Seating</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
            <>
              <Navbar />
              <Dashboard />
            </>
            // </PrivateRoute>
          }
        />
        <Route
          path="/exams"
          element={
            //  <PrivateRoute>
            <>
              <Navbar />
              <Exams />
            </>
            // </PrivateRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            //<PrivateRoute>
            <>
              <Navbar />
              <Subjects />
            </>
            // </PrivateRoute>
          }
        />
        <Route
          path="/halls"
          element={
            //<PrivateRoute>
            <>
              <Navbar />
              <Halls />
            </>
            //</PrivateRoute>
          }
        />
        <Route
          path="/departments"
          element={
            // <PrivateRoute>
            <>
              <Navbar />
              <Departments />
            </>
            // </PrivateRoute>
          }
        />
        <Route
          path="/students"
          element={
            //  <PrivateRoute>
            <>
              <Navbar />
              <Students />
            </>
            // </PrivateRoute>
          }
        />
        <Route
          path="/allocation"
          element={
            //   <PrivateRoute>
            <>
              <Navbar />
              <Allocation />
            </>
            // </PrivateRoute>
          }
        />
        <Route
          path="/seating"
          element={
            //   <PrivateRoute>
            <>
              <Navbar />
              <Seating />
            </>
            // </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
