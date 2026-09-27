import { Link } from "react-router-dom";
import { useJobs } from "../../../context/JobsContext";
import { useApplications } from "../../../context/ApplicationsContext";

export default function CurrentOpenings() {
  const { jobs, loading } = useJobs();
  const { hasApplied } = useApplications();

  if (loading) {
    return <p className="page-subtitle">Loading job openings...</p>;
  }

  return (
    <div className="grid grid-2">
      {jobs.map((job) => (
        <div className="card job-card" key={job.id}>
          <div className="job-card-header">
            <div>
              <h3 className="job-title">{job.title}</h3>
              <p className="job-meta">
                {job.company} · {job.location}
              </p>
            </div>
            {hasApplied(job.id) && <span className="badge">Applied</span>}
          </div>
          <p className="job-desc">{job.description}</p>
          <div className="job-card-footer">
            <span className="match-percent">{job.requiredSkills.length} skills required</span>
            <Link to={`/student/jobs/${job.id}`} className="btn btn-outline btn-sm">
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
