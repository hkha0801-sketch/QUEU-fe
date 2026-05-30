import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockOpponent, mockProblem, mockPlayer } from "../data/soloMock";
import CodeEditor from "../components/CodeEditor";
import ProblemPanel from "../components/ProblemPanel";
import TestCasePanel from "../components/TestCasePanel";

const INITIAL_TIME = 15 * 60 + 57; // 15:57

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const LANGUAGES = ["JavaScript", "Python", "Java", "C++", "TypeScript"];

const SoloEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();

  const [code, setCode] = useState(mockProblem.starterCode);
  const [language, setLanguage] = useState("JavaScript");
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRun = () => {
    console.log("Running code:", code);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Simulate submit
      await new Promise((res) => setTimeout(res, 1500));
      navigate(`/solo/result/${sessionId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="solo-editor-page">
      {/* Header */}
      <div className="solo-editor-header">
        <span style={{ fontSize: "1rem" }}>⚔️</span>
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>ARYA's mock interview</span>
        <button
          style={{
            marginLeft: "0.5rem",
            padding: "0.2rem 0.75rem",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            background: "white",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          Problem List
        </button>
        <button
          style={{
            padding: "0.2rem 0.5rem",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: "#888",
          }}
          aria-label="Previous problem"
        >
          ‹
        </button>
        <button
          style={{
            padding: "0.2rem 0.5rem",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: "#888",
          }}
          aria-label="Next problem"
        >
          ›
        </button>

        <div style={{ flex: 1 }} />

        <button
          style={{
            padding: "0.2rem 0.75rem",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            background: "white",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          Share screen
        </button>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "0.2rem 0.5rem",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
          aria-label="Select language"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          style={{
            padding: "0.2rem 0.5rem",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: "#888",
          }}
          aria-label="Settings"
        >
          ⚙️
        </button>
      </div>

      {/* Body */}
      <div className="solo-editor-body">
        {/* Left: Problem panel */}
        <div className="solo-problem-panel">
          {/* Opponent info + timer */}
          <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid #e8e8e8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Thông tin đối thủ</span>
              <span className="solo-timer">Thời gian: {formatTime(timeLeft)}</span>
            </div>

            <div className="opponent-status-card">
              <img
                src={mockOpponent.avatar}
                alt={mockOpponent.name}
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{mockOpponent.name}</div>
                <div style={{ fontSize: "0.75rem", color: "#888" }}>Trạng thái: Chưa nộp</div>
              </div>
              <div className="opponent-progress">
                <span className="zero">0%</span>
                <span style={{ color: "#ccc", margin: "0 0.25rem" }}>|</span>
                <span className="hundred">100%</span>
              </div>
            </div>
          </div>

          {/* Problem description */}
          <ProblemPanel problem={mockProblem} />
        </div>

        {/* Right: Code panel */}
        <div className="solo-code-panel">
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.4rem 1rem",
              borderBottom: "1px solid #333",
              background: "#1e1e2e",
            }}
          >
            <span
              style={{
                padding: "0.2rem 0.75rem",
                background: "#2a2a3e",
                borderRadius: "4px 4px 0 0",
                fontSize: "0.8rem",
                color: "#cdd6f4",
              }}
            >
              solution.{language === "JavaScript" ? "js" : language === "Python" ? "py" : language === "Java" ? "java" : language === "TypeScript" ? "ts" : "cpp"}
            </span>
          </div>

          {/* Code editor */}
          <div style={{ flex: 1, overflow: "auto" }}>
            <CodeEditor code={code} onChange={setCode} language={language} />
          </div>

          {/* Bottom panel */}
          <div className="solo-bottom-panel">
            <TestCasePanel
              problem={mockProblem}
              activeTestCase={activeTestCase}
              onSelectTestCase={setActiveTestCase}
              onRun={handleRun}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoloEditorPage;
