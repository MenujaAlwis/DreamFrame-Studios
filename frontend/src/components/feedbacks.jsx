import { useEffect, useState } from 'react';
import './feedbacks.css';

const feedbacks = [
  {
    text: "Every moment was captured beautifully. We couldn’t have asked for more. The attention to detail and creativity exceeded our expectations.",
    name: "Wedding Client"
  },
  {
    text: "The photos brought tears to our eyes. It felt like reliving the entire day again with so much emotion and clarity.",
    name: "Family Session"
  },
  {
    text: "Professional, creative, and extremely talented team. They made our graduation shoot feel very special and memorable.",
    name: "Graduation Client"
  },
  {
    text: "From start to finish, everything was perfect. The team knows exactly how to capture natural and emotional moments.",
    name: "Birthday Shoot"
  }
];

const Feedbacks = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % feedbacks.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feedbacks-section">
      <h2 className="feedbacks-title">What Our Clients Say</h2>

      <div className="feedback-card">
        <p className="feedback-text">
          “{feedbacks[index].text}”
        </p>

        <p className="feedback-name">
          — {feedbacks[index].name}
        </p>
      </div>
    </div>
  );
};

export default Feedbacks;