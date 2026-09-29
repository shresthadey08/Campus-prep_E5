import { request, SimpleForm } from "./helpers.jsx";

export default function MentorDeleteModule({ token }) {
  return (
    <div className="page">
      <div className="ats-header">
        <h2>Delete Module</h2>
        <p className="hint">Remove a module by its ID.</p>
      </div>

      <SimpleForm
        title="Delete Module"
        buttonText="Delete module"
        fields={[{ name: "id", label: "Module ID" }]}
        onSubmit={(v) => request("/modules/" + v.id, { method: "DELETE" }, token)}
      />

      <p className="hint">
        This needs a <code>DELETE /modules/&lt;id&gt;</code> route on the
        backend — it isn't in app.py yet, so this will show an error until
        it's added.
      </p>
    </div>
  );
}