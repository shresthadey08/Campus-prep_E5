import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

export default function Home() {
  return (
    <>
      <header className="home-navbar">
        <div className="home-navbar-inner">
          <span className="navbar-logo">Campus Prep</span>
          <div className="home-navbar-actions">
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm">
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="hero">
          <div className="container">
            <h1>Campus Prep</h1>
            <p className="hero-text">
              A simple place for students to prepare their CV, explore suggested
              job openings and keep track of their placement applications —
              all in one interface.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline">
                I already have an account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
