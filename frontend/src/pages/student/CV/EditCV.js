import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCV } from "../../../context/CVContext";
import { submitCVEdit } from "../../../api/api";

function RepeatableSection({ title, items, fields, onChange, onAdd, onRemove }) {
  return (
    <div>
      <div className="section-heading">
        <h2>{title}</h2>
        <button type="button" className="btn btn-outline btn-sm" onClick={onAdd}>
          + Add
        </button>
      </div>
      {items.length === 0 && <p className="page-subtitle">Nothing added yet.</p>}
      {items.map((item, index) => (
        <div className="repeatable-block" key={index}>
          {items.length > 1 && (
            <button
              type="button"
              className="btn btn-outline btn-sm repeatable-block-remove"
              onClick={() => onRemove(index)}
            >
              Remove
            </button>
          )}
          <div className="form-row">
            {fields.map((field) => (
              <div className="form-group" key={field.name}>
                <label>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    value={item[field.name]}
                    onChange={(e) => onChange(index, field.name, e.target.value)}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type="text"
                    value={item[field.name]}
                    onChange={(e) => onChange(index, field.name, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EditCV() {
  const { cvData, updateCVData } = useCV();
  const navigate = useNavigate();
  const [form, setForm] = useState(cvData);
  const [skillsInput, setSkillsInput] = useState((cvData.skills || []).join(", "));
  const [certsInput, setCertsInput] = useState((cvData.certifications || []).join(", "));
  const [saved, setSaved] = useState(false);

  const handlePersonalChange = (field, value) => {
    setForm((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const handleListChange = (listName, index, field, value) => {
    setForm((prev) => {
      const updated = [...prev[listName]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [listName]: updated };
    });
  };

  const addItem = (listName, emptyItem) => {
    setForm((prev) => ({ ...prev, [listName]: [...prev[listName], emptyItem] }));
  };

  const removeItem = (listName, index) => {
    setForm((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...form,
      skills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
      certifications: certsInput.split(",").map((s) => s.trim()).filter(Boolean),
    };
    await submitCVEdit(finalData);
    updateCVData(finalData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      {saved && <div className="auth-error">Your CV information has been saved.</div>}

      <div className="section-heading">
        <h2>Personal Information</h2>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={form.personal.fullName}
            onChange={(e) => handlePersonalChange("fullName", e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={form.personal.email}
            onChange={(e) => handlePersonalChange("email", e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={form.personal.phone}
            onChange={(e) => handlePersonalChange("phone", e.target.value)}
            placeholder="Phone number"
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={form.personal.address}
            onChange={(e) => handlePersonalChange("address", e.target.value)}
            placeholder="City, State"
          />
        </div>
      </div>

      <RepeatableSection
        title="Education"
        items={form.education}
        fields={[
          { name: "degree", label: "Degree", placeholder: "B.Tech Computer Science" },
          { name: "institution", label: "Institution", placeholder: "College name" },
          { name: "year", label: "Year", placeholder: "2026" },
        ]}
        onChange={(i, f, v) => handleListChange("education", i, f, v)}
        onAdd={() => addItem("education", { degree: "", institution: "", year: "" })}
        onRemove={(i) => removeItem("education", i)}
      />

      <div className="section-heading">
        <h2>Skills</h2>
      </div>
      <div className="form-group">
        <label>Comma-separated list</label>
        <textarea
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          placeholder="HTML, CSS, JavaScript, React"
        />
      </div>

      <RepeatableSection
        title="Projects"
        items={form.projects}
        fields={[
          { name: "title", label: "Project Title", placeholder: "Project name" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Short description" },
        ]}
        onChange={(i, f, v) => handleListChange("projects", i, f, v)}
        onAdd={() => addItem("projects", { title: "", description: "" })}
        onRemove={(i) => removeItem("projects", i)}
      />

      <RepeatableSection
        title="Experience"
        items={form.experience}
        fields={[
          { name: "role", label: "Role", placeholder: "Intern" },
          { name: "company", label: "Company", placeholder: "Company name" },
          { name: "duration", label: "Duration", placeholder: "3 months" },
        ]}
        onChange={(i, f, v) => handleListChange("experience", i, f, v)}
        onAdd={() => addItem("experience", { role: "", company: "", duration: "" })}
        onRemove={(i) => removeItem("experience", i)}
      />

      <div className="section-heading">
        <h2>Certifications</h2>
      </div>
      <div className="form-group">
        <label>Comma-separated list</label>
        <textarea
          value={certsInput}
          onChange={(e) => setCertsInput(e.target.value)}
          placeholder="AWS Cloud Practitioner, Google Data Analytics"
        />
      </div>

      <hr className="divider" />

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" className="btn">
          Save CV
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate("/student/cv/preview")}
        >
          Go to Preview
        </button>
      </div>
    </form>
  );
}
