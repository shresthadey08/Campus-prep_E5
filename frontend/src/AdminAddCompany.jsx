import { request, jsonOptions, SimpleForm } from "./helpers.jsx";

export default function AdminAddCompany({ token }) {
  return (
    <div className="page">
      <div className="ats-header">
        <h2>Add Company</h2>
        <p className="hint">Register a new hiring company.</p>
      </div>

      <SimpleForm
        title="Add Company"
        buttonText="Add company"
        fields={[
          { name: "name", label: "Company name" },
          { name: "industry", label: "Industry" },
          { name: "location", label: "Location" },
        ]}
        onSubmit={(v) =>
          request(
            "/companies",
            jsonOptions("POST", { name: v.name, industry: v.industry, location: v.location }),
            token
          )
        }
      />

      <p className="hint">
        This needs a <code>POST /companies</code> route on the backend — it
        isn't in app.py yet (companies are currently only created
        automatically when you add a job). This form will error until that
        route is added.
      </p>
    </div>
  );
}