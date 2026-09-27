import { NavLink, Outlet } from "react-router-dom";
import "../Student.css";

export default function Jobs() {
  return (
    <div>
      <h1 className="page-title">Jobs</h1>
      <p className="page-subtitle">
        Explore suggested jobs, current openings, and where your skills stand.
      </p>

      <nav className="subnav">
        <NavLink
          to="/student/jobs/suggested"
          className={({ isActive }) => "subnav-link" + (isActive ? " active" : "")}
        >
          Suggested Jobs
        </NavLink>
        <NavLink
          to="/student/jobs/openings"
          className={({ isActive }) => "subnav-link" + (isActive ? " active" : "")}
        >
          Current Job Openings
        </NavLink>
        <NavLink
          to="/student/jobs/missing-skills"
          className={({ isActive }) => "subnav-link" + (isActive ? " active" : "")}
        >
          Missing Skills
        </NavLink>
        <NavLink
          to="/student/jobs/alternative-skills"
          className={({ isActive }) => "subnav-link" + (isActive ? " active" : "")}
        >
          Alternative Skills
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
