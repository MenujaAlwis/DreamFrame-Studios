import { useEffect, useRef, useState } from "react";
import "./awardsSection.css";
import image1 from "../assets/awards/awards1.png";
import image2 from "../assets/awards/awards2.png";
import image3 from "../assets/awards/awards3.png";

const awards = [
  {
    image: image1,
    title: "Best Wedding Photography 2024",
    description:
      "Recognized for excellence in storytelling and artistic wedding photography.",
  },
  {
    image: image2,
    title: "Sri Lanka Photography Awards",
    description:
      "Honoured for creating timeless visual narratives and exceptional client experiences.",
  },
  {
    image: image3,
    title: "People's Choice Award",
    description:
      "Voted by clients for creativity, professionalism, and memorable photography.",
  },
];

const AwardsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`awards-section ${isVisible ? "show" : ""}`}
      ref={sectionRef}
    >

      <span className="section-tag">
        OUR RECOGNITION
      </span>

      <h2 className="awards-title">
        Celebrating Moments of Excellence
      </h2>

      <div className="awards-gallery">

        {awards.map((award, index) => (
          <div
            className="award-item"
            key={index}
            style={{ "--award-delay": `${0.15 + index * 0.15}s` }}
          >

            <div className="award-image-wrapper">
              <img
                src={award.image}
                alt={award.title}
                className="award-image"
              />
              <div className="award-badge">Award</div>
            </div>

            <div className="award-content">

              <h3>{award.title}</h3>

              <p>{award.description}</p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default AwardsSection;