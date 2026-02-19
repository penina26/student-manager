import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/courses/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then(setCourse)
            .catch(() => toast.error("Failed to load course"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="container py-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x text-primary mb-3"></i>
                        <div className="fw-semibold">Loading course...</div>
                        <div className="text-muted small">Please wait a moment</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="container py-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center py-5">
                        <i className="fa-regular fa-circle-xmark fa-2x text-danger mb-3"></i>
                        <div className="fw-semibold">Course not found</div>
                        <div className="text-muted small mb-3">
                            The course may have been deleted or the link is invalid.
                        </div>
                        <Link to="/courses" className="btn btn-outline-primary">
                            <i className="fa-solid fa-arrow-left me-2"></i>
                            Back to Courses
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <section className="bg-dark text-light border-bottom">
                <div className="container py-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <h2 className="fw-bold mb-1">
                                <i className="fa-solid fa-book-open text-primary me-2"></i>
                                Course Detail
                            </h2>
                            <div className="text-secondary">
                                <span className="me-2">
                                    <i className="fa-solid fa-hashtag me-1"></i>
                                    {course.code}
                                </span>
                                <span className="text-secondary">— {course.name}</span>
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <Link to={`/courses/${course.id}/edit`} className="btn btn-outline-light">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                Edit
                            </Link>
                            <Link to="/courses" className="btn btn-primary">
                                <i className="fa-solid fa-arrow-left me-2"></i>
                                Back
                            </Link>
                        </div>
                    </div>

                    {/* Small badges */}
                    <div className="d-flex flex-wrap gap-2 mt-3">
                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-clock text-primary me-2"></i>
                            Duration: <strong className="ms-1">{course.duration}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-coins text-primary me-2"></i>
                            Fee: <strong className="ms-1">{Number(course.fee).toLocaleString()}</strong>
                        </span>
                    </div>
                </div>
            </section>

            {/* Body */}
            <div className="container py-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-white fw-semibold">
                        <i className="fa-solid fa-circle-info text-primary me-2"></i>
                        Course Information
                    </div>

                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="p-3 border rounded-3 bg-light h-100">
                                    <div className="text-muted small mb-1">Course Code</div>
                                    <div className="fw-bold">{course.code}</div>

                                    <hr />

                                    <div className="text-muted small mb-1">Course Name</div>
                                    <div className="fw-semibold">{course.name}</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="p-3 border rounded-3 bg-light h-100">
                                    <div className="text-muted small mb-1">Duration</div>
                                    <div className="fw-semibold">{course.duration}</div>

                                    <hr />

                                    <div className="text-muted small mb-1">Fee</div>
                                    <div className="fw-semibold">{Number(course.fee).toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="p-3 border rounded-3">
                                    <div className="text-muted small mb-1">Description</div>
                                    <div>{course.description || <span className="text-muted">No description provided.</span>}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer bg-white text-muted small">
                        Tip: Students enroll using the course <strong>code</strong> (e.g., {course.code}).
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
