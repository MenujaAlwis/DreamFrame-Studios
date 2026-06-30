import { useState } from 'react';
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
        text: "A beautiful first birthday shoot capturing every precious smile and moment we’ll cherish forever. The attention to detail made it truly special for our family.",
        name: "Sarah Mitchell",
        bg: feedbackimg3
    },
    {
        text: "Every moment was captured beautifully. We couldn’t have asked for more. The attention to detail and creativity exceeded our expectations.",
        name: "Olivia Bennett",
        bg: feedbackimg4
    },
    
];

const Feedbacks = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  return (
    <section className="feedbacks-wrapper">
      <h2 className="feedbacks-title">What Our Clients Say</h2>
      <div className={`feedbacks-section slide-${index}`}
        style={{ backgroundImage: `url(${feedbacks[index].bg})` }}
      >
        <button className="arrow left" onClick={prevSlide}>❮</button>

        <div key={index} className="feedback-card animate">
          <p className="feedback-text">
            “{feedbacks[index].text}”
          </p>

          <p className="feedback-name">
            — {feedbacks[index].name}
          </p>
        </div>

        <button className="arrow right" onClick={nextSlide}>❯</button>
      </div>
    </section>
  );
};

export default Feedbacks;