import { useState } from "react";
import { createJob } from "../../api/api";

export default function AddJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skills: "",
  });
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!form.title.trim() || !form.company.trim()) {
      setStatus({ type: "error", message: "Job title and company are required." });
      return;
    }

    setSubmitting(true);
    try {
      const job = await createJob({
        title: form.title.trim(),
        company: form.company.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        required_skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      setStatus({
        type: "success",
        message: `"${job.title}" at ${job.company} was added (job #${job.id}).`,
      });
      setForm({ title: "", company: "", location: "", description: "", skills: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.error ||
          `Could not reach the backend. Make sure the Campus-prep_E5 Flask server is running.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Add Job</h1>
      <p className="page-subtitle">
        Create a new job opening. This is saved directly to the backend and will
        appear immediately under students' Current Job Openings.
      </p>

      <form className="card" onSubmit={handleSubmit}>
        {status && (
          <div className={status.type === "error" ? "auth-error" : "auth-success"}>
            {status.message}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Frontend Developer Intern"
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="City, or Remote"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What the role involves"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Required Skills (comma-separated)</label>
          <input
            id="skills"
            name="skills"
            type="text"
            value={form.skills}
            onChange={handleChange}
            placeholder="Python, SQL, Git"
          />
        </div>

        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Adding..." : "Add Job"}
        </button>
      </form>
    </div>
  );
}
