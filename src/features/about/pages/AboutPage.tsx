import React from "react";
import { FaCode, FaTrophy, FaRobot, FaUsers, FaBolt, FaGithub, FaEnvelope } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

// ─── Static data ──────────────────────────────────────────────────────────────

const STATS = [
  { label: "Problems", value: "1,200+", icon: <FaCode /> },
  { label: "Users", value: "50,000+", icon: <FaUsers /> },
  { label: "Contests held", value: "340+", icon: <FaTrophy /> },
  { label: "Submissions", value: "2M+", icon: <FaBolt /> },
];

const FEATURES = [
  {
    icon: <FaCode />,
    title: "Code Editor",
    desc: "Monaco-powered editor with syntax highlighting, auto-complete, and multi-language support.",
  },
  {
    icon: <FaTrophy />,
    title: "Contests",
    desc: "Weekly and monthly contests with real-time scoreboard and prize pools.",
  },
  {
    icon: <FaRobot />,
    title: "Arya AI",
    desc: "AI-powered mentor that gives DSA roadmaps and personalized feedback on your submissions.",
  },
  {
    icon: <MdSchool />,
    title: "Mock Interview",
    desc: "Simulate real-world technical interviews with curated problem sets and time pressure.",
  },
  {
    icon: <FaUsers />,
    title: "1v1 Matchmaking",
    desc: "Real-time ELO-based matchmaking for competitive coding duels against players worldwide.",
  },
  {
    icon: <FaBolt />,
    title: "Instant Judge",
    desc: "Submissions are evaluated in seconds using our distributed Judge0-powered infrastructure.",
  },
];

const TEAM = [
  {
    name: "Minh Anh",
    role: "Founder & Backend",
    avatar: "https://ui-avatars.com/api/?name=Minh+Anh&background=f97316&color=fff&size=80",
    github: "https://github.com",
  },
  {
    name: "Ngọc Hân",
    role: "Frontend Lead",
    avatar: "https://ui-avatars.com/api/?name=Ngoc+Han&background=3b82f6&color=fff&size=80",
    github: "https://github.com",
  },
  {
    name: "Đức Khoa",
    role: "AI / DevOps",
    avatar: "https://ui-avatars.com/api/?name=Duc+Khoa&background=10b981&color=fff&size=80",
    github: "https://github.com",
  },
  {
    name: "Bảo Trân",
    role: "UI / UX Design",
    avatar: "https://ui-avatars.com/api/?name=Bao+Tran&background=a855f7&color=fff&size=80",
    github: "https://github.com",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="about-stat-card">
      <div className="about-stat-icon">{icon}</div>
      <div className="about-stat-value">{value}</div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="about-feature-card">
      <div className="about-feature-icon">{icon}</div>
      <h3 className="about-feature-title">{title}</h3>
      <p className="about-feature-desc">{desc}</p>
    </div>
  );
}

function TeamCard({
  name,
  role,
  avatar,
  github,
}: {
  name: string;
  role: string;
  avatar: string;
  github: string;
}) {
  return (
    <div className="about-team-card">
      <img src={avatar} alt={name} className="about-team-avatar" />
      <div className="about-team-name">{name}</div>
      <div className="about-team-role">{role}</div>
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="about-team-github"
        aria-label={`${name} GitHub`}
      >
        <FaGithub />
      </a>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Us,</h1>
          <p className="about-hero-desc">
            QUEU is a modern, fast, and minimalist platform for competitive programming and
            technical interview preparation. Our mission is to provide the best possible
            experience for developers to write, test, and improve their code.
          </p>
          <p className="about-hero-desc">
            Built by developers, for developers — QUEU combines cutting-edge tooling with
            AI-driven mentorship to help you reach your full potential in competitive programming.
          </p>
        </div>

        {/* ── Stats grid ── */}
        <div className="about-stats">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <hr className="about-divider" />

      {/* ── Features ── */}
      <section className="about-features">
        <h2 className="about-section-title">What we offer</h2>
        <p className="about-section-sub">
          Everything you need to become a better programmer — in one place.
        </p>
        <div className="about-features-grid">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      <hr className="about-divider" />

      {/* ── Mission ── */}
      <section className="about-mission">
        <div className="about-mission-text">
          <h2 className="about-section-title">Our Mission</h2>
          <p>
            We believe that anyone, regardless of background, can become a world-class
            programmer with the right tools and environment. QUEU was built to democratize
            access to high-quality competitive programming resources.
          </p>
          <p>
            From beginners solving their first "Two Sum" to grandmasters competing in
            world-class contests — QUEU supports every step of your journey.
          </p>
        </div>
        <div className="about-mission-visual">
          <div className="about-mission-card">
            <div className="about-mission-icon">
              <FaCode />
            </div>
            <div className="about-mission-card-title">Open & Fair</div>
            <div className="about-mission-card-body">
              All problems, editorials, and learning resources are freely accessible.
            </div>
          </div>
          <div className="about-mission-card">
            <div className="about-mission-icon about-mission-icon--blue">
              <FaRobot />
            </div>
            <div className="about-mission-card-title">AI-Powered</div>
            <div className="about-mission-card-body">
              Arya, our AI mentor, gives personalized guidance and instant feedback.
            </div>
          </div>
        </div>
      </section>

      <hr className="about-divider" />

      {/* ── Team ── */}
      <section className="about-team">
        <h2 className="about-section-title">Meet the Team</h2>
        <p className="about-section-sub">
          A small passionate team of engineers and designers from Vietnam 🇻🇳
        </p>
        <div className="about-team-grid">
          {TEAM.map((m) => (
            <TeamCard key={m.name} {...m} />
          ))}
        </div>
      </section>

      <hr className="about-divider" />

      {/* ── Contact ── */}
      <section className="about-contact">
        <h2 className="about-section-title">Get in Touch</h2>
        <p className="about-section-sub">
          Have questions, suggestions, or want to contribute?
        </p>
        <div className="about-contact-links">
          <a
            href="mailto:contact@queu.dev"
            className="about-contact-btn"
            aria-label="Email us"
          >
            <FaEnvelope /> contact@queu.dev
          </a>
          <a
            href="https://github.com/queu-dev"
            target="_blank"
            rel="noreferrer"
            className="about-contact-btn about-contact-btn--gh"
            aria-label="GitHub"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
