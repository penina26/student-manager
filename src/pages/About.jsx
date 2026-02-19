import React from "react";

function About() {
    const authors = [
        "Penina Wanyama",
        "Samuel Wanjau",
        "Sharon Ouko",
        "Sylvana Wanjiru",
        "Robert Mmasi",
    ];

    return (
        <div>
            {/* Hero */}
            <section className="bg-dark text-light border-bottom">
                <div className="container py-5">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-8">
                            <h1 className="fw-bold mb-2">
                                <i className="fa-solid fa-graduation-cap me-2 text-primary"></i>
                                Student Course Management System (SCMS)
                            </h1>
                            <p className="text-secondary mb-0">
                                A platform designed to manage student information, course details, enrollments, and
                                academic records efficiently; reducing manual paperwork and improving data consistency.
                            </p>
                        </div>

                        <div className="col-lg-4">
                            <div className="d-flex gap-3 justify-content-lg-end">
                                <div className="text-center px-3 py-2 rounded-3 bg-black bg-opacity-25 border">
                                    <div className="fw-bold">Students</div>
                                    <div className="small text-secondary">Records & Enrollment</div>
                                </div>
                                <div className="text-center px-3 py-2 rounded-3 bg-black bg-opacity-25 border">
                                    <div className="fw-bold">Courses</div>
                                    <div className="small text-secondary">Details & Updates</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main content */}
            <div className="container py-4">
                {/* Intro */}
                <div className="row g-3">
                    <div className="col-lg-8">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="fw-bold mb-2">
                                    <i className="fa-solid fa-circle-info text-primary me-2"></i>
                                    Introduction
                                </h5>
                                <p className="text-muted mb-0">
                                    A Student Course Management System (SCMS) is a software application designed to
                                    manage student information, course details, enrollments, and academic records efficiently.
                                    It helps administrators manage students and courses; students can view enrolled courses
                                    and academic information.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">
                                    <i className="fa-solid fa-star text-warning me-2"></i>
                                    Key Benefits
                                </h6>

                                <div className="d-flex align-items-start gap-2 mb-2">
                                    <i className="fa-solid fa-check text-success mt-1"></i>
                                    <div>
                                        <div className="fw-semibold">Reliable records</div>
                                        <div className="small text-muted">Less loss, fewer duplicates</div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start gap-2 mb-2">
                                    <i className="fa-solid fa-check text-success mt-1"></i>
                                    <div>
                                        <div className="fw-semibold">Fast access</div>
                                        <div className="small text-muted">Quick view and updates</div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start gap-2">
                                    <i className="fa-solid fa-check text-success mt-1"></i>
                                    <div>
                                        <div className="fw-semibold">Less paperwork</div>
                                        <div className="small text-muted">Digital-first workflow</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Problem + Solution */}
                <div className="row g-3 mt-1">
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100 border-start border-4 border-danger">
                            <div className="card-body">
                                <h5 className="fw-bold mb-2">
                                    <i className="fa-solid fa-triangle-exclamation text-danger me-2"></i>
                                    Problem Statement
                                </h5>
                                <p className="text-muted mb-0">
                                    Most academic institutions struggle with keeping student and course data due to manual
                                    processing. This can lead to information loss, duplication, and inconsistencies.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm h-100 border-start border-4 border-success">
                            <div className="card-body">
                                <h5 className="fw-bold mb-2">
                                    <i className="fa-solid fa-lightbulb text-success me-2"></i>
                                    Solution Statement
                                </h5>
                                <p className="text-muted mb-0">
                                    SCMS provides an organized platform for managing student and course registrations,
                                    enabling easy access to consistent and complete information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Objectives + Scope */}
                <div className="row g-3 mt-1">
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">
                                    <i className="fa-solid fa-bullseye text-primary me-2"></i>
                                    Objectives
                                </h5>

                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-solid fa-database text-primary"></i>
                                    <span className="text-muted">Maintain student records</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-solid fa-book-open text-primary"></i>
                                    <span className="text-muted">Manage course details</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-solid fa-clipboard-check text-primary"></i>
                                    <span className="text-muted">Handle course enrollment</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-file-circle-xmark text-primary"></i>
                                    <span className="text-muted">Reduce manual paperwork</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">
                                    <i className="fa-solid fa-diagram-project text-primary me-2"></i>
                                    Scope
                                </h5>

                                <ul className="list-unstyled text-muted mb-0">
                                    <li className="mb-2">
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Create student & course registration forms
                                    </li>
                                    <li className="mb-2">
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Read courses and students information
                                    </li>
                                    <li className="mb-2">
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Update course and student information
                                    </li>
                                    <li className="mb-2">
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Delete student or course information
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-check text-success me-2"></i>
                                        Deploy to a web hosting service
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technologies + Future */}
                <div className="row g-3 mt-1">
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">
                                    <i className="fa-solid fa-gears text-primary me-2"></i>
                                    Technologies Used
                                </h5>

                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge text-bg-dark">
                                        <i className="fa-brands fa-react me-1"></i> React
                                    </span>
                                    <span className="badge text-bg-primary">
                                        <i className="fa-brands fa-bootstrap me-1"></i> Bootstrap
                                    </span>
                                    <span className="badge text-bg-secondary">
                                        <i className="fa-solid fa-database me-1"></i> JSON Server
                                    </span>
                                    <span className="badge text-bg-light border text-dark">
                                        <i className="fa-solid fa-palette me-1"></i> CSS
                                    </span>
                                </div>

                                <p className="text-muted mt-3 mb-0">
                                    The system uses React for the UI, Bootstrap/CSS for styling, and JSON Server as a mock
                                    backend for development.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">
                                    <i className="fa-solid fa-forward text-primary me-2"></i>
                                    Future Plans
                                </h5>

                                <div className="d-flex align-items-start gap-2 mb-2">
                                    <i className="fa-solid fa-circle-right text-primary mt-1"></i>
                                    <span className="text-muted">Add a commercial database</span>
                                </div>
                                <div className="d-flex align-items-start gap-2 mb-2">
                                    <i className="fa-solid fa-circle-right text-primary mt-1"></i>
                                    <span className="text-muted">Add a proper API backend</span>
                                </div>
                                <div className="d-flex align-items-start gap-2">
                                    <i className="fa-solid fa-circle-right text-primary mt-1"></i>
                                    <span className="text-muted">Track student performance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Authors */}
                <div className="card shadow-sm mt-3">
                    <div className="card-body">
                        <h5 className="fw-bold mb-3">
                            <i className="fa-solid fa-people-group text-primary me-2"></i>
                            Authors
                        </h5>

                        <div className="d-flex flex-wrap gap-4">
                            {authors.map((a) => (
                                <span key={a} className="badge text-bg-light border text-dark py-2 px-3">
                                    <i className="fa-solid fa-user me-2 text-primary"></i>
                                    {a}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
