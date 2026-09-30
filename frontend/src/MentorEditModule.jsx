import { request, jsonOptions, skillList, SimpleForm } from "./helpers.jsx";

export default function MentorEditModule({ token }) {
  return (
    <div className="page">
      <div className="ats-header">
        <h2>Edit Module</h2>
        <p className="hint">Update an existing module's title or skills by its ID.</p>
      </div>

      <SimpleForm
        title="Edit Module"
        buttonText="Save changes"
        fields={[
          { name: "id", label: "Module ID" },
          { name: "title", label: "New title" },
          { name: "skills", label: "New skills (comma separated)" },
        ]}
        onSubmit={(v) =>
          request(
            "/modules/" + v.id,
            jsonOptions("PUT", { title: v.title, skills_taught: skillList(v.skills) }),
            token
          )
        }
      />

      <p className="hint">
        This needs a <code>PUT /modules/&lt;id&gt;</code> route on the
        backend — it isn't in app.py yet, so this will show an error until
        it's added.
      </p>
    </div>
  );
}