export default function Footer({ onAbout, onContact }) {
    return (
        <footer className="site-footer">
            <div className="footer-links">
                <a href="#" onClick={onAbout}>About Us</a>
                <a href="#" onClick={onContact}>Contact Us</a>
            </div>
            <p className="footer-note">© CampusPrep</p>
        </footer>
    );
}