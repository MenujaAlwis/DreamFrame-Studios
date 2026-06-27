import Header from '../components/Header';
import Footer from '../components/Footer';
import OurTeamHero from './ourteamhero';
import './OurTeamPage.css';

const OurTeamPage = () => {
  return (
    <div className="ourteam-page">
      <Header />
      <OurTeamHero />
      <Footer />
    </div>
  );
};

export default OurTeamPage;