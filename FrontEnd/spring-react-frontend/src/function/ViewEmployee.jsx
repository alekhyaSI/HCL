import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API = "http://localhost:8080/api/main/employee";

export default function ViewEmployee() {

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {

    const loadEmployee = async () => {

      try {
        const response = await axios.get(`${API}/${id}`);
        setEmployee(response.data);

      } catch (err) {
        setError("Could not load employee details.");
      } finally {
        setLoading(false);
      }

    };

    loadEmployee();

  }, [id]);

  if (loading) {
    return (
      <main className="form-page">
        <div className="empty-state">
          <span className="loader"></span>
          Loading employee...
        </div>
      </main>
    );
  }

  return (
    <main className="form-page">

      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <section className="detail-card">

        <div className="detail-top">

          <span className="eyebrow">EMPLOYEE PROFILE</span>

          <span className="id-pill">
            ID #{id}
          </span>

        </div>

        {error ? (

          <div className="alert-message">{error}</div>

        ) : employee && (

          <>

            <div className="profile-heading">

              <span className="profile-avatar">
                {`${employee.firstName?.[0] || ""}${employee.lastName?.[0] || ""}`.toUpperCase()}
              </span>

              <div>
                <h1>
                  {employee.firstName} {employee.lastName}
                </h1>

                <p>Employee Record</p>
              </div>

            </div>

            <div className="detail-list">

              <div>
                <span>First Name</span>
                <strong>{employee.firstName}</strong>
              </div>

              <div>
                <span>Last Name</span>
                <strong>{employee.lastName}</strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>{employee.email}</strong>
              </div>

            </div>

            <div className="form-actions">

              <Link to="/" className="secondary-button">
                Back to Directory
              </Link>

              <Link
                to={`/editEmployee/${id}`}
                className="primary-button"
              >
                Edit Details
              </Link>

            </div>

          </>

        )}

      </section>

    </main>
  );
}