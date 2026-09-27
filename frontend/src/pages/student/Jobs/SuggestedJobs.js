import { Link } from "react-router-dom";
import { useCV } from "../../../context/CVContext";
import { useJobs } from "../../../context/JobsContext";

export default function SuggestedJobs() {
  const { cvData, matchResults } = useCV();
  const { jobs } = useJobs();
  const studentSkills = cvData.skills || [];

  // Prefer the backend's real CV-to-job matching (from /upload-cv) when
  // available; otherwise fall back to a simple client-side comparison
  // against the manually-entered skills list, same as the original
  // local-only behaviour.
  const suggestions = matchResults
    ? matchResults.recommended_jobs
        .filter((job) => job.match_percentage > 0)
        .map((job) => ({
          id: String(job.job_id),
          title: job.title,
          company: job.company,
          location: job.location,
          description: "",
          matched: job.matched_skills,
          matchPercent: job.match_percentage,
        }))
    : jobs
        .map((job) => {
          const matched = job.requiredSkills.filter((s) => studentSkills.includes(s));
          const matchPercent = Math.round((matched.length / job.requiredSkills.length) * 100);
          return { ...job, matched, matchPercent };
        })
        .filter((job) => job.matched.length > 0)
        .sort((a, b) => b.matchPercent - a.matchPercent);

  if (!matchResults && studentSkills.length === 0) {
    return (
      <div className="empty-state">
        Add your skills under <Link to="/student/cv/edit">Edit CV</Link>, or{" "}
        <Link to="/student/cv/upload">upload your CV</Link>, to see jobs suggested for
        your profile.
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="empty-state">
        No suggested jobs match your current skills yet. Check{" "}
        <Link to="/student/jobs/missing-skills">Missing Skills</Link> for ideas.
      </div>
    );
  }

  return (
    <div className="grid grid-2">
      {suggestions.map((job) => (
        <div className="card job-card" key={job.id}>
          <div className="job-card-header">
            <div>
              <h3 className="job-title">{job.title}</h3>
              <p className="job-meta">
                {job.company} · {job.location}
              </p>
            </div>
            <span className="badge">{job.matchPercent}% match</span>
          </div>
          {job.description && <p className="job-desc">{job.description}</p>}
          <div className="job-card-footer">
            <span className="match-percent">
              Matches: {job.matched.join(", ") || "—"}
            </span>
            <Link to={`/student/jobs/${job.id}`} className="btn btn-outline btn-sm">
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
