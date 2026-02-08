import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import logo from './mora_logo.png';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img 
          src={logo} 
          alt="MORA Kafe Logo" 
          className="navbar-logo" 
          style={{ cursor: 'pointer' }} 
          onClick={() => {
            setIsMenuOpen(false);
            navigate('/');
          }} 
        />
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="#Home" onClick={() => handleNavClick('Home')}>Home</a>
          </li>
          <li className="navbar-item">
            <a href="#Menu" onClick={() => handleNavClick('Menu')}>Promo</a>
          </li>
          <li className="navbar-item">
            <a href="#Story" onClick={() => handleNavClick('Story')}>Story</a>
          </li>
          <li className="navbar-item">
            <a href="#Rating" onClick={() => handleNavClick('Rating')}>Reviews</a>
          </li>
        </ul>
        <div 
          className={`navbar-hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;