import { useEffect, useRef, useState } from 'react';
import './OurTeamHero.css';
import bg from '../assets/ourteamhero.png';
import bgMobile from '../assets/ourteam-mobile.png';

const team = [
  {
    name: 'Emma Williams',
    role: 'Lead Photographer',
    position: { top: '35%', left: '17%' },
    positionMobile: { top: '35%', left: '14%' }
  },
  {
    name: 'Sarah Johnson',
    role: 'Assistant Photographer',
    position: { top: '60%', left: '32%' },
    positionMobile: { top: '62%', left: '28%' }
  },
  {
    name: 'David Brown',
    role: 'Studio Manager',
    position: { top: '40%', left: '42%' },
    positionMobile: { top: '40%', left: '35%' }
  },
  {
    name: 'Sophia Miller',
    role: 'Creative Director',
    position: { top: '44%', left: '52%' },
    positionMobile: { top: '48%', left: '55%' }
  },
  {
    name: 'Mia Patinson',
    role: 'Sales Associate',
    position: { top: '35%', left: '68%' },
    positionMobile: { top: '32%', left: '68%' }
  },
  {
    name: 'James Wilson',
    role: 'Videographer',
    position: { top: '60%', left: '80%' },
    positionMobile: { top: '59%', left: '82%' }
  },
  {
    name: 'Olivia Smith',
    role: 'Photo Editor',
    position: { top: '40%', left: '85%' },
    positionMobile: { top: '43%', left: '87%' }
  }
];

const OurTeamHero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const open = (index) => setActiveIndex(index);
  const close = (index) =>
    setActiveIndex((current) => (current === index ? null : current));
  const toggle = (index) =>
    setActiveIndex((current) => (current === index ? null : index));

  return (
    <div ref={heroRef} className={`ourteam-hero ${isVisible ? 'show' : ''}`}>
      <div
        className="ourteam-hero-bg ourteam-hero-bg-desktop"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div
        className="ourteam-hero-bg ourteam-hero-bg-mobile"
        style={{ backgroundImage: `url(${bgMobile})` }}
      />

      <div className="ourteam-hero-content">
        <p className="ourteam-eyebrow">The People Behind DreamFrame</p>
        <h1 className="ourteam-title">Behind the lens</h1>
      </div>

      {team.map((person, index) => {
        const isOpen = activeIndex === index;
        const pos = isMobile ? person.positionMobile : person.position;

        return (
          <button
            key={person.name}
            type="button"
            className={`person-marker ${isOpen ? 'is-open' : ''}`}
            style={{
              top: pos.top,
              left: pos.left,
              transitionDelay: `${0.6 + index * 0.09}s`
            }}
            onMouseEnter={() => !isMobile && open(index)}
            onMouseLeave={() => !isMobile && close(index)}
            onFocus={() => open(index)}
            onBlur={() => close(index)}
            onClick={() => toggle(index)}
            aria-expanded={isOpen}
            aria-label={`${person.name}, ${person.role}`}
          >
            <span className="marker-pulse" aria-hidden="true" />
            <span className="marker-dot" aria-hidden="true" />

            <div className="person-card" role="tooltip">
              <span className="person-card-line" aria-hidden="true" />
              <h2>{person.name}</h2>
              <p>{person.role}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default OurTeamHero;