import "./experienceSection.css";
import {
  MessageCircle,
  Camera,
 Images,
  Download,
  Award,
  Users,
  CalendarDays,
  Star
} from "lucide-react";

const experienceSteps = [
  {
    icon: <MessageCircle size={28} strokeWidth={1.5} />,
    number: "01",
    title: "DISCOVER",
    description:
      "Tell us your story, vision and the moments you want to preserve. We'll plan every detail together.",
  },
  {
    icon: <Camera size={28} strokeWidth={1.5} />,
    number: "02",
    title: "CAPTURE",
    description:
      "Relax and enjoy the experience while we document genuine emotions with timeless imagery.",
  },
  {
    icon: <Images size={28} strokeWidth={1.5} />,
    number: "03",
    title: "EDIT",
    description:
      "Every photograph is individually refined with our signature editing style for a consistent gallery.",
  },
  {
    icon: <Download size={28} strokeWidth={1.5} />,
    number: "04",
    title: "DELIVER",
    description:
      "Receive a beautifully organized online gallery ready for downloading, sharing and printing.",
  },
];

const ExperienceSection = () => {
  return (
    <>
      <section className="experience">

        <span className="section-tag">
          THE EXPERIENCE
        </span>

        <h2>
          A Simple, Meaningful Process
        </h2>

        <div className="experience-line"></div>

        <div className="experience-grid">
          {experienceSteps.map((item, index) => (
            <div className="experience-card" key={index}>

              <div className="experience-icon">
                {item.icon}
              </div>

              <h3>
                {item.number}. {item.title}
              </h3>

              <p>{item.description}</p>

            </div>
          ))}
        </div>
      </section>


    </>
  );
};

export default ExperienceSection;