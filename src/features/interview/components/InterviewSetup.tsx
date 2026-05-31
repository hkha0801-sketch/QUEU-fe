import React, { useState } from "react";
import { InterviewConfig, InterviewDifficulty, InterviewTopic } from "../types/interview.types";

interface Props {
  onStart: (config: InterviewConfig) => void;
  isLoading: boolean;
}

const TOPICS: { value: InterviewTopic; label: string; icon: string; desc: string }[] = [
  { value: "algorithms", label: "Algorithms", icon: "⚙️", desc: "Sorting, searching, complexity" },
  { value: "data-structures", label: "Data Structures", icon: "🌲", desc: "Arrays, trees, graphs" },
  { value: "system-design", label: "System Design", icon: "🏗️", desc: "Scalability, architecture" },
  { value: "behavioral", label: "Behavioral", icon: "💬", desc: "Soft skills, experience" },
  { value: "frontend", label: "Frontend", icon: "🎨", desc: "React, CSS, browser APIs" },
  { value: "backend", label: "Backend", icon: "⚡", desc: "APIs, servers, microservices" },
  { value: "database", label: "Database", icon: "🗄️", desc: "SQL, NoSQL, indexing" },
];

const DIFFICULTIES: { value: InterviewDifficulty; label: string; color: string; desc: string }[] = [
  { value: "easy", label: "Easy", color: "#16a34a", desc: "Entry level / Intern" },
  { value: "medium", label: "Medium", color: "#d97706", desc: "Junior / Mid-level" },
  { value: "hard", label: "Hard", color: "#dc2626", desc: "Senior / Staff" },
];

const InterviewSetup: React.FC<Props> = ({ onStart, isLoading }) => {
  const [topic, setTopic] = useState<InterviewTopic>("algorithms");
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>("medium");
  const [numQuestions, setNumQuestions] = useState(3);

  const handleStart = () => {
    onStart({ topic, difficulty, numQuestions, duration: numQuestions * 10 });
  };

  return (
    <div className="interview-setup">
      <div className="interview-setup-header">
        <div className="interview-arya-badge">
          <span>🤖</span>
          <span>Arya AI Interviewer</span>
        </div>
        <h1 className="interview-setup-title">Mock Interview</h1>
        <p className="interview-setup-sub">Luyen phong van voi AI — nhan feedback chi tiet sau moi buoi</p>
      </div>

      <div className="interview-section">
        <div className="interview-section-label">Chu de phong van</div>
        <div className="interview-topic-grid">
          {TOPICS.map((t) => (
            <button
              key={t.value}
              className={`interview-topic-card${topic === t.value ? " selected" : ""}`}
              onClick={() => setTopic(t.value)}
            >
              <span className="interview-topic-icon">{t.icon}</span>
              <span className="interview-topic-name">{t.label}</span>
              <span className="interview-topic-desc">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="interview-section">
        <div className="interview-section-label">Do kho</div>
        <div className="interview-difficulty-row">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              className={`interview-diff-btn${difficulty === d.value ? " selected" : ""}`}
              style={difficulty === d.value ? { borderColor: d.color, color: d.color, background: `${d.color}15` } : {}}
              onClick={() => setDifficulty(d.value)}
            >
              <span className="interview-diff-label">{d.label}</span>
              <span className="interview-diff-desc">{d.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="interview-section">
        <div className="interview-section-label">
          So cau hoi: <span style={{ color: "#f97316", fontWeight: 800 }}>{numQuestions}</span>
        </div>
        <div className="interview-slider-row">
          <span className="interview-slider-bound">1</span>
          <input
            type="range"
            min={1}
            max={8}
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="interview-slider"
          />
          <span className="interview-slider-bound">8</span>
        </div>
        <div className="interview-slider-hint">Uoc tinh ~{numQuestions * 10} phut</div>
      </div>

      <button className="interview-start-btn" onClick={handleStart} disabled={isLoading}>
        {isLoading ? "Dang chuan bi..." : "Bat dau phong van →"}
      </button>
    </div>
  );
};

export default InterviewSetup;