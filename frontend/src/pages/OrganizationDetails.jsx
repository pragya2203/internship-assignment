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
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4>{org.name}</h4>
              <p className="text-muted">{org.industry}</p>

              <p>{org.description || "No description provided"}</p>

              <small className="text-muted d-block mb-3">
                Created on{" "}
                {new Date(org.createdAt).toLocaleDateString("en-IN")}
              </small>

              <Link to="/" className="btn btn-outline-secondary btn-sm">
                ← Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetails;
