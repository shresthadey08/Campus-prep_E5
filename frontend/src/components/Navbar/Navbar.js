import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./Navbar.css";

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to={user ? `/${user.role}` : "/"} className="navbar-logo">
          Campus Prep
        </Link>

        {user && (
          <div className="navbar-right">
            <button
              className="icon-btn hamburger-btn"
              aria-label="Open menu"
              onClick={onMenuClick}
            >
              &#9776;
            </button>
            <div className="profile-wrapper">
              <button
                className="icon-btn profile-btn"
                onClick={() => setProfileOpen((v) => !v)}
              >
                Profile
              </button>
              {profileOpen && (
                <ProfileMenu onClose={() => setProfileOpen(false)} />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
