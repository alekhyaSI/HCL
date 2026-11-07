import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8080/api/main/employee";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      setError("");
      const response = await axios.get(API);
      setEmployees(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Could not load employees. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return employees;

    return employees.filter((emp) =>
      [emp.id, emp.firstName, emp.lastName, emp.email]
        .some((value) =>
          String(value ?? "").toLowerCase().includes(term)
        )
    );
  }, [employees, search]);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      setEmployees((current) =>
        current.filter((emp) => emp.id !== id)
      );
    } catch (err) {
      setError("Employee could not be deleted. Please try again.");
    }
  };

  return (
    <main className="page-shell">

      <section className="welcome-panel">
        <div>
          <span className="eyebrow">EMPLOYEE MANAGEMENT</span>
          <h1>People are your greatest asset.</h1>
          <p>Manage your team details from one simple workspace.</p>
        </div>
        <div className="welcome-mark">✦</div>
      </section>

      <section className="stats-grid">

        <article className="stat-card">
          <span className="stat-icon">♙</span>
          <div>
            <p>Total employees</p>
            <strong>{employees.length}</strong>
          </div>
        </article>

        <article className="stat-card">
          <span className="stat-icon stat-icon-purple">⌕</span>
          <div>
            <p>Showing results</p>
            <strong>{filteredEmployees.length}</strong>
          </div>
        </article>

      </section>

      <section className="content-card">

        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR ORGANIZATION</span>
            <h2>Employee Directory</h2>
            <p>View, update, or remove employee records.</p>
          </div>

          <Link to="/addEmployee" className="primary-button">
            ＋ Add Employee
          </Link>
        </div>

        <div className="table-toolbar">

          <label className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <span className="result-count">
            {filteredEmployees.length} records
          </span>

        </div>

        {error && (
          <div className="alert-message">{error}</div>
        )}

        {loading ? (
          <div className="empty-state">
            <span className="loader"></span>
            Loading employees...
          </div>
        ) : filteredEmployees.length === 0 ? (

          <div className="empty-state">
            <span className="empty-icon">♙</span>
            <h3>
              {search ? "No matching employees" : "No employees yet"}
            </h3>
            <p>
              {search
                ? "Try another search term."
                : "Add your first employee to get started."}
            </p>

            {!search && (
              <Link to="/addEmployee" className="primary-button">
                Add First Employee
              </Link>
            )}
          </div>

        ) : (

          <div className="table-wrap">
            <table className="employee-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMPLOYEE</th>
                  <th>EMAIL ADDRESS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (

                  <tr key={emp.id}>

                    <td>
                      <span className="id-pill">#{emp.id}</span>
                    </td>

                    <td>
                      <div className="employee-cell">

                        <span className="avatar">
                          {`${emp.firstName?.[0] || ""}${emp.lastName?.[0] || ""}`.toUpperCase() || "E"}
                        </span>

                        <span className="employee-name">
                          {emp.firstName} {emp.lastName}
                        </span>

                      </div>
                    </td>

                    <td className="email-cell">
                      {emp.email}
                    </td>

                    <td>
                      <div className="action-group">

                        <Link
                          className="action-link view-link"
                          to={`/viewEmployee/${emp.id}`}
                        >
                          View
                        </Link>

                        <Link
                          className="action-link edit-link"
                          to={`/editEmployee/${emp.id}`}
                        >
                          Edit
                        </Link>

                        <button
                          className="action-link delete-link"
                          onClick={() => deleteEmployee(emp.id)}
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}
              </tbody>

            </table>
          </div>

        )}

      </section>

      <p className="page-footnote">
        Employee Management System • Keep your team information organized.
      </p>

    </main>
  );
}