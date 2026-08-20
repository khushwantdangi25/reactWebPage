import { NavLink } from "react-router-dom"
import "./Footer.css"

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>World</h2>
                    <p>Explore countries, cultures, and places from around the globe.</p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contect">Contect</NavLink></li>
                        <li><NavLink to="/country">Country</NavLink></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <ul>
                        <li>Email: info@world.com</li>
                        <li>Phone: +1 234 567 890</li>
                        <li>Location: Worldwide</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} World. All rights reserved.</p>
            </div>
        </footer>
    )
}
