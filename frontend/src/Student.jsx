import { useEffect, useState } from "react";
import { request } from "./helpers.jsx";

export default function Student({ token, onResult, initialResult = null }) {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleFile(f) {
        if (f) {
            setFile(f);
            setError("");
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    }

    async function submitCv(e) {
        e.preventDefault();
        if (!file) {
            setError("Please choose a CV file.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const data = await request(
                "/upload-cv",
                { method: "POST", body: formData },
                token
            );
            setResult(data);
            if (onResult) onResult(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    function resetForm() {
        setFile(null);
        setError("");
    }

    // ---------- Step 1: upload ----------
    if (!result) {
        return (
            <div className="page">
                <div className="ats-header">
                    <h2>Resume Analyzer</h2>
                    <p className="hint">
                        Upload your resume, compare it against a job description, and get
                        a CV match analysis with scores, missing skills, and learning
                        suggestions.
                    </p>
                </div>

                <form className="upload-form" onSubmit={submitCv}>
                    <div className="panel upload-panel">
                        <h3>Upload Resume</h3>

                        <label
                            className="dropzone"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept=".pdf,.docx"
                                className="dropzone-input"
                                onChange={(e) => handleFile(e.target.files[0])}
                            />
                            <span className="dropzone-icon">⬆</span>
                            <span className="dropzone-title">
                                Drag &amp; drop your resume here
                            </span>
                            <span className="hint">
                                PDF or DOCX · or click below to browse
                            </span>
                            <span className="btn-choose">Choose File</span>
                        </label>

                        {file && (
                            <div className="file-info">
                                <p><strong>Selected file:</strong> {file.name}</p>
                                <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                                <p>Type: {file.type || "unknown"}</p>
                            </div>
                        )}

                        <p className="hint">
                            Tip: If PDF extraction returns empty text, upload a DOCX
                            version of your resume instead.
                        </p>

                        <div className="ats-actions">
                            <button type="submit" disabled={loading}>
                                {loading ? "Checking..." : "Check"}
                            </button>
                            <button type="button" className="btn-secondary" onClick={resetForm}>
                                Reset
                            </button>
                        </div>

                        {loading && (
                            <div className="scanning">
                                <span className="spinner"></span>
                                <div>
                                    <strong>Scanning your document...</strong>
                                    <p className="hint">
                                        Please wait while we analyze formatting, keywords,
                                        readability, and ATS risks.
                                    </p>
                                </div>
                            </div>
                        )}

                        {error && <p className="message error">{error}</p>}
                    </div>
                </form>
            </div>
        );
    }

    // ---------- Step 2: results ----------
    const jobs = result.recommended_jobs || [];
    const skills = result.missing_skills || [];
    const modules = result.recommended_modules || [];

    const jobTitle = (j) => j.title || j.job_title || j.name || "";
    const jobCompany = (j) => j.company || j.company_name || "";
    const jobScore = (j) => Number(j.match ?? j.match_percentage ?? j.score ?? 0);

    const top = jobs.length
        ? jobs.reduce((a, b) => (jobScore(b) > jobScore(a) ? b : a))
        : null;

    return (
        <div className="page">
            <div className="ats-header results-header">
                <div>
                    <h2>Your CV analysis</h2>
                    <p className="hint">
                        {jobs.length} role{jobs.length === 1 ? "" : "s"} ranked by skill
                        overlap
                    </p>
                </div>
            </div>

            <div className="summary">
                <div className="panel">
                    <span className="label">Overall CV match</span>
                    <strong className="big">{result.overall_match}%</strong>
                </div>
                <div className="panel">
                    <span className="label">Recommended jobs</span>
                    <strong className="big">{jobs.length}</strong>
                </div>
                <div className="panel">
                    <span className="label">Top match</span>
                    <strong className="big">{top ? jobScore(top) + "%" : "-"}</strong>
                    {top && (
                        <span className="label">
                            {jobTitle(top)}
                            {jobCompany(top) && " · " + jobCompany(top)}
                        </span>
                    )}
                </div>
            </div>

            <section className="student-section role-ranking-section">
                <div className="section-heading">
                    <span className="section-number">01</span>
                    <h3>Role ranking</h3>
                </div>

                <div className="panel role-ranking-panel">
                    {jobs.length > 0 ? (
                        jobs.map((j, i) => (
                            <div className="job-row" key={i}>
                                <span className="job-index">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <div className="job-details">
                                    <strong className="job-name">
                                        {jobTitle(j)}
                                    </strong>
                                    <span className="label">
                                        {jobCompany(j)}
                                    </span>
                                </div>

                                <div className="bar">
                                    <div
                                        className="bar-fill"
                                        style={{ width: jobScore(j) + "%" }}
                                    />
                                </div>

                                <span className="job-score">
                                    {jobScore(j)}%
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="hint">No matching jobs found.</p>
                    )}
                </div>
            </section>

            <section className="student-section skills-section">
                <div className="section-heading">
                    <span className="section-number">02</span>
                    <h3>Skills to develop</h3>
                </div>

                <div className="panel skills-panel">
                    {skills.length > 0 ? (
                        <div className="skills-list">
                            {skills.map((s, i) => (
                                <span className="skill-item" key={i}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="hint">No missing skills found.</p>
                    )}
                </div>
            </section>

            <section className="student-section learning-section">
                <div className="section-heading">
                    <span className="section-number">03</span>
                    <h3>Recommended learning</h3>
                </div>

                <div className="panel learning-panel">
                    {modules.length > 0 ? (
                        <div className="learning-grid">
                            {modules.map((m, i) => (
                                <div className="learning-item" key={i}>
                                    <strong>
                                        {m.title || m.name}
                                    </strong>

                                    <span className="label">
                                        {[
                                            m.mentor || m.mentor_name,
                                            Array.isArray(m.skills_taught)
                                                ? m.skills_taught.join(", ")
                                                : Array.isArray(m.skills)
                                                    ? m.skills.join(", ")
                                                    : m.skills,
                                        ]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="hint">
                            No recommended learning modules found.
                        </p>
                    )}
                </div>
            </section>

            {error && <p className="message error">{error}</p>}
        </div>
    );
}
