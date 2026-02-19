import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        regNo: "",
        year: "",
        courseCode: "",
    });

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
                setCourses(courseData);

                setForm({
                    name: studentData.name ?? "",
                    email: studentData.email ?? "",
                    regNo: studentData.regNo ?? "",
                    year: String(studentData.year ?? ""),
                    courseCode: studentData.courseCode ?? "",
                });
            })
            .catch(() => toast.error("Failed to load student"))
            .finally(() => setLoading(false));
    }, [id]);

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

        if (!form.name || !form.email || !form.regNo || !form.year || !form.courseCode) {
            toast.error("Please fill in all fields");
            return;
        }

        const cleanedReg = form.regNo.trim().toUpperCase();

        // get all students and compare locally (robust)
        const all = await fetch(`${API_BASE}/students`).then((r) => r.json());

        const takenByOther = all.some(
            (s) =>
                String(s.id) !== String(id) &&
                String(s.regNo ?? "").trim().toUpperCase() === cleanedReg
        );

        if (takenByOther) {
            toast.error("That registration number is already used by another student.");
            return;
        }

        const payload = {
            ...form,
            name: form.name.trim(),
            email: form.email.trim(),
            regNo: cleanedReg,
            courseCode: form.courseCode.trim().toUpperCase(),
            year: Number(form.year),
        };

        fetch(`${API_BASE}/students/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                toast.success("Student updated!");
                navigate(`/students/${id}`);
            })
            .catch(() => toast.error("Could not update student"));
    }

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

    return (
        <div>
            {/* Header */}
            <section className="bg-dark text-light border-bottom">
                <div className="container py-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <h2 className="fw-bold mb-1">
                                <i className="fa-solid fa-user-pen text-primary me-2"></i>
                                Edit Student
                            </h2>
                            <div className="text-secondary">Update student details and save changes.</div>
                        </div>

                        <div className="d-flex gap-2">
                            <Link to={`/students/${id}`} className="btn btn-outline-light">
                                <i className="fa-solid fa-eye me-2"></i>
                                View
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
                        <i className="fa-solid fa-file-pen text-primary me-2"></i>
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
                                    placeholder="Student full name"
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
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Registration No</label>
                                <input
                                    className="form-control"
                                    name="regNo"
                                    value={form.regNo}
                                    onChange={handleChange}
                                    placeholder="e.g. REG/2026/001"
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
                                    placeholder="e.g. 1"
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Course</label>
                                <select
                                    className="form-select"
                                    name="courseCode"
                                    value={form.courseCode}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Course...</option>
                                    {courses.map((c) => (
                                        <option key={c.id} value={c.code}>
                                            {c.code} - {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12 d-flex gap-2">
                                <button className="btn btn-primary" type="submit">
                                    <i className="fa-solid fa-floppy-disk me-2"></i>
                                    Save Changes
                                </button>

                                <button className="btn btn-outline-secondary" type="button" onClick={() => navigate(-1)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="card-footer bg-white text-muted small">
                        Tip: Ensure <strong>Reg No</strong> is unique and <strong>courseCode</strong> matches an existing course.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;
