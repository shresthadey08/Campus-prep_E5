import { Link } from "react-router-dom";
import { useCV } from "../../../context/CVContext";

export default function CVPreview() {
  const { cvData, cvFile, cvFileUrl } = useCV();
  const { personal, education, skills, projects, experience, certifications } = cvData;
  const isPdf = cvFile && cvFile.type === "application/pdf";

  return (
    <div className="card">
      <div className="cv-preview-section">
        <h3>Personal Information</h3>
        <div className="cv-entry">
          <div className="cv-entry-title">{personal.fullName || "Name not added yet"}</div>
          <div className="cv-entry-sub">
            {[personal.email, personal.phone, personal.address].filter(Boolean).join(" · ") ||
              "Add your contact details from Edit"}
          </div>
        </div>
      </div>

      <div className="cv-preview-section">
        <h3>Education</h3>
        {education.filter((e) => e.degree || e.institution).length === 0 && (
          <p className="page-subtitle">No education details added yet.</p>
        )}
        {education.map((e, i) =>
          e.degree || e.institution ? (
            <div className="cv-entry" key={i}>
              <div className="cv-entry-title">{e.degree}</div>
              <div className="cv-entry-sub">
                {e.institution} {e.year && `· ${e.year}`}
              </div>
            </div>
          ) : null
        )}
      </div>

      <div className="cv-preview-section">
        <h3>Skills</h3>
        <div className="skills-list">
          {skills.length === 0 && <p className="page-subtitle">No skills added yet.</p>}
          {skills.map((skill) => (
            <span className="tag" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="cv-preview-section">
        <h3>Projects</h3>
        {projects.filter((p) => p.title).length === 0 && (
          <p className="page-subtitle">No projects added yet.</p>
        )}
        {projects.map((p, i) =>
          p.title ? (
            <div className="cv-entry" key={i}>
              <div className="cv-entry-title">{p.title}</div>
              <div className="cv-entry-sub">{p.description}</div>
            </div>
          ) : null
        )}
      </div>

      <div className="cv-preview-section">
        <h3>Experience</h3>
        {experience.filter((e) => e.role || e.company).length === 0 && (
          <p className="page-subtitle">No experience added yet.</p>
        )}
        {experience.map((e, i) =>
          e.role || e.company ? (
            <div className="cv-entry" key={i}>
              <div className="cv-entry-title">
                {e.role} {e.company && `— ${e.company}`}
              </div>
              <div className="cv-entry-sub">{e.duration}</div>
            </div>
          ) : null
        )}
      </div>

      <div className="cv-preview-section">
        <h3>Certifications</h3>
        <div className="skills-list">
          {certifications.length === 0 && (
            <p className="page-subtitle">No certifications added yet.</p>
          )}
          {certifications.map((cert) => (
            <span className="tag" key={cert}>
              {cert}
            </span>
          ))}
        </div>
      </div>

      <hr className="divider" />

      <div className="cv-preview-section">
        <h3>Uploaded File</h3>
        {!cvFile && (
          <p className="page-subtitle">
            No file uploaded yet. Go to <Link to="/student/cv/upload">Upload</Link> to add one.
          </p>
        )}
        {cvFile && !isPdf && (
          <div className="file-row">
            Uploaded file: <strong>{cvFile.name}</strong>
          </div>
        )}
        {isPdf && cvFileUrl && (
          <>
            <div className="file-row" style={{ marginBottom: 0 }}>
              Uploaded file: <strong>{cvFile.name}</strong>
            </div>
            <iframe title="Uploaded CV" src={cvFileUrl} className="pdf-preview-frame" />
          </>
        )}
      </div>
    </div>
  );
}
