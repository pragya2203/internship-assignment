import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function OrganizationDetails() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    api.get(`/organizations/${id}`).then((res) => {
      setOrg(res.data);
    });
  }, [id]);

  if (!org) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>{org.name}</h3>
      <p className="text-muted">{org.industry}</p>
      <p>{org.description || "No description provided"}</p>

      <p className="text-muted">
        Created on: {new Date(org.createdAt).toLocaleDateString()}
      </p>

      <Link to="/" className="btn btn-outline-secondary btn-sm">
        ← Back to Employees
      </Link>
    </div>
  );
}

export default OrganizationDetails;
