export default function SuggestedJobs({ jobs }) {
    const list = jobs || [];

    const jobTitle = (j) => j.title || j.job_title || j.name || "";
    const jobCompany = (j) => j.company || j.company_name || "";
    const jobScore = (j) => Number(j.match ?? j.match_percentage ?? j.score ?? 0);

    // best match first
    const sorted = [...list].sort((a, b) => jobScore(b) - jobScore(a));

    return (
        <div className="page">
            <div className="panel">
                <h2>Suggested Jobs</h2>
                {sorted.length === 0 ? (
                    <p className="hint">
                        Upload your CV under Resume Analysis to see the jobs that match you
                        best.
                    </p>
                ) : (
                    sorted.map((j, i) => (
                        <div className="module" key={i}>
                            <strong>{jobTitle(j)}</strong>
                            <span className="label">
                                {[jobCompany(j), jobScore(j) + "% match"]
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