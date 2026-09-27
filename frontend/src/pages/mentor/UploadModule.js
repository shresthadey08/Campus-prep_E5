import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createModule } from "../../api/api";

export default function UploadModule() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    skills: "",
    filePath: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!form.title.trim()) {
      setStatus({ type: "error", message: "Module title is required." });
      return;
    }

    setSubmitting(true);
    try {
      const module = await createModule({
        title: form.title.trim(),
        mentor_name: user?.name || "",
        skills_taught: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        file_path: form.filePath.trim(),
      });
      setStatus({ type: "success", message: `"${module.title}" was added (module #${module.id}).` });
      setForm({ title: "", skills: "", filePath: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.error ||
          "Could not reach the backend. Make sure the Campus-prep_E5 Flask server is running.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Upload Module</h1>
      <p className="page-subtitle">
        Add a new module or sample for students. It will be recommended automatically
        to any student whose CV is missing the skills it teaches.
      </p>

      <form className="card" onSubmit={handleSubmit}>
        {status && (
          <div className={status.type === "error" ? "auth-error" : "auth-success"}>
            {status.message}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">Module Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Git & Version Control Essentials"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills Taught (comma-separated)</label>
          <input
            id="skills"
            name="skills"
            type="text"
            value={form.skills}
            onChange={handleChange}
            placeholder="Git, GitHub"
          />
        </div>

        <div className="form-group">
          <label htmlFor="filePath">Material Link / Path (optional)</label>
          <input
            id="filePath"
            name="filePath"
            type="text"
            value={form.filePath}
            onChange={handleChange}
            placeholder="/uploads/modules/git-basics.pdf"
          />
        </div>

        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Uploading..." : "Upload Module"}
        </button>
      </form>
    </div>
  );
}
