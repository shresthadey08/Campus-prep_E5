import { useState } from "react";
import { request } from "./helpers.jsx";

export default function MentorScores({ token }) {
  const [scores, setScores] = useState(null);
  const [error, setError] = useState("");

  async function loadScores() {
    setError("");
    try {
      const data = await request("/scores", {}, token);
      setScores(Array.isArray(data) ? data : data.scores || []);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <div className="ats-header">
        <h2>Student Scores</h2>
        <p className="hint">View student performance based on their CV analysis.</p>
      </div>

      <div className="panel">
        <button onClick={loadScores}>Load scores</button>
        {error && (
          <p className="hint">
            This needs a <code>GET /scores</code> route on the backend — it
            isn't in app.py yet, so this errored ({error}) until it's added.
          </p>
        )}
        {scores && (
          <table>
            <thead>
              <tr><th>Student</th><th>Score</th></tr>
            </thead>
            <tbody>
              {scores.map((s, i) => (
                <tr key={i}>
                  <td>{s.student || s.name || s.email}</td>
                  <td>{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}