import { useEffect, useRef, useState } from 'react';
import { OUR_TEAM } from '../constants/ourteam';
import './OurTeamGrid.css';

const OurTeamGrid = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="team-section">
      <div className={`team-intro ${isVisible ? 'show' : ''}`}>
        <p>Meet the creatives behind every captured moment</p>
      </div>

      <div className={`team-masonry ${isVisible ? 'show' : ''}`}>
        {OUR_TEAM.map((member, index) => (
          <div
            key={member.name}
            className={`team-card ${isVisible ? 'show' : ''}`}
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            <div className="image-wrapper">
              <img src={member.image} alt={member.name} />

              <div className="team-overlay">
                <p className="team-role">{member.role}</p>
                <p className="team-name">{member.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeamGrid;