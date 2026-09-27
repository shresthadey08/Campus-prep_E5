import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./ProfileMenu.css";

export default function ProfileMenu({ onClose }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

  return (
    <div className="profile-menu">
      <div className="profile-menu-header">
        <div className="profile-name">{user.name}</div>
        <div className="profile-email">{user.email}</div>
        <span className="badge">{user.role}</span>
      </div>

      <hr className="divider" />

      <div className="profile-menu-row">
        <span>Theme</span>
        <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
      </div>

      <hr className="divider" />

      <button className="btn btn-outline btn-block" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
