import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PAGE_SIZE = 10;

function EmployeeTable({ employees, loading, onDelete }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  if (loading) {
    return <p className="text-center my-3">Loading...</p>;
  }

  const totalPages = Math.ceil(employees.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedEmployees = employees.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <>
      {/* ================= MOBILE CARDS ================= */}
      <div className="d-block d-md-none">
        {paginatedEmployees.length === 0 ? (
          <p className="text-center text-muted py-4">
            No employees found
          </p>
        ) : (
          paginatedEmployees.map((emp) => (
            <div key={emp._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h6 className="mb-1">{emp.fullName}</h6>

                  <span
                    className={`badge ${
                      emp.status === "Active"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>

                <small className="text-muted d-block">
                  {emp.email}
                </small>

                <hr className="my-2" />

                <div className="small">
                  <div><strong>Position:</strong> {emp.position}</div>
                  <div><strong>Department:</strong> {emp.department}</div>
                  <div>
                    <strong>Organization:</strong>{" "}
                    {emp.organization?.name || "-"}
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    className="btn btn-primary custom btn-sm"
                    onClick={() =>
                      navigate(`/employees/edit/${emp._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDelete(emp._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="d-none d-md-block">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Organization</th>
              <th>Joining Date</th>
              <th>Salary</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center text-muted py-4">
                  No employees found
                </td>
              </tr>
            ) : (
              paginatedEmployees.map((emp) => (
                <tr key={emp._id}>
                  <td className="fw-medium">{emp.fullName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>{emp.organization?.name || "-"}</td>
                  <td>
                    {emp.joiningDate
                      ? new Date(emp.joiningDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {emp.salary
                      ? `₹${Number(emp.salary).toLocaleString()}`
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        emp.status === "Active"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {emp.status}
                    </span>
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
                            onClick={() =>
                              navigate(`/employees/edit/${emp._id}`)
                            }
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => onDelete(emp._id)}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 mt-4">
          <small className="text-muted">
            Page {page} of {totalPages}
          </small>

          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link custom-pagination"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link custom-pagination"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link custom-pagination"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

    </>
  );
}

export default EmployeeTable;
