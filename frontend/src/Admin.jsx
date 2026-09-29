import AdminDashboard from "./AdminDashboard.jsx";
import AdminAddCompany from "./AdminAddCompany.jsx";
import AdminAddJob from "./AdminAddJob.jsx";
import AdminEditJob from "./AdminEditJob.jsx";
import AdminDeleteJob from "./AdminDeleteJob.jsx";
import AdminOpenings from "./AdminOpenings.jsx";

export default function Admin({ token }) {
    return (
        <div className="single-page-dashboard">
            <section id="admin-dashboard">
                <AdminDashboard token={token} />
            </section>

            <section id="admin-add-company">
                <AdminAddCompany token={token} />
            </section>

            <section id="admin-add-job">
                <AdminAddJob token={token} />
            </section>

            <section id="admin-edit-job">
                <AdminEditJob token={token} />
            </section>

            <section id="admin-delete-job">
                <AdminDeleteJob token={token} />
            </section>

            <section id="admin-manage-openings">
                <AdminOpenings token={token} />
            </section>
        </div>
    );
}
