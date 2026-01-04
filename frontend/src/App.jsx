import { Routes, Route, Link } from "react-router-dom";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Organizations from "./pages/AddOrganization";
import DeletedEmployees from "./pages/DeletedEmployees";
import OrganizationDetails from "./pages/OrganizationDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";

import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      {/* 🔹 NAVBAR */}
      <nav className="navbar custom px-3 d-flex justify-content-between">
        <Link className="navbar-brand text-white fw-semibold" to="/">
          EMS
        </Link>
      </nav>

      <Routes>
        {/* 🔓 PUBLIC ROUTE */}
        <Route path="/login" element={<Auth />} />


        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizations"
          element={
            <ProtectedRoute>
              <Organizations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizations/:id"
          element={
            <ProtectedRoute>
              <OrganizationDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deleted"
          element={
            <ProtectedRoute>
              <DeletedEmployees />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
