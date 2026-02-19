import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";


function AddStudent() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        regNo: "",
        year: "",
        courseCode: "",
    });

    // Load courses for dropdown
    useEffect(() => {
        setLoadingCourses(true);

        fetch(`${API_BASE}/courses`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load courses");
                return res.json();
            })
            .then(setCourses)
            .catch(() => toast.error("Failed to load courses"))
            .finally(() => setLoadingCourses(false));
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const preview = useMemo(() => {
        const reg = form.regNo.trim() || "—";
        const course = form.courseCode.trim().toUpperCase() || "—";
        const year = form.year ? String(form.year) : "—";
        return { reg, course, year };
    }, [form.regNo, form.courseCode, form.year]);

    async function handleSubmit(e) {
        e.preventDefault();

        const { name, email, regNo, year, courseCode } = form;

        if (!name || !email || !regNo || !year || !courseCode) {
            toast.error("Please fill in all fields");
            return;
        }
        const cleanedReg = form.regNo.trim().toUpperCase();

        // duplicate check
        const all = await fetch(`${API_BASE}/students`).then((r) => r.json());

        const exists = all.some(
            (s) => String(s.regNo ?? "").trim().toUpperCase() === cleanedReg
        );

        if (exists) {
            toast.error("That registration number already exists.");
            return;
        }

        const payload = {
            name: name.trim(),
            email: email.trim(),
            regNo: regNo.trim(),
            year: Number(year),
            courseCode: courseCode.trim().toUpperCase(),
        };

        fetch(`${API_BASE}/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to add student");
                return res.json();
            })
            .then(() => {
                toast.success("Student added!");
                navigate("/students");
            })
            .catch(() => toast.error("Could not add student"));
    }

    return (
        <div>
            {/* Header */}
            <section className="bg-dark text-light border-bottom">
                <div className="container py-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <h2 className="fw-bold mb-1">
                                <i className="fa-solid fa-user-plus text-primary me-2"></i>
                                Add Student
                            </h2>
                            <div className="text-secondary">
                                Register a new student and assign them using a course code.
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <Link to="/students" className="btn btn-primary">
                                <i className="fa-solid fa-arrow-left me-2"></i>
                                Back
                            </Link>
                            <Link to="/courses" className="btn btn-outline-light">
                                <i className="fa-solid fa-book-open me-2"></i>
                                Courses
                            </Link>
                        </div>
                    </div>

                    {/* Preview badges */}
                    <div className="d-flex flex-wrap gap-2 mt-3">
                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-id-card text-primary me-2"></i>
                            Reg: <strong className="ms-1">{preview.reg}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-graduation-cap text-primary me-2"></i>
                            Course: <strong className="ms-1">{preview.course}</strong>
                        </span>

                        <span className="badge text-bg-light border text-dark py-2 px-3">
                            <i className="fa-solid fa-calendar-days text-primary me-2"></i>
                            Year: <strong className="ms-1">{preview.year}</strong>
                        </span>
                    </div>
                </div>
            </section>

            {/* Form */}
            <div className="container py-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-white fw-semibold">
                        <i className="fa-solid fa-file-circle-plus text-primary me-2"></i>
                        Student Form
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Name</label>
                                <input
                                    className="form-control"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Amina Ali"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="e.g. amina@email.com"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Registration No</label>
                                <input
                                    className="form-control"
                                    name="regNo"
                                    value={form.regNo}
                                    onChange={handleChange}
                                    placeholder="e.g. DS/001/2026"
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Year</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="year"
                                    value={form.year}
                                    onChange={handleChange}
                                    min="1"
                                    placeholder="e.g. 2022"
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Course</label>
                                <select
                                    className="form-select"
                                    name="courseCode"
                                    value={form.courseCode}
                                    onChange={handleChange}
                                    disabled={loadingCourses}
                                >
                                    <option value="">
                                        {loadingCourses ? "Loading courses..." : "Select Course..."}
                                    </option>

                                    {courses.map((course) => (
                                        <option key={course.id} value={course.code}>
                                            {course.code} - {course.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="form-text">
                                    Students are linked by <strong>courseCode</strong> (e.g., CS6).
                                </div>
                            </div>

                            <div className="col-12 d-flex gap-2">
                                <button className="btn btn-primary" type="submit">
                                    <i className="fa-solid fa-floppy-disk me-2"></i>
                                    Save Student
                                </button>

                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => navigate("/students")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="card-footer bg-white text-muted small">
                        Tip: Make sure <strong>regNo</strong> is unique and <strong>courseCode</strong> exists in Courses.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
