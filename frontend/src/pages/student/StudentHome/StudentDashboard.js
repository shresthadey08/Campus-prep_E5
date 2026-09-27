import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCV } from "../../../context/CVContext";
import { useApplications } from "../../../context/ApplicationsContext";
import { useJobs } from "../../../context/JobsContext";
import { suggestedModules as mockModules } from "../../../api/mockData";
import "../Student.css";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { cvData, cvFile, matchResults } = useCV();
  const { applications } = useApplications();
  const { jobs } = useJobs();

  const hasCV = Boolean(cvFile) || Boolean(cvData?.personal?.fullName);
  const skillCount = cvData?.skills?.length || 0;
  const suggestedJobsCount = matchResults
    ? matchResults.recommended_jobs.filter((j) => j.match_percentage > 0).length
    : jobs.filter((job) =>
        job.requiredSkills.some((skill) => cvData?.skills?.includes(skill))
      ).length;
  const suggestedModulesCount = matchResults
    ? matchResults.recommended_modules.length
    : mockModules.length;

  return (
    <div>
      <h1 className="page-title">Welcome, {user.name.split(" ")[0]}</h1>
      <p className="page-subtitle">Here's a quick look at your Campus Prep activity.</p>

      <div className="grid grid-3">
        <div className="card stat-card">
          <div className="stat-label">CV Status</div>
          <div className="stat-value">{hasCV ? "Prepared" : "Not started"}</div>
          <Link to="/student/cv/preview" className="stat-link">
            View CV
          </Link>
        </div>

        <div className="card stat-card">
          <div className="stat-label">Applications</div>
          <div className="stat-value">{applications.length}</div>
          <Link to="/student/applications" className="stat-link">
            View applications
          </Link>
        </div>

        <div className="card stat-card">
          <div className="stat-label">Suggested Jobs</div>
          <div className="stat-value">{suggestedJobsCount}</div>
          <Link to="/student/jobs/suggested" className="stat-link">
            View suggestions
          </Link>
        </div>

        <div className="card stat-card">
          <div className="stat-label">Suggested Modules</div>
          <div className="stat-value">{suggestedModulesCount}</div>
          <Link to="/student/modules" className="stat-link">
            View modules
          </Link>
        </div>

        <div className="card stat-card">
          <div className="stat-label">Skills Listed</div>
          <div className="stat-value">{skillCount}</div>
          <Link to="/student/cv/edit" className="stat-link">
            Edit CV
          </Link>
        </div>
      </div>
    </div>
  );
}
