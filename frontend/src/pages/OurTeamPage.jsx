import Header from '../components/Header';
import Footer from '../components/Footer';
import OurTeamHero from './OurTeamHero';
import './OurTeamPage.css';
import OurTeamGrid from '../components/OurTeamGrid';

const OurTeamPage = () => {
  return (
    <div className="ourteam-page">
      <Header />
      <OurTeamHero />
      <OurTeamGrid />
      <Footer />
    </div>
  );
};

export default OurTeamPage;