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
      <h2>Deleted Employees</h2>

      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No deleted employees found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
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
                <td>{emp.organization?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DeletedEmployees;
