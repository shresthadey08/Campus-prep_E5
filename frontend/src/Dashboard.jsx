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

            {/* =========================================
                CV ANALYSIS
                Contains:
                - Your CV analysis
                - roles ranked by skill overlap
                - Overall CV match
                - Recommended jobs
                - Top match
                - Role ranking
                - Skills to develop
                - Recommended learning
               ========================================= */}

            <section id="resume-analysis">
                <Student
                    token={token}
                    onResult={onResult}
                />
            </section>


            {/* =========================================
                SUGGESTED JOBS
                Comes BEFORE Suggested Modules.
               ========================================= */}

            {result && (
                <section id="suggested-jobs">
                    <SuggestedJobs
                        jobs={jobs}
                    />
                </section>
            )}


            {/* =========================================
                SUGGESTED MODULES
                Comes AFTER Suggested Jobs.
               ========================================= */}

            {result && (
                <section id="suggested-modules">
                    <SuggestedModules
                        modules={modules}
                    />
                </section>
            )}


            {/* =========================================
                UPLOAD AGAIN
                Final student-dashboard section.

                CV Preview has intentionally been removed.
               ========================================= */}

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
