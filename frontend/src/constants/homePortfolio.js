import {
  FaRing,
  FaCamera,
  FaUser,
  FaCalendarDays,
  FaBriefcase,
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
    description: "Capturing every heartfelt moment, from vows to celebrations, with timeless elegance.",
    icon: FaRing,
  },
  {
    title: "Pre Shoot",
    category: "pre-shoot",
    image: preshoot,
    description: "Romantic and creative sessions that tell your unique love story before the big day.",
    icon: FaCamera,
  },
  {
    title: "Portraits",
    category: "portrait",
    image: portrait,
    description: "Natural portraits that highlight your personality with authentic style and emotion.",
    icon: FaUser,
  },
  {
    title: "Events",
    category: "event",
    image: event,
    description: "Professional coverage of celebrations, corporate functions, and unforgettable occasions.",
    icon: FaCalendarDays,
  },
  {
    title: "Commercial",
    category: "commercial",
    image: commercial,
    description: "High-quality visuals crafted to showcase your brand, products, and business identity.",
    icon: FaBriefcase,
  },
];