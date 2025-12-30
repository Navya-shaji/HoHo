import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Snowflake, Menu, X } from 'lucide-react';

function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <span className="logo-santa"></span>
                    <span>HOHO</span>
                </Link>

                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    {isMenuOpen ? <X size={24} color="#7a0404ff" /> : <Menu size={24} color="#4d0606ff" />}
                </button>

                <nav className={`nav-container ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <Link
                                to="/"
                                className={location.pathname === '/' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                🏠 Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tracker"
                                className={location.pathname === '/tracker' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                🌟 Santa's Journey
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/gift-finder"
                                className={location.pathname === '/gift-finder' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Find My Gift
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/games"
                                className={location.pathname === '/games' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Games
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
