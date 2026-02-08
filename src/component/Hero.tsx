import "./Hero.css";
import { useNavigate } from 'react-router-dom';
import Background from '../assets/Background.png';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero" id="Home">
      <img src={Background} alt="Background" className="hero-background" />
      <div className="hero-container">
        <h1 className="hero-title">Coffee, Crafted with Intention</h1>
        <p className="hero-subtitle">
          At MORA, every cup is thoughtfully brewed — balancing flavor,
          process, and atmosphere.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/menu')}>Explore Our Menu</button>
          <button className="btn-secondary" onClick={() => window.location.href = "#VisitMe"}>Visit Our Space</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;