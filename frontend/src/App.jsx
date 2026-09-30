import { useEffect, useState } from "react";
import Auth from "./Auth.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import Dashboard from "./Dashboard.jsx";
import Mentor from "./Mentor.jsx";
import Admin from "./Admin.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [mentorView, setMentorView] = useState("dashboard");
  const [adminView, setAdminView] = useState("dashboard");

  const [lastResult, setLastResult] = useState(null);

  const [authMode, setAuthMode] = useState("login");

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  // Smooth-scroll to a section of the single-page student dashboard
  function scrollToSection(id) {
    setTimeout(() => {
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  }

  function handleAuth(data) {
    setUser({
      role: data.role,
      token: data.token,
    });

    setShowAbout(false);
    setShowContact(false);

    setMentorView("dashboard");
    setAdminView("dashboard");

    setAuthMode("login");
  }

  function handleStudentResult(data) {
    setLastResult(data || null);
  }

  function goLogin(e) {
    e.preventDefault();

    setShowAbout(false);
    setShowContact(false);
    setAuthMode("login");
  }

  function goRegister(e) {
    e.preventDefault();

    setShowAbout(false);
    setShowContact(false);
    setAuthMode("register");
  }

  function goHome(e) {
    e.preventDefault();

    setShowAbout(false);
    setShowContact(false);

    if (user?.role === "student") {
      scrollToSection("dashboard");
    }
  }

  function goResumeAnalysis(e) {
    e.preventDefault();

    if (!user) {
      setAuthMode("login");
      return;
    }

    setShowAbout(false);
    setShowContact(false);

    scrollToSection("resume-analysis");
  }

  function goSuggestedModules(e) {
    e.preventDefault();

    if (!user) {
      setAuthMode("login");
      return;
    }

    setShowAbout(false);
    setShowContact(false);

    scrollToSection("suggested-modules");
  }

  function goSuggestedJobs(e) {
    e.preventDefault();

    if (!user) {
      setAuthMode("login");
      return;
    }

    setShowAbout(false);
    setShowContact(false);

    scrollToSection("suggested-jobs");
  }

  function goAbout(e) {
    e.preventDefault();

    setShowContact(false);
    setShowAbout(true);
  }

  function goContact(e) {
    e.preventDefault();

    setShowAbout(false);
    setShowContact(true);
  }

  function mentorNav(view) {
    return (e) => {
      e.preventDefault();

      setShowAbout(false);
      setShowContact(false);

      setMentorView(view);
    };
  }

  function adminNav(view) {
    return (e) => {
      e.preventDefault();

      setShowAbout(false);
      setShowContact(false);

      setAdminView(view);
    };
  }

  function logout(e) {
    e.preventDefault();

    setUser(null);
    setLastResult(null);

    setShowAbout(false);
    setShowContact(false);

    setAuthMode("login");
  }

  let content;

  if (showContact) {
    content = <Contact />;
  } else if (showAbout) {
    content = <About />;
  } else if (user) {
    /*
     * STUDENT
     * Everything remains inside one single scrollable Dashboard.
     */
    if (user.role === "student") {
      content = (
        <Dashboard
          result={lastResult}
          token={user.token}
          onResult={handleStudentResult}
          onAnalyze={() => {
            // Go back to the upload-resume screen (the first dashboard view).
            // The page gets much shorter once the results are cleared, so wait
            // for that render and then jump straight to the top instead of
            // smooth-scrolling through a layout that is still changing.
            setLastResult(null);
            requestAnimationFrame(() =>
              requestAnimationFrame(() =>
                window.scrollTo({ top: 0, behavior: "instant" })
              )
            );
          }}
        />
      );
    }

    /*
     * MENTOR — one scrollable page
     */
    else if (user.role === "mentor") {
      content = <Mentor token={user.token} />;
    }

    /*
     * ADMIN — one scrollable page
     */
    else if (user.role === "admin") {
      content = <Admin token={user.token} />;
    }

    /*
     * UNKNOWN ROLE
     */
    else {
      content = (
        <div className="page">
          <p>Unknown account role.</p>
        </div>
      );
    }
  }

  /*
   * NOT LOGGED IN
   *
   * Landing page has been completely removed.
   * The application now starts directly with Login/Register.
   */
  else {
    content = (
      <div className="auth-page">
        <Auth
          mode={authMode}
          onAuth={handleAuth}
          onSwitch={setAuthMode}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <nav className="navbar">
        <span className="logo">
          <span className="logo-campus">Campus</span>
          <span className="logo-prep">Prep</span>
        </span>

        <div className="nav-links">

          {/* STUDENT NAVIGATION */}
          {user && user.role === "student" && (
            <>
              <a href="#" onClick={goHome}>
                Dashboard
              </a>

              {/* These links appear only after the CV has been uploaded and checked. */}
              {lastResult && (
                <>
                  <a href="#" onClick={goResumeAnalysis}>
                    Resume Analysis
                  </a>

                  <a href="#" onClick={goSuggestedModules}>
                    Suggested Modules
                  </a>

                  <a href="#" onClick={goSuggestedJobs}>
                    Suggested Jobs
                  </a>
                </>
              )}
            </>
          )}

          {/* MENTOR NAVIGATION — only Dashboard */}
          {user && user.role === "mentor" && (
            <a href="#mentor-dashboard" onClick={(e) => {
              e.preventDefault();
              scrollToSection("mentor-dashboard");
            }}>
              Dashboard
            </a>
          )}

          {/* ADMIN NAVIGATION — only Dashboard */}
          {user && user.role === "admin" && (
            <a href="#admin-dashboard" onClick={(e) => {
              e.preventDefault();
              scrollToSection("admin-dashboard");
            }}>
              Dashboard
            </a>
          )}

          {/* THEME TOGGLE */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {/* AUTH NAVIGATION */}
          {user ? (
            <>
              <span className="nav-role">
                {user.role}
              </span>

              <a href="#" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <a href="#" onClick={goLogin}>
                Login
              </a>

              <a
                href="#"
                className="nav-register"
                onClick={goRegister}
              >
                Register
              </a>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">
        {content}
      </main>

      <Footer
        onAbout={goAbout}
        onContact={goContact}
      />
    </div>
  );
}