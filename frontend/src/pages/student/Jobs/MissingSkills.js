import { useCV } from "../../../context/CVContext";
import { skillGapMap, DEFAULT_MISSING_SKILLS } from "../../../api/mockData";

export default function MissingSkills() {
  const { cvData, matchResults } = useCV();
  const currentSkills = cvData.skills || [];

  let missingList;

  if (matchResults) {
    // Real gap analysis from the backend, computed against every job
    // in the database via matcher.py.
    missingList = matchResults.missing_skills;
  } else {
    // No CV uploaded yet — fall back to the simple local skill-gap map.
    const missing = new Set();
    currentSkills.forEach((skill) => {
      const entry = skillGapMap[skill];
      if (entry) entry.missing.forEach((m) => missing.add(m));
    });
    DEFAULT_MISSING_SKILLS.forEach((m) => {
      if (!currentSkills.includes(m)) missing.add(m);
    });
    currentSkills.forEach((s) => missing.delete(s));
    missingList = Array.from(missing);
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Your current skills</h3>
      <div className="skills-list">
        {currentSkills.length === 0 && (
          <p className="page-subtitle">No skills added yet.</p>
        )}
        {currentSkills.map((skill) => (
          <span className="tag" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <hr className="divider" />

      <h3>Suggested missing skills</h3>
      <div className="skills-list">
        {missingList.length === 0 ? (
          <p className="page-subtitle">
            No obvious gaps found for the roles listed under Current Job Openings.
          </p>
        ) : (
          missingList.map((skill) => (
            <span className="tag" key={skill}>
              {skill}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
