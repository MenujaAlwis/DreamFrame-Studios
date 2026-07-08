import {
  FaRing,
  FaCamera,
  FaUser,
  FaCalendarDays,
  FaVideo,
  FaBorderAll,
} from "react-icons/fa6";

export const CATEGORIES = [
  { value: '', label: 'All', icon: FaBorderAll },
  { value: 'wedding', label: 'Wedding', icon: FaRing },
  { value: 'pre-shoot', label: 'Pre-shoot', icon: FaCamera },
  { value: 'portrait', label: 'Portrait', icon: FaUser },
  { value: 'event', label: 'Event', icon: FaCalendarDays },
  { value: 'commercial', label: 'Commercial', icon: FaVideo }
];