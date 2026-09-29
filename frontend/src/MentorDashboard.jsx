import { useEffect, useState } from "react";
import { request } from "./helpers.jsx";

export default function MentorDashboard({ token }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/mentor/stats", {}, token)
      .then(setStats)
      .catch((err) => setError(err.message));
  }, [token]);

  return (
    <div className="page">
      <div className="panel dashboard-intro">
        <h2>Mentor Dashboard</h2>
        <p className="hint">A quick look at your students and their CV activity.</p>
      </div>

      <div className="summary">
        <div className="panel">
          <span className="label">Total students</span>
          <strong className="big">{stats ? stats.total_students : "—"}</strong>
        </div>
        <div className="panel">
          <span className="label">Logged-in students</span>
          <strong className="big">{stats ? stats.logged_in_students : "—"}</strong>
        </div>
        <div className="panel">
          <span className="label">CVs submitted</span>
          <strong className="big">{stats ? stats.cvs_submitted : "—"}</strong>
        </div>
      </div>

      {error && (
        <p className="hint">
          Live stats aren't available yet — this needs a{" "}
          <code>GET /mentor/stats</code> route on the backend.
        </p>
      )}
    </div>
  );
}