import { useCV } from "../../../context/CVContext";
import { skillGapMap, DEFAULT_ALTERNATIVE_SKILLS } from "../../../api/mockData";

export default function AlternativeSkills() {
  const { cvData } = useCV();
  const currentSkills = cvData.skills || [];

  const alternative = new Set();
  currentSkills.forEach((skill) => {
    const entry = skillGapMap[skill];
    if (entry) entry.alternative.forEach((a) => alternative.add(a));
  });
  if (alternative.size === 0) {
    DEFAULT_ALTERNATIVE_SKILLS.forEach((a) => alternative.add(a));
  }

  const alternativeList = Array.from(alternative);

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Alternative / related skills</h3>
      <p className="page-subtitle">
        Based on your current skill set, you may also want to explore:
      </p>
      <div className="skills-list">
        {alternativeList.map((skill) => (
          <span className="tag" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
