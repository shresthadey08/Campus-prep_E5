import { useJobs } from "../../context/JobsContext";

export default function ManageOpenings() {
  const { jobs, loading, source } = useJobs();

  return (
    <div>
      <h1 className="page-title">Manage Openings</h1>
      <p className="page-subtitle">Overview of all current job openings across companies.</p>

      {source === "mock" && (
        <div className="placeholder-banner">
          Showing sample data — the backend at the configured API URL isn't reachable
          right now, or has no jobs seeded yet.
        </div>
      )}

      {loading ? (
        <p className="page-subtitle">Loading job openings...</p>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <table className="applications-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Required Skills</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.requiredSkills.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
