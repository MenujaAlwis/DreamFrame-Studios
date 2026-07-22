import { useEffect, useRef, useState } from 'react';

import missionImage1 from '../assets/mission1.1.png';
import missionImage2 from '../assets/mission2.1.png';
import missionImage3 from '../assets/mission3.1.png';
import missionImage4 from '../assets/mission4.1.png';

import './Mission.css';

const Mission = () => {
  const missionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (missionRef.current) {
      observer.observe(missionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={missionRef} className="mission-section">

      <div className="mission-container">

        <p className={`mission-text mission-text-first ${isVisible ? 'show' : ''}`}>
          We don't just take photos — we preserve emotions, stories, and moments that can never be repeated.
        </p>

        <div className={`mission-image-container ${isVisible ? 'show' : ''}`}>
          <img src={missionImage1} alt="Mission 1" style={{ '--img-delay': '0.1s' }} />
          <img src={missionImage2} alt="Mission 2" style={{ '--img-delay': '0.22s' }} />
          <img src={missionImage3} alt="Mission 3" style={{ '--img-delay': '0.34s' }} />
          <img src={missionImage4} alt="Mission 4" style={{ '--img-delay': '0.46s' }} />
        </div>

        <p className={`mission-text mission-text-second ${isVisible ? 'show delay' : ''}`}>
          From weddings to graduations, birthdays to family gatherings, we turn your memories into timeless visual art.
        </p>

      </div>

    </div>
  );
};

export default Mission;