import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import EmployeeForm from "../components/EmployeeForm";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/employees/${id}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Employee not found");
        navigate("/");
      });
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">

      <EmployeeForm
        editingEmployee={employee}
        onSuccess={() => {
          navigate("/");
        }}
      />
    </div>
  );
}

export default EditEmployee;
