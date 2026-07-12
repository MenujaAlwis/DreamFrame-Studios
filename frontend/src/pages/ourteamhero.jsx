import { useEffect, useRef, useState } from 'react';
import './ourteamhero.css';
import bg from '../assets/ourteamhero4.png';

const team = [
  {
    name: 'Emma Williams',
    role: 'Lead Photographer',
    position: { top: '35%', left: '17%' }
  },
  {
    name: 'Sarah Johnson',
    role: 'Assistant Photographer',
    position: { top: '60%', left: '32%' }
  },
  {
    name: 'David Brown',
    role: 'Studio Manager',
    position: { top: '40%', left: '42%' }
  },
  {
    name: 'Sophia Miller',
    role: 'Creative Director',
    position: { top: '44%', left: '52%' }
  },
  {
    name: 'Mia Patinson',
    role: 'Sales Associate',
    position: { top: '35%', left: '68%' }
  },
  {
    name: 'James Wilson',
    role: 'Videographer',
    position: { top: '60%', left: '80%' }
  },
  {
    name: 'Olivia Smith',
    role: 'Photo Editor',
    position: { top: '40%', left: '85%' }
  }
];

const OurTeamHero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

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

  const open = (index) => setActiveIndex(index);
  const close = (index) =>
    setActiveIndex((current) => (current === index ? null : current));
  const toggle = (index) =>
    setActiveIndex((current) => (current === index ? null : index));

  return (
    <div ref={heroRef} className={`ourteam-hero ${isVisible ? 'show' : ''}`}>
      <div
        className="ourteam-hero-bg"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="ourteam-hero-content">
        <p className="ourteam-eyebrow">The People Behind DreamFrame</p>
        <h1 className="ourteam-title">Behind the lens</h1>
      </div>

      {team.map((person, index) => {
        const isOpen = activeIndex === index;
        return (
          <button
            key={person.name}
            type="button"
            className={`person-marker ${isOpen ? 'is-open' : ''}`}
            style={{
              top: person.position.top,
              left: person.position.left,
              transitionDelay: `${0.6 + index * 0.09}s`
            }}
            onMouseEnter={() => open(index)}
            onMouseLeave={() => close(index)}
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