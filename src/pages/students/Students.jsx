import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import StudentRow from "../../components/StudentRow";
import { API_BASE } from "../../config";


function Students() {
    const [students, setStudents] = useState([]);
    const [q, setQ] = useState("");

    useEffect(() => {
        fetch(`${API_BASE}/students`)
            .then((res) => res.json())
            .then(setStudents)
            .catch(() => toast.error("Failed to load students"));
    }, []);
    // Search functionality
    const filteredStudents = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return students;

        return students.filter((s) => {
            const name = String(s.name ?? "").toLowerCase();
            const email = String(s.email ?? "").toLowerCase();
            const regNo = String(s.regNo ?? "").toLowerCase();
            const course = String(s.courseCode ?? "").toLowerCase();
            const year = String(s.year ?? "").toLowerCase();
            return (
                name.includes(query) ||
                email.includes(query) ||
                regNo.includes(query) ||
                course.includes(query) ||
                year.includes(query)
            );
        });
    }, [students, q]);

    const totalStudents = students.length;
    const uniqueCourses = useMemo(() => {
        const set = new Set(students.map((s) => s.courseCode).filter(Boolean));
        return set.size;
    }, [students]);

    // Actual delete request (called after user confirms)
    function deleteStudent(id) {
        return fetch(`${API_BASE}/students/${id}`, { method: "DELETE" }).then((res) => {
            if (!res.ok) throw new Error("Delete failed");
            setStudents((prev) => prev.filter((s) => s.id !== id));
        });
    }

    // Toast confirmation UI
    function handleDelete(student) {
        toast.custom(
            (t) => (
                <div className="card shadow-sm" style={{ maxWidth: 380 }}>
                    <div className="card-body">
                        <div className="fw-semibold mb-1">
                            <i className="fa-solid fa-triangle-exclamation text-danger me-2"></i>
                            Delete student?
                        </div>

                        <div className="text-muted small">
                            <strong>{student.name}</strong> ({student.regNo}) will be removed. This can’t be undone.
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => toast.dismiss(t.id)}>
                                Cancel
                            </button>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                    toast.dismiss(t.id);
                                    toast.promise(deleteStudent(student.id), {
                                        loading: "Deleting...",
                                        success: "Student deleted",
                                        error: "Could not delete student",
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
            {/* Header */}
            <section className="bg-dark text-light border-bottom">
                <div className="container py-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <h2 className="fw-bold mb-1">
                                <i className="fa-solid fa-users text-primary me-2"></i>
                                Students
                            </h2>
                            <div className="text-secondary">
                                View, update, and manage student records.
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <Link to="/add-student" className="btn btn-primary">
                                <i className="fa-solid fa-user-plus me-2"></i>
                                Add Student
                            </Link>

                            <Link to="/courses" className="btn btn-outline-light">
                                <i className="fa-solid fa-book-open me-2"></i>
                                Courses
                            </Link>
                        </div>
                    </div>

                    {/* Summary badges */}
                    <div className="d-flex flex-wrap gap-2 mt-3">
                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-user-group text-primary me-2"></i>
                            Total: <strong className="ms-1">{totalStudents}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-book text-primary me-2"></i>
                            Courses Enrolled: <strong className="ms-1">{uniqueCourses}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-magnifying-glass text-primary me-2"></i>
                            Records: <strong className="ms-1">{filteredStudents.length}</strong>
                        </span>
                    </div>
                </div>
            </section>

            {/* Table */}
            <div className="container py-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                        <div className="fw-semibold">
                            <i className="fa-solid fa-table me-2 text-primary"></i>
                            Student List
                        </div>

                        {/* Search */}
                        <div className="input-group" style={{ maxWidth: 380 }}>
                            <span className="input-group-text bg-light">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                className="form-control"
                                placeholder="Search name, reg no, course code, year..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            {q && (
                                <button className="btn btn-outline-secondary" type="button" onClick={() => setQ("")}>
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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Reg No</th>
                                        <th>Year</th>
                                        <th>Course</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredStudents.map((student, i) => (
                                        <StudentRow
                                            key={student.id}
                                            student={student}
                                            i={i}
                                            onDelete={handleDelete}
                                        />
                                    ))}

                                    {filteredStudents.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4 text-muted">
                                                <i className="fa-regular fa-folder-open me-2"></i>
                                                No students found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card-footer bg-white text-muted small d-flex flex-column flex-md-row justify-content-between gap-2">
                        <span>
                            Tip: Make sure each student has a unique <strong>Reg No</strong>.
                        </span>
                        <span>
                            <i className="fa-solid fa-circle-info me-2"></i>
                            Use the Action buttons to view, edit, or delete.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Students;
