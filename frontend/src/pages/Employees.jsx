import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    org: "",
    dept: "",
    status: "",
  });

  // 🔹 Fetch organizations for filter dropdown
  const fetchOrganizations = async () => {
    const res = await api.get("/organizations");
    setOrganizations(res.data);
  };

  // 🔹 Fetch employees with search & filters
  const fetchEmployees = async () => {
    setLoading(true);

    let url = "/employees";

    if (search) {
      url = `/employees/search?query=${encodeURIComponent(search)}`;
    } else if (filters.org || filters.dept || filters.status) {
      const params = new URLSearchParams(
        Object.entries(filters).filter(([_, v]) => v)
      );
      url = `/employees/filter?${params.toString()}`;
    }

    const res = await api.get(url);
    setEmployees(res.data);
    setLoading(false);
  };

  // 🔹 Delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    await api.delete(`/employees/${id}`);
    fetchEmployees();
  };

  // Initial load
  useEffect(() => {
    fetchEmployees();
    fetchOrganizations();
  }, []);

  // 🔹 Auto search
  useEffect(() => {
    if (search) {
      fetchEmployees();
    }
  }, [search]);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees</h2>
        <Link to="/employees/add" className="btn btn-success custom">
          + Add Employee
        </Link>
      </div>

      {/* 🔍 Search & Filters */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2">
            {/* Search */}
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, position, department"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Organization */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.org}
                onChange={(e) =>
                  setFilters({ ...filters, org: e.target.value })
                }
              >
                <option value="">All Organizations</option>
                {organizations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Department"
                value={filters.dept}
                onChange={(e) =>
                  setFilters({ ...filters, dept: e.target.value })
                }
              />
            </div>

            {/* Status */}
            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Apply Button */}
          <div className="row mt-3">
            <div className="col text-end">
              <button
                className="btn btn-primary custom"
                onClick={fetchEmployees}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <EmployeeTable
        employees={employees}
        loading={loading}
        onDelete={handleDelete}
      />

      {/* Bottom Actions */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <Link to="/organizations" className="btn btn-primary custom btn-sm">
          + Add Organization
        </Link>
        <Link to="/deleted" className="btn btn-danger btn-sm">
          Deleted Employees
        </Link>
      </div>
    </div>
  );
}

export default Employees;
