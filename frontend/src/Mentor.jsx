import MentorDashboard from "./MentorDashboard.jsx";
import MentorUploadModule from "./MentorUploadModule.jsx";
import MentorEditModule from "./MentorEditModule.jsx";
import MentorDeleteModule from "./MentorDeleteModule.jsx";
import MentorScores from "./MentorScores.jsx";

export default function Mentor({ token }) {
    return (
        <div className="single-page-dashboard">
            <section id="mentor-dashboard">
                <MentorDashboard token={token} />
            </section>

            <section id="mentor-upload-module">
                <MentorUploadModule token={token} />
            </section>

            <section id="mentor-edit-module">
                <MentorEditModule token={token} />
            </section>

            <section id="mentor-delete-module">
                <MentorDeleteModule token={token} />
            </section>

            <section id="mentor-student-scores">
                <MentorScores token={token} />
            </section>
        </div>
    );
}
