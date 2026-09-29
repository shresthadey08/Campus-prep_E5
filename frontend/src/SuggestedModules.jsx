export default function SuggestedModules({ modules }) {
  const list = modules || [];

  return (
    <div className="page">
      <div className="panel">
        <h2>Suggested Modules</h2>
        {list.length === 0 ? (
          <p className="hint">
            Upload your CV under Resume Analysis to see the learning modules
            recommended for you.
          </p>
        ) : (
          list.map((m, i) => (
            <div className="module" key={i}>
              <strong>{m.title || m.name}</strong>
              <span className="label">
                {[
                  m.mentor || m.mentor_name,
                  Array.isArray(m.skills_taught)
                    ? m.skills_taught.join(", ")
                    : Array.isArray(m.skills)
                      ? m.skills.join(", ")
                      : m.skills,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}