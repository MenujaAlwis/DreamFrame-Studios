import './ourteamhero.css';
import bg from '../assets/ourteamhero.png';

const OurTeamHero = () => {
  return (
    <div
      className="ourteam-hero"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="ourteam-hero-content">
        <h1 className="ourteam-title">Our Team</h1>
        <p className="ourteam-subtitle">
          Behind the lens
        </p>
      </div>
    </div>
  );
};

export default OurTeamHero;