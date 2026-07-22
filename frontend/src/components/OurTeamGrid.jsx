import { useEffect, useRef, useState, useCallback } from 'react';
import { OUR_TEAM } from '../constants/OurTeam';
import './OurTeamGrid.css';

const OurTeamGrid = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const total = OUR_TEAM.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goPrev = useCallback(() => {
    setDirection('prev');
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setDirection('next');
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  // Arrow-key navigation while the section is in view
  useEffect(() => {
    const handleKey = (e) => {
      if (!isVisible) return;
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext, isVisible]);

  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const selectIndex = (index) => {
    setDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} className="team-section">
      <div className={`team-intro ${isVisible ? 'show' : ''}`}>
        <p>Meet the creatives behind every captured moment</p>
      </div>

      <div className={`team-carousel ${isVisible ? 'show' : ''}`}>
        <button className="team-arrow team-arrow-left" onClick={goPrev} aria-label="Previous team member">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 5L8 12L15 19" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="team-stage">
          {OUR_TEAM.map((member, index) => {
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            if (absOffset > 2) return null;

            return (
              <div
                key={member.name}
                className={`team-slide ${isActive ? 'is-active' : ''}`}
                data-abs={absOffset}
                style={{ '--offset': offset }}
                onClick={() => !isActive && selectIndex(index)}
              >
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} />

                  {!isActive && (
                    <div className="team-slide-overlay">
                      <p className="team-slide-name">{member.name}</p>
                    </div>
                  )}
                </div>

                {isActive && (
                  <div className={`team-active-info anim-${direction}`} key={member.name}>
                    <p className="team-active-role">{member.role}</p>
                    <p className="team-active-name">{member.name}</p>
                    {member.specialty && (
                      <p className="team-active-specialty">{member.specialty}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className="team-arrow team-arrow-right" onClick={goNext} aria-label="Next team member">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5L16 12L9 19" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="team-dots">
        {OUR_TEAM.map((member, index) => (
          <button
            key={member.name}
            className={`team-dot ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => selectIndex(index)}
            aria-label={`Go to ${member.name}`}
          />
        ))}
      </div>
    </section>
  );
};

export default OurTeamGrid;