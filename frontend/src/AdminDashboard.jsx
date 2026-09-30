import { useEffect, useState } from "react";
import { request } from "./helpers.jsx";

export default function AdminDashboard({ token }) {
  const [jobCount, setJobCount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/jobs", {}, token)
      .then((jobs) => setJobCount(Array.isArray(jobs) ? jobs.length : 0))
      .catch((err) => setError(err.message));
  }, [token]);

  return (
    <div className="page">
      <div className="panel dashboard-intro">
        <h2>Admin Dashboard</h2>
        <p className="hint">An overview of CV activity and job openings across companies.</p>
      </div>

      <div className="summary">
        <div className="panel">
          <span className="label">CVs submitted</span>
          <strong className="big">—</strong>
        </div>
        <div className="panel">
          <span className="label">Open positions</span>
          <strong className="big">{jobCount !== null ? jobCount : "—"}</strong>
        </div>
        <div className="panel">
          <span className="label">Closed positions</span>
          <strong className="big">—</strong>
        </div>
      </div>

      <p className="hint">
        CVs submitted and closed positions aren't available from the server yet.
      </p>
      {error && <p className="message error">{error}</p>}
    </div>
  );
}