export default function Landing({ onGetStarted }) {
    return (
        <div className="landing-wrap">
            <div className="landing">
                <div className="landing-text">
                    <span className="landing-badge">WELCOME TO CAMPUSPREP</span>
                    <h1 className="landing-title">
                        Land Your <span className="accent">Dream Job</span> with Smarter
                        Placement Prep
                    </h1>
                    <p className="landing-subtitle">
                        AI-assisted resume matching and placement preparation
                    </p>
                    <p className="landing-desc">
                        Upload your CV and instantly see how well you match real job
                        openings, the skills you're missing, and the learning modules that
                        can close the gap.
                    </p>
                </div>

                <div className="landing-graphic">
                    <div className="mock-window">
                        <div className="mock-bar">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="mock-body">
                            <div className="mock-card"></div>
                            <div className="mock-card"></div>
                            <div className="mock-card wide"></div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="landing-cta" onClick={onGetStarted}>
                Get Started
            </button>
        </div>
    );
}