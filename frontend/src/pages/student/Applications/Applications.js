import { Link } from "react-router-dom";
import { useApplications } from "../../../context/ApplicationsContext";
import "../Student.css";

export default function Applications() {
  const { applications } = useApplications();

  return (
    <div>
      <h1 className="page-title">Applications</h1>
      <p className="page-subtitle">Jobs you have applied to and their current status.</p>

      {applications.length === 0 ? (
        <div className="empty-state">
          You haven't applied to any jobs yet. Browse{" "}
          <Link to="/student/jobs/openings">Current Job Openings</Link> to get started.
        </div>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <table className="applications-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Application Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.company}</td>
                  <td>{app.jobTitle}</td>
                  <td>{app.appliedDate}</td>
                  <td>
                    <span className="badge">{app.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
