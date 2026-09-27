import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const studentLinks = [
  { to: "/student", label: "Dashboard", end: true },
  { to: "/student/cv/upload", label: "CV" },
  { to: "/student/jobs/suggested", label: "Jobs" },
  { to: "/student/applications", label: "Applications" },
  { to: "/student/modules", label: "Suggested Modules" },
];

const mentorLinks = [
  { to: "/mentor", label: "Mentor Dashboard", end: true },
  { to: "/mentor/upload-module", label: "Upload Module" },
  { to: "/mentor/edit-module", label: "Edit Module" },
  { to: "/mentor/delete-module", label: "Delete Module" },
  { to: "/mentor/performance", label: "Student Scores / Performance" },
];

const adminLinks = [
  { to: "/admin", label: "Admin Dashboard", end: true },
  { to: "/admin/companies", label: "Add Company" },
  { to: "/admin/add-job", label: "Add Job" },
  { to: "/admin/edit-job", label: "Edit Job" },
  { to: "/admin/delete-job", label: "Delete Job" },
  { to: "/admin/manage-openings", label: "Manage Openings" },
];

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  if (!user) return null;

  const links =
    user.role === "student" ? studentLinks : user.role === "mentor" ? mentorLinks : adminLinks;

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <span>Menu</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close menu">
            &times;
          </button>
        </div>
        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
