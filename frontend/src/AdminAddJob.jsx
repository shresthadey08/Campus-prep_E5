import { request, jsonOptions, skillList, SimpleForm } from "./helpers.jsx";

export default function AdminAddJob({ token }) {
  return (
    <div className="page">
      <div className="ats-header">
        <h2>Add Job</h2>
        <p className="hint">
          Create a new job opening. If the company doesn't exist yet, it's
          created automatically.
        </p>
      </div>

      <SimpleForm
        title="Add Job"
        buttonText="Add job"
        fields={[
          { name: "title", label: "Job title" },
          { name: "company", label: "Company" },
          { name: "location", label: "Location" },
          { name: "description", label: "Description" },
          { name: "skills", label: "Required skills (comma separated)" },
        ]}
        onSubmit={(v) =>
          request(
            "/jobs",
            jsonOptions("POST", {
              title: v.title,
              company: v.company,
              location: v.location,
              description: v.description,
              required_skills: skillList(v.skills),
            }),
            token
          )
        }
      />
    </div>
  );
}