import { useState } from "react";
import { request, jsonOptions, skillList } from "./helpers.jsx";

export default function MentorUploadModule({ token }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleFile(f) {
    if (f) setFile(f);
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  function resetForm() {
    setFile(null);
    setTitle("");
    setMentorName("");
    setSkills("");
    setError("");
    setMessage("");
  }

  async function submitModule(e) {
    e.preventDefault();
    if (!title.trim()) return setError("Please enter a module title.");
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const data = await request(
        "/modules",
        jsonOptions("POST", {
          title,
          mentor_name: mentorName,
          skills_taught: skillList(skills),
          file_path: file ? file.name : "",
        }),
        token
      );
      setMessage(`"${data.title}" uploaded successfully.`);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="page">
      <div className="ats-header">
        <h2>Upload Module</h2>
        <p className="hint">
          Add a learning module and the skills it teaches, so it can be
          recommended to students missing those skills.
        </p>
      </div>

      <form className="ats-grid" onSubmit={submitModule}>
        <div className="panel upload-panel">
          <h3>Module File (optional)</h3>

          <label
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,.docx,.pptx"
              className="dropzone-input"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <span className="dropzone-icon">⬆</span>
            <span className="dropzone-title">Drag &amp; drop the module file here</span>
            <span className="hint">PDF, DOCX, or PPTX · or click below to browse</span>
            <span className="btn-choose">Choose File</span>
          </label>

          {file && (
            <div className="file-info">
              <p><strong>Selected file:</strong> {file.name}</p>
              <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
            </div>
          )}

          <p className="hint">
            Note: only the file name is saved right now — the file itself
            isn't uploaded to the server until a module file-upload route
            exists on the backend.
          </p>

          <div className="field">
            <label>Module title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="field">
            <label>Mentor name</label>
            <input value={mentorName} onChange={(e) => setMentorName(e.target.value)} />
          </div>

          <div className="field">
            <label>Skills taught (comma separated)</label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="python, sql"
            />
          </div>

          <div className="ats-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Reset
            </button>
          </div>

          {message && <p className="message">{message}</p>}
          {error && <p className="message error">{error}</p>}
        </div>

        <div className="panel get-panel">
          <h3>Tips</h3>
          <ul className="get-list">
            <li>Use clear, specific skill names (e.g. "flask", "rest api")</li>
            <li>Match the wording used in job listings</li>
            <li>Students missing these skills will see this module suggested</li>
          </ul>
        </div>
      </form>
    </div>
  );
}