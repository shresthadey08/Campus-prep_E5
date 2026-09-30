import { request, jsonOptions, SimpleForm } from "./helpers.jsx";

export default function AdminOpenings({ token }) {
  return (
    <div className="page">
      <div className="ats-header">
        <h2>Manage Company Openings</h2>
        <p className="hint">Update how many positions a company has open.</p>
      </div>

      <SimpleForm
        title="Manage Openings"
        buttonText="Update openings"
        fields={[
          { name: "company", label: "Company" },
          { name: "openings", label: "Number of openings", type: "number" },
        ]}
        onSubmit={(v) =>
          request(
            "/openings",
            jsonOptions("PUT", { company: v.company, openings: Number(v.openings) }),
            token
          )
        }
      />

      <p className="hint">
        This needs both a <code>PUT /openings</code> route and an
        openings/status field on the Job model — neither exists in the
        backend yet, so this will error until they're added.
      </p>
    </div>
  );
}