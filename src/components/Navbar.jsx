import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
    const navLinkClass = ({ isActive }) =>
        `nav-link ${isActive ? "active fw-semibold text-white" : "text-light"}`;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand fw-bold" to="/">
                    StudentMS
                </Link>

                {/* Mobile toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    {/* Links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
                        <li className="nav-item">
                            <NavLink to="/" end className={navLinkClass}>
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/about" className={navLinkClass}>
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/courses" className={navLinkClass}>
                                Courses
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/students" className={navLinkClass}>
                                Students
                            </NavLink>
                        </li>

                        {/* Dropdown */}
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle text-light"
                                data-bs-toggle="dropdown"
                                type="button"
                                aria-expanded="false"
                            >
                                Actions
                            </button>

                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <Link className="dropdown-item" to="/add-student">
                                        <i className="fa-solid fa-user-plus me-2"></i>
                                        Add Student
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/add-course">
                                        <i className="fa-solid fa-circle-plus me-2"></i>
                                        Add Course
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item" to="/students">
                                        <i className="fa-solid fa-users me-2"></i>
                                        View Students
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/courses">
                                        <i className="fa-solid fa-book-open me-2"></i>
                                        View Courses
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    {/* Right-side buttons */}
                    <div className="d-flex gap-2">
                        <Link to="/add-student" className="btn btn-primary">
                            <i className="fa-solid fa-user-plus me-2"></i>
                            Student
                        </Link>

                        <Link to="/add-course" className="btn btn-outline-light">
                            <i className="fa-solid fa-circle-plus me-2"></i>
                            Course
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
