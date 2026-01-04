import { useEffect, useState } from "react";
import api from "../api/axios";

function AddOrganization() {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: "",
  });

  const [organizations, setOrganizations] = useState([]);
  const [editingOrgId, setEditingOrgId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  /* ======================
     FETCH ORGANIZATIONS
  ====================== */
  const fetchOrganizations = async () => {
    const res = await api.get("/organizations");
    setOrganizations(res.data);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  /* ======================
     FORM HANDLERS
  ====================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      if (editingOrgId) {
        await api.put(`/organizations/${editingOrgId}`, formData);
        setSuccess("Organization updated successfully!");
      } else {
        await api.post("/organizations", formData);
        setSuccess("Organization added successfully!");
      }

      setFormData({ name: "", industry: "", description: "" });
      setEditingOrgId(null);
      fetchOrganizations();
    } catch (err) {
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     EDIT ORGANIZATION
  ====================== */
  const handleEdit = (org) => {
    setFormData({
      name: org.name,
      industry: org.industry,
      description: org.description || "",
    });
    setEditingOrgId(org._id);
  };

  /* ======================
     DELETE ORGANIZATION
  ====================== */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this organization?"
    );
    if (!confirmDelete) return;

    await api.delete(`/organizations/${id}`);
    fetchOrganizations();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Organization Management</h2>

      {/* ======================
         ADD / EDIT FORM
      ====================== */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3 text-center">
                {editingOrgId ? "Edit Organization" : "Add Organization"}
              </h5>

              {success && (
                <div className="alert alert-success">{success}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Organization Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="industry"
                    placeholder="Industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

            
                  <button className="btn btn-primary custom w-100" disabled={loading}>
                  {loading
                    ? "Saving..."
                    : editingOrgId
                    ? "Update Organization"
                    : "Create Organization"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ======================
         ORGANIZATION TABLE
      ====================== */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">All Organizations</h5>

          {organizations.length === 0 ? (
            <p className="text-muted">No organizations added yet.</p>
          ) : (
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Industry</th>
                  <th>Description</th>
                  <th>Created At</th> 
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {organizations.map((org) => (
                  <tr key={org._id}>
                    <td className="fw-medium">{org.name}</td>
                    <td>{org.industry}</td>
                    <td className="text-muted">
                      {org.description || "-"}
                    </td>

                    <td>
                      {new Date(org.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="text-end">
                      <div className="dropdown">
                        <button
                          className="btn btn-light btn-sm"
                          data-bs-toggle="dropdown"
                        >
                          ⋮
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleEdit(org)}
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => handleDelete(org._id)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddOrganization;
