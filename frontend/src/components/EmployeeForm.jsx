import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function EmployeeForm({ editingEmployee }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    organization: "",
    joiningDate: "",
    salary: "",
    status: "Active",
  });

  const [orgs, setOrgs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  /* ======================
     FETCH ORGANIZATIONS
  ====================== */
  useEffect(() => {
    api.get("/organizations").then((res) => setOrgs(res.data));
  }, []);

  /* ======================
     PREFILL FORM (EDIT)
  ====================== */
  useEffect(() => {
    if (editingEmployee) {
      setForm({
        fullName: editingEmployee.fullName || "",
        email: editingEmployee.email || "",
        phone: editingEmployee.phone || "",
        position: editingEmployee.position || "",
        department: editingEmployee.department || "",
        organization: editingEmployee.organization?._id || "",
        joiningDate: editingEmployee.joiningDate?.slice(0, 10) || "",
        salary: editingEmployee.salary || "",
        status: editingEmployee.status || "Active",
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ======================
     VALIDATION
  ====================== */
  const validateForm = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.fullName.trim()) return "Full Name is required";
    if (!nameRegex.test(form.fullName)) return "Invalid name";

    if (!form.email.trim()) return "Email is required";
    if (!emailRegex.test(form.email)) return "Invalid email";

    if (!form.phone.trim()) return "Phone number is required";
    if (!phoneRegex.test(form.phone)) return "Invalid phone number";

    if (!form.position.trim()) return "Position is required";
    if (!form.department.trim()) return "Department is required";
    if (!form.organization) return "Organization is required";
    if (!form.joiningDate) return "Joining date is required";

    if (form.joiningDate > today)
      return "Joining date cannot be in the future";

    if (form.salary && Number(form.salary) <= 0)
      return "Salary must be positive";

    return null;
  };

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const formData = {
        ...form,
        salary: form.salary ? Number(form.salary) : undefined,
      };

      if (editingEmployee) {
        await api.put(`/employees/${editingEmployee._id}`, formData);
        setSuccess("Employee updated successfully");
      } else {
        await api.post("/employees", formData);
        setSuccess("Employee added successfully");
      }

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {success && (
        <div className="alert alert-success text-center">{success}</div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-4">
            {editingEmployee ? "Edit Employee" : "Add Employee"}
          </h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Full Name */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  maxLength="10"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
              </div>

              {/* Position */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Position</label>
                <input
                  className="form-control"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                />
              </div>

              {/* Department */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Department</label>
                <input
                  className="form-control"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              {/* Organization */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Organization</label>
                <select
                  className="form-control"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                >
                  <option value="">Select organization</option>
                  {orgs.map((org) => (
                    <option key={org._id} value={org._id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Joining Date */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Joining Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="joiningDate"
                  value={form.joiningDate}
                  onChange={handleChange}
                  max={today}
                />
              </div>

              {/* Salary */}
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label">Salary (optional)</label>
                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                />
              </div>

              {/* Status */}
              <div className="col-12 col-md-6 mb-4">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-grid d-md-flex justify-content-md-end">
              <button className="btn custom px-5" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingEmployee
                    ? "Update Employee"
                    : "Add Employee"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
