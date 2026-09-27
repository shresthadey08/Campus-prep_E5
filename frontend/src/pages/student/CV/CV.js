import { NavLink, Outlet } from "react-router-dom";
import "../Student.css";

export default function CV() {
  return (
    <div>
      <h1 className="page-title">CV</h1>
      <p className="page-subtitle">Upload your CV, edit your details or preview how it looks.</p>

      <nav className="subnav">
        <NavLink
          to="/student/cv/upload"
          className={({ isActive }) => "subnav-link" + (isActive ? " active" : "")}
        >
          Upload
        </NavLink>
        <NavLink
          to="/student/cv/edit"
          className={({ isActive }) => "subnav-link" + (isActive ? " active" : "")}
        >
          Edit
        </NavLink>
        <NavLink
          to="/student/cv/preview"
          className={({ isActive }) => "subnav-link" + (isActive ? " active" : "")}
        >
          Preview
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
