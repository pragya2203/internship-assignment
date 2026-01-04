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

  /* FETCH ORGANIZATIONS */
  const fetchOrganizations = async () => {
    const res = await api.get("/organizations");
    setOrganizations(res.data);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  /* FORM HANDLERS */
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

  const handleEdit = (org) => {
    setFormData({
      name: org.name,
      industry: org.industry,
      description: org.description || "",
    });
    setEditingOrgId(org._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this organization?")) return;
    await api.delete(`/organizations/${id}`);
    fetchOrganizations();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Organization Management</h2>

      {/* FORM */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="text-center mb-3">
                {editingOrgId ? "Edit Organization" : "Add Organization"}
              </h5>

              {success && (
                <div className="alert alert-success">{success}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
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

                <button className="btn custom w-100" disabled={loading}>
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

      {/* ORGANIZATION LIST */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">All Organizations</h5>

          {organizations.length === 0 ? (
            <p className="text-muted">No organizations added yet.</p>
          ) : (
            <>
              {/* MOBILE */}
              <div className="d-block d-md-none">
                {organizations.map((org) => (
                  <div key={org._id} className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <h6>{org.name}</h6>
                      <small className="text-muted">{org.industry}</small>

                      <p className="small mt-2">
                        {org.description || "-"}
                      </p>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEdit(org)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(org._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="d-none d-md-block">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Industry</th>
                      <th>Description</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.map((org) => (
                      <tr key={org._id}>
                        <td>{org.name}</td>
                        <td>{org.industry}</td>
                        <td>{org.description || "-"}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-primary custom me-2"
                            onClick={() => handleEdit(org)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(org._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddOrganization;
