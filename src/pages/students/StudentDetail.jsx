import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE } from "../../config";

function StudentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // build a quick lookup: code -> course object
    const courseByCode = useMemo(() => {
        const map = new Map();
        courses.forEach((c) => map.set(c.code, c));
        return map;
    }, [courses]);

    useEffect(() => {
        setLoading(true);

        Promise.all([
            fetch(`${API_BASE}/students/${id}`).then((r) => {
                if (!r.ok) throw new Error("Student not found");
                return r.json();
            }),
            fetch(`${API_BASE}/courses`).then((r) => r.json()),
        ])
            .then(([studentData, courseData]) => {
                setStudent(studentData);
                setCourses(courseData);
            })
            .catch(() => toast.error("Failed to load student"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="container py-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center py-5">
                        <i className="fa-solid fa-spinner fa-spin fa-2x text-primary mb-3"></i>
                        <div className="fw-semibold">Loading student...</div>
                        <div className="text-muted small">Please wait a moment</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning d-flex justify-content-between align-items-center">
                    <div>
                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                        Student not found.
                    </div>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => navigate("/students")}>
                        Back to Students
                    </button>
                </div>
            </div>
        );
    }

    const course = courseByCode.get(student.courseCode);
    const courseLabel = course ? `${course.code} - ${course.name}` : (student.courseCode || "—");

    const regPreview = student.regNo?.trim() || "—";
    const yearPreview = student.year ?? "—";
    const coursePreview = (student.courseCode || "—").toString().toUpperCase();

    return (
        <div>
            {/* Header */}
            <section className="bg-dark text-light border-bottom">
                <div className="container py-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <h2 className="fw-bold mb-1">
                                <i className="fa-solid fa-user text-primary me-2"></i>
                                Student Detail
                            </h2>
                            <div className="text-secondary">View student information and course details.</div>
                        </div>

                        <div className="d-flex gap-2">
                            <Link to={`/students/${student.id}/edit`} className="btn btn-outline-light">
                                <i className="fa-solid fa-user-pen me-2"></i>
                                Edit
                            </Link>
                            <Link to="/students" className="btn btn-primary">
                                <i className="fa-solid fa-arrow-left me-2"></i>
                                Back
                            </Link>
                        </div>
                    </div>

                    {/* Preview badges */}
                    <div className="d-flex flex-wrap gap-2 mt-3">
                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-id-card text-primary me-2"></i>
                            Reg: <strong className="ms-1">{regPreview}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-graduation-cap text-primary me-2"></i>
                            Course: <strong className="ms-1">{coursePreview}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-calendar-days text-primary me-2"></i>
                            Year: <strong className="ms-1">{yearPreview}</strong>
                        </span>
                    </div>
                </div>
            </section>

            {/* Details */}
            <div className="container py-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-white fw-semibold">
                        <i className="fa-solid fa-circle-info text-primary me-2"></i>
                        Student Information
                    </div>

                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="text-muted small">Name</div>
                                <div className="fw-semibold">{student.name || "—"}</div>
                            </div>

                            <div className="col-md-6">
                                <div className="text-muted small">Email</div>
                                <div className="fw-semibold">{student.email || "—"}</div>
                            </div>

                            <div className="col-md-6">
                                <div className="text-muted small">Registration No</div>
                                <div className="fw-semibold">{student.regNo || "—"}</div>
                            </div>

                            <div className="col-md-3">
                                <div className="text-muted small">Year</div>
                                <div className="fw-semibold">{student.year ?? "—"}</div>
                            </div>

                            <div className="col-md-3">
                                <div className="text-muted small">Course</div>
                                <div className="fw-semibold">{courseLabel}</div>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer bg-white text-muted small">
                        Tip: If the course name is missing, confirm the student’s <strong>courseCode</strong> matches a course <strong>code</strong>.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetail;
