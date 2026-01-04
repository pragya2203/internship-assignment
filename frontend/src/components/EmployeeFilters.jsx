import { useEffect, useState } from "react";
import api from "../api/axios";

function EmployeeFilters({ onResult }) {
  const [query, setQuery] = useState("");
  const [orgs, setOrgs] = useState([]);
  const [filters, setFilters] = useState({
    org: "",
    dept: "",
    status: "",
  });

  useEffect(() => {
    api.get("/organizations").then((res) => setOrgs(res.data));
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    const res = await api.get(`/employees/search?query=${query}`);
    onResult(res.data);
  };

  const handleFilter = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/employees/filter?${params}`);
    onResult(res.data);
  };

  return (
    <div className="card p-3 mt-3">
      <input
        className="form-control mb-2"
        placeholder="Search by name, email, role..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="row">
        <div className="col">
          <select
            className="form-control"
            onChange={(e) => setFilters({ ...filters, org: e.target.value })}
          >
            <option value="">All Organizations</option>
            {orgs.map((o) => (
              <option key={o._id} value={o._id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <input
            className="form-control"
            placeholder="Department"
            onChange={(e) => setFilters({ ...filters, dept: e.target.value })}
          />
        </div>

        <div className="col">
          <select
            className="form-control"
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="mt-2 d-flex gap-2">
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary" onClick={handleFilter}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default EmployeeFilters;
