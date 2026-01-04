import { useState } from "react";
import api from "../api/axios";

function OrganizationForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      return setError("Organization name is required");
    }

    try {
      setLoading(true);
      await api.post("/organizations", form);
      setForm({ name: "", industry: "", description: "" });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-3 border-0 bg-light">
      <div className="card-body">
        <h5 className="mb-3">Add New Organization</h5>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Organization name *"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="industry"
            placeholder="Industry"
            value={form.industry}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-2"
            name="description"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />

          <button
            className="btn w-100 text-white"
            style={{ backgroundColor: "#0b3c5d" }}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Organization"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrganizationForm;
