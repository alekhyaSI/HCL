import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="topbar">

      <div className="topbar-inner">

        <Link to="/" className="brand">

          <span className="brand-mark">E</span>

          <span>
            People<span className="brand-light">Desk</span>
            <small>EMPLOYEE PORTAL</small>
          </span>

        </Link>

        <nav className="top-nav">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Dashboard
          </NavLink>

          <Link to="/addEmployee" className="nav-add">
            ＋ Add Employee
          </Link>

        </nav>

      </div>

    </header>
  );
}