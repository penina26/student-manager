import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE } from "../../config"; // if file is src/pages/students/EditStudent.jsx

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        regNo: "",
        year: "",
        courseCode: "",
    });
    const [loading, setLoading] = useState(true);

    // Load student + courses (for dropdown)
    useEffect(() => {
        setLoading(true);

        Promise.all([
            fetch(`${API_BASE}/students/${id}`).then((r) => {
                if (!r.ok) throw new Error("Student not found");
                return r.json();
            }),
            fetch(`${API_BASE}/courses`).then((r) => {
                if (!r.ok) throw new Error("Courses not found");
                return r.json();
            }),
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
            .catch(() => toast.error("Failed to load student data"))
            .finally(() => setLoading(false));
    }, [id]);

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Submit updated student
    async function handleSubmit(e) {
        e.preventDefault();

        // Basic validation
        if (!form.name || !form.email || !form.regNo || !form.year || !form.courseCode) {
            toast.error("Please fill in all fields");
            return;
        }

        const cleanedReg = form.regNo.trim().toUpperCase();

        try {
            // Duplicate check (exclude current student)
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

            const res = await fetch(`${API_BASE}/students/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Update failed");

            toast.success("Student updated!");
            navigate(`/students/${id}`);
        } catch (err) {
            toast.error("Could not update student");
        }
    }

    if (loading) return <p className="container py-4">Loading...</p>;

    return (
        <div className="container py-4">
            <div className="card shadow-sm">
                <div className="card-header text-center">
                    <h4 className="mb-0">Edit Student</h4>
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
                                Save Changes
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;
