import {
  FaRing,
  FaCamera,
  FaUser,
  FaCalendarDays,
  FaVideo ,
} from "react-icons/fa6";

import wedding from "../assets/homepage-portfolio/portfolio-wedding.png";
import preshoot from "../assets/homepage-portfolio/portfolio-preshoot.png";
import portrait from "../assets/homepage-portfolio/portfolio-portrait.png";
import event from "../assets/homepage-portfolio/portfolio-event.png";
import commercial from "../assets/homepage-portfolio/portfolio-commercial.png";

export const HOME_PORTFOLIO = [
  {
    title: "Weddings",
    category: "wedding",
    image: wedding,
    description: "Timeless love stories beautifully captured.",
    icon: FaRing,
  },
  {
    title: "Pre Shoot",
    category: "pre-shoot",
    image: preshoot,
    description: "Romantic moments captured with elegance.",
    icon: FaCamera,
  },
  {
    title: "Portraits",
    category: "portrait",
    image: portrait,
    description: "Natural authentic portraits that feels like you.",
    icon: FaUser,
  },
  {
    title: "Events",
    category: "event",
    image: event,
    description: "Every celebration captured with care.",
    icon: FaCalendarDays,
  },
  {
    title: "Commercial",
    category: "commercial",
    image: commercial,
    description: "Professional visuals for your brand.",
    icon: FaVideo ,
  },
];