import { request, jsonOptions, skillList, SimpleForm } from "./helpers.jsx";

export default function AdminEditJob({ token }) {
  return (
    <div className="page">
      <div className="ats-header">
        <h2>Edit Job</h2>
        <p className="hint">Update an existing job by its ID.</p>
      </div>

      <SimpleForm
        title="Edit Job"
        buttonText="Save changes"
        fields={[
          { name: "id", label: "Job ID" },
          { name: "title", label: "New title" },
          { name: "skills", label: "New required skills (comma separated)" },
        ]}
        onSubmit={(v) =>
          request(
            "/jobs/" + v.id,
            jsonOptions("PUT", { title: v.title, required_skills: skillList(v.skills) }),
            token
          )
        }
      />

      <p className="hint">
        This needs a <code>PUT /jobs/&lt;id&gt;</code> route on the backend —
        it isn't in app.py yet, so this will show an error until it's added.
      </p>
    </div>
  );
}