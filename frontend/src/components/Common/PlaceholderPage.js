export default function PlaceholderPage({ title, description, fields }) {
  return (
    <div>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{description}</p>

      <div className="placeholder-banner">
        This section is a UI placeholder only. It is not connected to any
        backend functionality in the current version.
      </div>

      {fields && (
        <div className="card">
          <div className="form-row">
            {fields.map((field) => (
              <div className="form-group" key={field}>
                <label>{field}</label>
                <input type="text" placeholder={field} disabled />
              </div>
            ))}
          </div>
          <button className="btn" disabled>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
