import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            {/* Hero (dark like About) */}
            <section className="bg-dark text-light border-bottom">
                <div className="container py-5">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-8">
                            <h1 className="fw-bold mb-2">
                                <i className="fa-solid fa-graduation-cap me-2 text-primary"></i>
                                Student Course Management System <span className="text-primary">(SCMS)</span>
                            </h1>

                            <p className="text-secondary mb-4">
                                Manage students, courses, and registrations efficiently — reduce manual paperwork,
                                avoid duplicate records, and keep information consistent and easy to access.
                            </p>

                            <div className="d-flex flex-wrap gap-2">
                                <Link to="/students" className="btn btn-primary">
                                    <i className="fa-solid fa-users me-2"></i>
                                    Students
                                </Link>

                                <Link to="/courses" className="btn btn-outline-light">
                                    <i className="fa-solid fa-book-open me-2"></i>
                                    Courses
                                </Link>

                                <Link to="/about" className="btn btn-outline-secondary">
                                    <i className="fa-solid fa-circle-info me-2"></i>
                                    About SCMS
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="d-flex gap-3 justify-content-lg-end">
                                <div className="text-center px-3 py-2 rounded-3 bg-black bg-opacity-25 border">
                                    <div className="fw-bold">
                                        <i className="fa-solid fa-database me-2"></i>Records
                                    </div>
                                    <div className="small text-secondary">Students & Courses</div>
                                </div>
                                <div className="text-center px-3 py-2 rounded-3 bg-black bg-opacity-25 border">
                                    <div className="fw-bold">
                                        <i className="fa-solid fa-bolt me-2"></i>Fast
                                    </div>
                                    <div className="small text-secondary">Search & Updates</div>
                                </div>
                            </div>

                            <div className="mt-3 p-3 rounded-3 bg-black bg-opacity-25 border">
                                <div className="d-flex align-items-start gap-3">
                                    <i className="fa-solid fa-shield-halved fa-2x text-primary"></i>
                                    <div>
                                        <div className="fw-semibold">Consistent Data</div>
                                        <div className="small text-secondary">
                                            Reduce duplicates and keep student-course information accurate.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="container py-4">
                {/* Highlights (same card style) */}
                <div className="row g-3">
                    <div className="col-md-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-solid fa-database text-primary"></i>
                                    <h6 className="mb-0 fw-semibold">Maintain Records</h6>
                                </div>
                                <p className="text-muted mb-0">
                                    Store and manage student records with fewer errors and duplicates.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-solid fa-book text-primary"></i>
                                    <h6 className="mb-0 fw-semibold">Manage Courses</h6>
                                </div>
                                <p className="text-muted mb-0">
                                    Create, update, view course details like code, fee, and duration.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-solid fa-clipboard-check text-primary"></i>
                                    <h6 className="mb-0 fw-semibold">Enrollment Support</h6>
                                </div>
                                <p className="text-muted mb-0">
                                    Track student enrollments using course codes for easy linking.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-solid fa-file-circle-xmark text-primary"></i>
                                    <h6 className="mb-0 fw-semibold">Reduce Paperwork</h6>
                                </div>
                                <p className="text-muted mb-0">
                                    Move from manual processing to a clean digital workflow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick actions + Goals */}
                <div className="row g-3 mt-3">
                    <div className="col-lg-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="fw-bold mb-2">
                                    <i className="fa-solid fa-user-plus me-2 text-primary"></i>
                                    Quick Actions
                                </h5>
                                <p className="text-muted">
                                    Register new students and courses, then manage them with CRUD operations.
                                </p>

                                <div className="d-flex flex-wrap gap-2">
                                    <Link to="/add-student" className="btn btn-primary">
                                        <i className="fa-solid fa-user-plus me-2"></i>
                                        Add Student
                                    </Link>

                                    <Link to="/add-course" className="btn btn-outline-primary">
                                        <i className="fa-solid fa-circle-plus me-2"></i>
                                        Add Course
                                    </Link>

                                    <Link to="/students" className="btn btn-outline-secondary">
                                        <i className="fa-solid fa-list me-2"></i>
                                        View Students
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="fw-bold mb-2">
                                    <i className="fa-solid fa-bullseye me-2 text-primary"></i>
                                    Project Goals
                                </h5>

                                <ul className="list-unstyled text-muted mb-0">
                                    <li className="mb-2">
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Maintain student records and course details
                                    </li>
                                    <li className="mb-2">
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Handle registrations and updates efficiently
                                    </li>
                                    <li className="mb-2">
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Reduce errors, duplicates, and inconsistencies
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Prepare for deployment and future API integration
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Small “next steps” bar */}
                <div className="card shadow-sm mt-3">
                    <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                        <div>
                            <div className="fw-bold">
                                <i className="fa-solid fa-rocket text-primary me-2"></i>
                                Ready to start?
                            </div>
                            <div className="text-muted small">
                                Add your first course, then enroll students using the course code (e.g. CS6).
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <Link to="/add-course" className="btn btn-sm btn-primary">
                                + Add Course
                            </Link>
                            <Link to="/add-student" className="btn btn-sm btn-outline-primary">
                                + Add Student
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
