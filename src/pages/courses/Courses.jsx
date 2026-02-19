import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CourseRow from "../../components/CourseRow";
import { API_BASE } from "../../config";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [q, setQ] = useState("");

    useEffect(() => {
        fetch(`${API_BASE}/courses`)
            .then((r) => r.json())
            .then(setCourses)
            .catch(() => toast.error("Failed to load courses"));
    }, []);

    const filteredCourses = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return courses;
        return courses.filter((c) => {
            const name = String(c.name ?? "").toLowerCase();
            const code = String(c.code ?? "").toLowerCase();
            const duration = String(c.duration ?? "").toLowerCase();
            return name.includes(query) || code.includes(query) || duration.includes(query);
        });
    }, [courses, q]);

    const totalCourses = courses.length;
    const totalFees = useMemo(
        () => courses.reduce((sum, c) => sum + (Number(c.fee) || 0), 0),
        [courses]
    );

    function deleteCourse(id) {
        return fetch(`${API_BASE}/courses/${id}`, { method: "DELETE" }).then((res) => {
            if (!res.ok) throw new Error("Delete failed");
            setCourses((prev) => prev.filter((c) => c.id !== id));
        });
    }

    function handleDelete(course) {
        toast.custom(
            (t) => (
                <div className="card shadow-sm" style={{ maxWidth: 420 }}>
                    <div className="card-body">
                        <div className="fw-semibold mb-1">
                            <i className="fa-solid fa-triangle-exclamation text-danger me-2"></i>
                            Delete course?
                        </div>

                        <div className="text-muted small">
                            <strong>{course.code}</strong> — {course.name} will be removed.
                            <br />
                            Students using this code (<strong>{course.code}</strong>) may become “unassigned”.
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => toast.dismiss(t.id)}>
                                Cancel
                            </button>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                    toast.dismiss(t.id);
                                    toast.promise(deleteCourse(course.id), {
                                        loading: "Deleting...",
                                        success: "Course deleted",
                                        error: "Could not delete course",
                                    });
                                }}
                            >
                                Yes, delete
                            </button>
                        </div>
                    </div>
                </div>
            ),
            { duration: Infinity }
        );
    }

    return (
        <div>
            {/* Page header (dark like About/Home) */}
            <section className="bg-dark text-light border-bottom">
                <div className="container py-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <h2 className="fw-bold mb-1">
                                <i className="fa-solid fa-book-open text-primary me-2"></i>
                                Courses
                            </h2>
                            <div className="text-secondary">
                                View, update, and manage course records.
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <Link to="/add-course" className="btn btn-primary">
                                <i className="fa-solid fa-circle-plus me-2"></i>
                                Add Course
                            </Link>
                            <Link to="/students" className="btn btn-outline-light">
                                <i className="fa-solid fa-users me-2"></i>
                                Students
                            </Link>
                        </div>
                    </div>

                    {/* Summary badges */}
                    <div className="d-flex flex-wrap gap-2 mt-3">
                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-layer-group text-primary me-2"></i>
                            Total: <strong className="ms-1">{totalCourses}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-coins text-primary me-2"></i>
                            Total Fees: <strong className="ms-1">{totalFees.toLocaleString()}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-magnifying-glass text-primary me-2"></i>
                            Records: <strong className="ms-1">{filteredCourses.length}</strong>
                        </span>
                    </div>
                </div>
            </section>

            {/* Table card */}
            <div className="container py-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                        <div className="fw-semibold">
                            <i className="fa-solid fa-table me-2 text-primary"></i>
                            Course List
                        </div>

                        {/* Search */}
                        <div className="input-group" style={{ maxWidth: 360 }}>
                            <span className="input-group-text bg-light">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                className="form-control"
                                placeholder="Search by code, name, duration..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            {q && (
                                <button className="btn btn-outline-secondary" onClick={() => setQ("")} type="button">
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>SerialNo</th>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Duration</th>
                                        <th>Fee (Kesh)</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredCourses.map((course, i) => (
                                        <CourseRow key={course.id} course={course} i={i} onDelete={handleDelete} />
                                    ))}

                                    {filteredCourses.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">
                                                <i className="fa-regular fa-folder-open me-2"></i>
                                                No courses found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer hint */}
                    <div className="card-footer bg-white text-muted small d-flex flex-column flex-md-row justify-content-between gap-2">
                        <span>
                            Tip: Use the course <strong>code</strong> (e.g., CS6) when adding students.
                        </span>
                        <span>
                            <i className="fa-solid fa-circle-info me-2"></i>
                            You can edit or delete courses using the Action buttons.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
