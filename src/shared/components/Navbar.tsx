import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import {
  FaBell, FaFire, FaCog,
  FaSlidersH, FaQuestionCircle, FaMoon, FaArrowUp, FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { id: 1, label: "Problems", url: "/problems" },
  { id: 2, label: "Contests", url: "/contests" },
  { id: 3, label: "Submissions", url: "/submissions" },
  { id: 4, label: "Ranking", url: "/ranking" },
  { id: 5, label: "About", url: "/about" },
  { id: 6, label: "Report", url: "/report" },
];

// Mock streak data — thay bằng real data khi có API
const STREAK_DAYS = 67;
const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
// true = đã có streak hôm đó, false = chưa (Fr, Sa, Su chưa)
const WEEK_STATUS = [true, true, true, true, false, false, false];

// Mock user — thay bằng real data khi có API
const MOCK_USER = {
  name: "Anh Khôi",
  email: "255200000@gm.edu.vn",
  avatar: "/shidoon-blue-icon.jpg",
  plan: "FREE",
};

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [streakOpen, setStreakOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const streakRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(streakRef, () => setStreakOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-logo">
        <img src={logo} alt="QUEU" />
      </NavLink>

      <nav className="navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.url}
            className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-actions">
        {/* Bell */}
        <button className="navbar-icon-btn" aria-label="Notifications">
          <FaBell />
        </button>

        {/* Streak dropdown */}
        <div className="navbar-dropdown-wrap" ref={streakRef}>
          <button
            className="navbar-streak"
            onClick={() => { setStreakOpen((o) => !o); setProfileOpen(false); }}
            aria-label="Streak"
          >
            <FaFire className="streak-icon" />
            <span>{STREAK_DAYS}</span>
          </button>

          {streakOpen && (
            <div className="dropdown streak-dropdown">
              <div className="streak-week">
                {WEEK_DAYS.map((day, i) => (
                  <div key={day} className="streak-day-col">
                    <span className="streak-day-label">{day}</span>
                    <div className={`streak-day-circle${WEEK_STATUS[i] ? " active" : ""}`}>
                      {WEEK_STATUS[i] ? <FaFire /> : ""}
                    </div>
                  </div>
                ))}
              </div>
              <div className="streak-footer">
                <span className="streak-total">
                  <FaFire className="streak-icon" /> {STREAK_DAYS} days
                </span>
                <div className="streak-badges">
                  <span className="streak-badge"><FaFire /></span>
                  <span className="streak-badge"><FaFire /></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button className="navbar-icon-btn" aria-label="Settings">
          <FaCog />
        </button>

        {/* Avatar + profile dropdown */}
        <div className="navbar-dropdown-wrap" ref={profileRef}>
          <button
            className="navbar-avatar-btn"
            onClick={() => { setProfileOpen((o) => !o); setStreakOpen(false); }}
            aria-label="Profile"
          >
            <img src={MOCK_USER.avatar} alt="avatar" />
          </button>

          {profileOpen && (
            <div className="dropdown profile-dropdown">
              {/* User info */}
              <div className="profile-info">
                <img src={MOCK_USER.avatar} alt="avatar" className="profile-avatar" />
                <div>
                  <div className="profile-name">
                    {MOCK_USER.name}
                    <span className="profile-plan">{MOCK_USER.plan}</span>
                  </div>
                  <div className="profile-email">{MOCK_USER.email}</div>
                </div>
              </div>

              <hr className="dropdown-divider" />

              <button className="dropdown-item" onClick={() => { navigate("/profile"); setProfileOpen(false); }}>
                <FaSlidersH /> Profile Settings
              </button>
              <button className="dropdown-item">
                <FaQuestionCircle /> Help Center
              </button>
              <button className="dropdown-item">
                <FaMoon /> Dark Mode
              </button>
              <button className="dropdown-item">
                <FaArrowUp /> Upgrade Plan
              </button>

              <hr className="dropdown-divider" />

              <button
                className="dropdown-item dropdown-item-danger"
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  setProfileOpen(false);
                  navigate("/login");
                }}
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
