import { useEffect, useRef, useState } from 'react';
import './feedbacks.css';

import feedbackimg1 from '../assets/feedbacks1.png';
import feedbackimg2 from '../assets/feedbacks2.png';
import feedbackimg3 from '../assets/feedbacks3.png';
import feedbackimg4 from '../assets/feedbacks4.png';

const feedbacks = [
    {
        text: "Professional, creative, and extremely talented team. They made our graduation shoot feel very special and memorable. The final results exceeded all our expectations.",
        name: "Sophia Carter",
        bg: feedbackimg1
    },
    {
        text: "From start to finish, everything was perfect. The team knows exactly how to capture natural and emotional moments. The experience was smooth and truly enjoyable.",
        name: "Isabella Moore",
        bg: feedbackimg2
    },
    {
        text: "A beautiful first birthday shoot capturing every precious smile and moment we'll cherish forever. The attention to detail made it truly special for our family.",
        name: "Sarah Mitchell",
        bg: feedbackimg3
    },
    {
        text: "Every moment was captured beautifully. We couldn't have asked for more. The attention to detail and creativity exceeded our expectations.",
        name: "Olivia Bennett",
        bg: feedbackimg4
    },
    
];

const Feedbacks = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const sectionRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setDirection('next');
    setIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  return (
    <section id="feedbacks" className="feedbacks-wrapper" ref={sectionRef}>
      <h2 className={`feedbacks-title ${titleVisible ? 'show' : ''}`}>
        What Our Clients Say
      </h2>
      <div className={`feedbacks-section slide-${index}`}>
        {feedbacks.map((f, i) => (
          <div
            key={i}
            className={`feedbacks-bg ${i === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${f.bg})` }}
          />
        ))}
        <div className="feedbacks-overlay" />

        <button className="arrow left" onClick={prevSlide} aria-label="Previous">
          ❮
        </button>

        <div key={index} className={`feedback-card animate-${direction}`}>
          <p className="feedback-text">
            "{feedbacks[index].text}"
          </p>

          <p className="feedback-name">
            — {feedbacks[index].name}
          </p>
        </div>

        <button className="arrow right" onClick={nextSlide} aria-label="Next">
          ❯
        </button>

        <div className="feedback-dots">
          {feedbacks.map((_, i) => (
            <button
              key={i}
              className={`feedback-dot ${i === index ? 'active' : ''}`}
              onClick={() => {
                setDirection(i > index ? 'next' : 'prev');
                setIndex(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;