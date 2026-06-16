import { useState } from 'react';
import './feedbacks.css';

import feedbackimg1 from '../assets/feedbacks1.png';
import feedbackimg2 from '../assets/feedbacks2.png';

const feedbacks = [
    {
        text: "From start to finish, everything was perfect. The team knows exactly how to capture natural and emotional moments.",
        name: "Isabella Moore",
        bg: feedbackimg1
    },
    {
        text: "Every moment was captured beautifully. We couldn’t have asked for more. The attention to detail and creativity exceeded our expectations.",
        name: "Olivia Bennett",
        bg: feedbackimg2
    },
    {
        text: "The photos brought tears to our eyes. It felt like reliving the entire day again with so much emotion and clarity.",
        name: "Family Session",
        bg: feedbackimg2
    },
    {
        text: "Professional, creative, and extremely talented team. They made our graduation shoot feel very special and memorable.",
        name: "Graduation Client",
        bg: feedbackimg1
    }
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
    <div
      className="feedbacks-section"
      style={{ backgroundImage: `url(${feedbacks[index].bg})` }}
    >
      <button className="arrow left" onClick={prevSlide}>❮</button>

      <div className="feedback-card">
        <p className="feedback-text">
          “{feedbacks[index].text}”
        </p>

        <p className="feedback-name">
          — {feedbacks[index].name}
        </p>
      </div>

      <button className="arrow right" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Feedbacks;