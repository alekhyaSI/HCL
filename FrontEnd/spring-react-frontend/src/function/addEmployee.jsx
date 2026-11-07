import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:8080/api/main/employee";

export default function AddEmployee() {

  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

      await axios.post(API, employee);

      navigate("/");

    } catch (err) {
      setError("Could not save employee. Check the backend connection.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="form-page">

      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <section className="form-card">

        <div className="form-intro">

          <span className="form-icon">＋</span>

          <span className="eyebrow">EMPLOYEE DIRECTORY</span>

          <h1>Add a New Employee</h1>

          <p>Enter the employee details below to create a record.</p>

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
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={employee.firstName}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>

              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter last name"
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
              placeholder="name@example.com"
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
              {saving ? "Saving..." : "Create Employee"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}