import { useEffect, useState } from "react";
import api from "../api/axios";

function DeletedEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDeletedEmployees = async () => {
    setLoading(true);
    const res = await api.get("/employees/deleted");
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDeletedEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Deleted Employees</h2>
  
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : employees.length === 0 ? (
        <p className="text-center text-muted">No deleted employees found.</p>
      ) : (
        <>
          {/* ================= MOBILE VIEW ================= */}
          <div className="d-block d-md-none">
            {employees.map((emp) => (
              <div key={emp._id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h6 className="mb-1">{emp.fullName}</h6>
                  <small className="text-muted d-block">{emp.email}</small>
  
                  <hr className="my-2" />
  
                  <div className="small">
                    <div>
                      <strong>Position:</strong> {emp.position}
                    </div>
                    <div>
                      <strong>Department:</strong> {emp.department}
                    </div>
                    <div>
                      <strong>Organization:</strong>{" "}
                      {emp.organization?.name || "-"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* ================= DESKTOP VIEW ================= */}
          <div className="d-none d-md-block">
            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Organization</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.fullName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.position}</td>
                    <td>{emp.department}</td>
                    <td>{emp.organization?.name || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
  
}

export default DeletedEmployees;
