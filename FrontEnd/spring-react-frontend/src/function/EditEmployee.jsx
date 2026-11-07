import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8080/api/main/employee";

export default function EditEmployee() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  const onInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {

    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await axios.put(`${API}/${id}`, employee);

      navigate("/");

    } catch (err) {
      setError("Could not update employee. Please try again.");
    } finally {
      setSaving(false);
    }

  };

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

      <section className="form-card">

        <div className="form-intro">

          <span className="form-icon edit-icon">✎</span>

          <span className="eyebrow">EMPLOYEE DIRECTORY</span>

          <h1>Edit Employee</h1>

          <p>Update the details for employee #{id}.</p>

        </div>

        {error && (
          <div className="alert-message">{error}</div>
        )}

        <form onSubmit={onSubmit} className="employee-form">

          <div className="field-row">

            <div className="form-field">

              <label htmlFor="firstName">First Name</label>

              <input
                id="firstName"
                name="firstName"
                value={employee.firstName}
                onChange={onInputChange}
                required
              />

            </div>

            <div className="form-field">

              <label htmlFor="lastName">Last Name</label>

              <input
                id="lastName"
                name="lastName"
                value={employee.lastName}
                onChange={onInputChange}
                required
              />

            </div>

          </div>

          <div className="form-field">

            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              value={employee.email}
              onChange={onInputChange}
              required
            />

          </div>

          <div className="form-actions">

            <Link to="/" className="secondary-button">
              Cancel
            </Link>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving ? "Updating..." : "Save Changes"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}