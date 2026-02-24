import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";

function AddCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    code: "",
    duration: "",
    fee: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const preview = useMemo(() => {
    const code = form.code.trim().toUpperCase() || "—";
    const name = form.name.trim() || "Course name...";
    const duration = form.duration.trim() || "Duration...";
    const feeNum = Number(form.fee);
    const fee = Number.isFinite(feeNum) && form.fee !== "" ? feeNum.toLocaleString() : "Fee...";
    return { code, name, duration, fee };
  }, [form]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.code || !form.duration || !form.fee) {
      toast.error("Name, code, duration and fee are required");
      return;
    }

    const cleanedCode = form.code.trim().toUpperCase();

    // duplicate check (fetch all + compare cleaned)
    const all = await fetch(`${API_BASE}/courses`).then((r) => r.json());

    const exists = all.some(
      (c) => String(c.code ?? "").trim().toUpperCase() === cleanedCode
    );

    if (exists) {
      toast.error("That course code already exists.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      code: cleanedCode,
      duration: form.duration.trim(),
      fee: Number(form.fee),
    };

    fetch(`${API_BASE}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Create failed");
        return res.json();
      })
      .then(() => {
        toast.success("Course added!");
        navigate("/courses");
      })
      .catch(() => toast.error("Could not add course"));
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-dark text-light border-bottom">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h2 className="fw-bold mb-1">
                <i className="fa-solid fa-circle-plus text-primary me-2"></i>
                Add Course
              </h2>
              <div className="text-secondary">
                Create a new course with code, duration and fee.
              </div>
            </div>

            <div className="d-flex gap-2">
              <Link to="/courses" className="btn btn-primary">
                <i className="fa-solid fa-arrow-left me-2"></i>
                Back
              </Link>
              <Link to="/students" className="btn btn-outline-light">
                <i className="fa-solid fa-users me-2"></i>
                Students
              </Link>
            </div>
          </div>

          {/* Preview badges */}
          <div className="d-flex flex-wrap gap-2 mt-3">
            <span className="badge text-bg-light border text-dark py-2 px-3">
              <i className="fa-solid fa-hashtag text-primary me-2"></i>
              {preview.code}
            </span>
            <span className="badge text-bg-light border text-dark py-2 px-3">
              <i className="fa-solid fa-clock text-primary me-2"></i>
              {preview.duration}
            </span>
            <span className="badge text-bg-light border text-dark py-2 px-3">
              <i className="fa-solid fa-coins text-primary me-2"></i>
              {preview.fee}
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="container py-4">
        <div className="card shadow-sm">
          <div className="card-header bg-white fw-semibold">
            <i className="fa-solid fa-file-circle-plus text-primary me-2"></i>
            Course Form
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Course Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Django Rest Framework"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Code</label>
                <input
                  className="form-control"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="e.g. CS6"
                />
                <div className="form-text">Saved in UPPERCASE (e.g. CS6).</div>
              </div>

              <div className="col-md-3">
                <label className="form-label">Duration</label>
                <input
                  className="form-control"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 Months"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fee Kesh</label>
                <input
                  className="form-control"
                  type="number"
                  name="fee"
                  value={form.fee}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  min="0"
                />
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write a short description of what the course covers..."
                />
              </div>

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-primary" type="submit">
                  <i className="fa-solid fa-floppy-disk me-2"></i>
                  Save Course
                </button>

                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => navigate("/courses")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="card-footer bg-white text-muted small">
            Tip: Students enroll using the course <strong>code</strong> (e.g., {preview.code}).
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
