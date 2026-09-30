import Student from "./Student.jsx";
import SuggestedModules from "./SuggestedModules.jsx";
import SuggestedJobs from "./SuggestedJobs.jsx";

export default function Dashboard({
    result,
    token,
    onResult,
    onAnalyze,
}) {
    const jobs =
        (result && result.recommended_jobs) || [];

    const modules =
        (result && result.recommended_modules) || [];

    return (
        <div className="student-dashboard">

            {/* CV ANALYSIS */}

            <section id="resume-analysis">
                <Student
                    token={token}
                    result={result}
                    onResult={onResult}
                />
            </section>


            {/* SUGGESTED JOBS */}

            {result && (
                <section id="suggested-jobs">
                    <SuggestedJobs
                        jobs={jobs}
                    />
                </section>
            )}


            {/* SUGGESTED MODULES */}

            {result && (
                <section id="suggested-modules">
                    <SuggestedModules
                        modules={modules}
                    />
                </section>
            )}


            {/* UPLOAD AGAIN */}

            {result && (
                <section
                    id="upload-again"
                    className="dashboard-final-cta"
                >
                    <div className="panel">
                        <h3>
                            Upload Your CV Again
                        </h3>

                        <p className="hint">
                            Upload an updated CV to run
                            the analysis again and refresh
                            your recommendations.
                        </p>

                        <button
                            type="button"
                            onClick={onAnalyze}
                        >
                            Upload Again
                        </button>
                    </div>
                </section>
            )}

        </div>
    );
}
