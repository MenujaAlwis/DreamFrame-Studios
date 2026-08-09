import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../assets/header-logo.png";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/our-team", label: "Our Team" },
  { to: "/contact-us", label: "Contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledPastScreen, setScrolledPastScreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    lastScrollY.current = root.scrollTop;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = root.scrollTop;
      const screenHeight = window.innerHeight;
      const pastScreen = currentScrollY > screenHeight;

      setScrolledPastScreen(pastScreen);

      if (currentScrollY < 80) {
        setHidden(false);
      } else if (pastScreen) {
        setHidden(false); 
      } else {
        setHidden(true); 
      }

      lastScrollY.current = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    updateHeader();
    return () => root.removeEventListener("scroll", onScroll);
  }, []);

  const headerClasses = [
    "site-header",
    scrolledPastScreen ? "scrolled" : "",
    hidden && !menuOpen ? "hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleWheel = (e) => {
    if (menuOpen) return;
    const root = document.getElementById("root");
    if (root) {
      root.scrollTop += e.deltaY;
    }
  };

  return (
    <header className={headerClasses} onWheel={handleWheel}>
      <div className="header-content">

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="menu-toggle-lines">
            <span className="menu-line" />
            <span className="menu-line" />
            <span className="menu-line" />
          </span>
          <span className="menu-toggle-label">Menu</span>
        </button>

        <div className="brand-logo">
          <img src={logo} alt="DreamFrame Studios Logo" />
        </div>

        <div className="header-right">
          <nav className="nav-links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="nav-link"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact-us#inquiry" className="book-session-btn">
            Book a Session
          </Link>
        </div>

      </div>

      <div
        className={`mobile-nav-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <nav
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? "show" : ""}`}
      >
        <button
          className="mobile-nav-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="close-line" />
          <span className="close-line" />
        </button>

        {NAV_ITEMS.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="mobile-nav-link"
            style={{ "--item-delay": `${0.08 + i * 0.06}s` }}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}

        <Link
          to="/contact-us#inquiry"
          className="mobile-book-btn"
          style={{ "--item-delay": `${0.08 + NAV_ITEMS.length * 0.06}s` }}
          onClick={() => setMenuOpen(false)}
        >
          Book a Session
        </Link>
      </nav>
    </header>
  );
};

export default Header;