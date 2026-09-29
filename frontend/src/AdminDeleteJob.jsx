import { request, SimpleForm } from "./helpers.jsx";

export default function AdminDeleteJob({ token }) {
  return (
    <div className="page">
      <div className="ats-header">
        <h2>Delete Job</h2>
        <p className="hint">Remove a job by its ID.</p>
      </div>

      <SimpleForm
        title="Delete Job"
        buttonText="Delete job"
        fields={[{ name: "id", label: "Job ID" }]}
        onSubmit={(v) => request("/jobs/" + v.id, { method: "DELETE" }, token)}
      />

      <p className="hint">
        This needs a <code>DELETE /jobs/&lt;id&gt;</code> route on the
        backend — it isn't in app.py yet, so this will show an error until
        it's added.
      </p>
    </div>
  );
}