import { useState } from "react";
import { useCV } from "../../../context/CVContext";
import { suggestedModules as mockModules } from "../../../api/mockData";
import Modal from "../../../components/Common/Modal";
import "../Student.css";

export default function SuggestedModules() {
  const { matchResults } = useCV();
  const [activeModule, setActiveModule] = useState(null);

  // Prefer modules the backend recommended based on this student's
  // actual missing skills; otherwise show the local sample modules.
  const modules = matchResults
    ? matchResults.recommended_modules.map((m) => ({
        id: m.id,
        title: m.title,
        description: `Covers: ${m.skills_taught.join(", ") || "general placement prep"}.`,
        mentorName: m.mentor_name || "Unknown mentor",
        details: m.file_path
          ? `Skills covered: ${m.skills_taught.join(", ")}. Material: ${m.file_path}`
          : `Skills covered: ${m.skills_taught.join(", ")}.`,
      }))
    : mockModules;

  return (
    <div>
      <h1 className="page-title">Suggested Modules</h1>
      <p className="page-subtitle">
        {matchResults
          ? "Modules recommended based on the skills missing from your uploaded CV."
          : "Modules and samples shared by mentors."}
      </p>

      {modules.length === 0 ? (
        <div className="empty-state">
          No extra modules needed right now — your CV already covers the skills these
          jobs are asking for.
        </div>
      ) : (
        <div className="grid grid-3">
          {modules.map((mod) => (
            <div className="card module-card" key={mod.id}>
              <h3 className="job-title">{mod.title}</h3>
              <p className="job-desc">{mod.description}</p>
              <span className="module-mentor">By {mod.mentorName}</span>
              <button
                className="btn btn-outline btn-sm"
                style={{ marginTop: 10, alignSelf: "flex-start" }}
                onClick={() => setActiveModule(mod)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {activeModule && (
        <Modal title={activeModule.title} onClose={() => setActiveModule(null)}>
          <p className="module-mentor" style={{ marginBottom: 12 }}>
            By {activeModule.mentorName}
          </p>
          <p>{activeModule.details || activeModule.description}</p>
        </Modal>
      )}
    </div>
  );
}
