import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../../context/JobsContext";
import { useApplications } from "../../../context/ApplicationsContext";
import "../Student.css";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const { applyToJob, hasApplied } = useApplications();
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="empty-state">
        Job not found.{" "}
        <Link to="/student/jobs/openings">Back to Current Job Openings</Link>
      </div>
    );
  }

  const alreadyApplied = applied || hasApplied(job.id);

  const handleApply = async () => {
    setApplying(true);
    await applyToJob(job);
    setApplied(true);
    setApplying(false);
  };

  return (
    <div>
      <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="job-card-header">
          <div>
            <h1 className="page-title" style={{ marginBottom: 2 }}>
              {job.title}
            </h1>
            <p className="page-subtitle" style={{ marginBottom: 0 }}>
              {job.company} · {job.location}
            </p>
          </div>
          {alreadyApplied && <span className="badge">Applied</span>}
        </div>

        <hr className="divider" />

        <div className="cv-preview-section">
          <h3>Job Description</h3>
          <p className="job-desc">{job.description}</p>
        </div>

        <div className="cv-preview-section">
          <h3>Required Skills</h3>
          <div className="skills-list">
            {job.requiredSkills.map((skill) => (
              <span className="tag" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="cv-preview-section">
          <h3>Eligibility</h3>
          <p className="job-desc">{job.eligibility}</p>
        </div>

        <hr className="divider" />

        {alreadyApplied ? (
          <p className="page-subtitle" style={{ margin: 0 }}>
            You have already applied to this job. Check{" "}
            <Link to="/student/applications">Applications</Link> for its status.
          </p>
        ) : (
          <button className="btn" onClick={handleApply} disabled={applying}>
            {applying ? "Submitting..." : "Apply"}
          </button>
        )}
      </div>
    </div>
  );
}
