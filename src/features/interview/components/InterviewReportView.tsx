import React from "react";
import { InterviewReport } from "../types/interview.types";

interface Props {
  report: InterviewReport;
  onRestart: () => void;
}

const REC: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
  "strong-hire": { label: "Strong Hire", color: "#16a34a", bg: "#f0fdf4", emoji: "🏆" },
  "hire": { label: "Hire", color: "#2563eb", bg: "#eff6ff", emoji: "✅" },
  "no-hire": { label: "No Hire", color: "#dc2626", bg: "#fef2f2", emoji: "❌" },
};

const TOPIC: Record<string, string> = {
  algorithms: "Algorithms", "data-structures": "Data Structures",
  "system-design": "System Design", behavioral: "Behavioral",
  frontend: "Frontend", backend: "Backend", database: "Database",
};

const InterviewReportView: React.FC<Props> = ({ report, onRestart }) => {
  const rec = REC[report.recommendation] || REC["hire"];
  const scoreColor = report.totalScore >= 80 ? "#16a34a" : report.totalScore >= 60 ? "#d97706" : "#dc2626";
  const mins = Math.floor(report.duration / 60);
  const secs = report.duration % 60;

  return (
    <div className="interview-report">
      <div className="interview-report-header">
        <div className="interview-report-title">Bao cao phong van</div>
        <div className="interview-report-meta">
          <span>{TOPIC[report.config.topic]}</span>
          <span>·</span>
          <span style={{ textTransform: "capitalize" }}>{report.config.difficulty}</span>
          <span>·</span>
          <span>{mins}m {secs}s</span>
        </div>
      </div>

      <div className="interview-report-hero">
        <div className="interview-score-circle" style={{ borderColor: scoreColor }}>
          <span className="interview-score-num" style={{ color: scoreColor }}>{report.totalScore}</span>
          <span className="interview-score-label">/ 100</span>
        </div>
        <div className="interview-rec-badge" style={{ color: rec.color, background: rec.bg, border: `1.5px solid ${rec.color}30` }}>
          <span>{rec.emoji}</span>
          <span>{rec.label}</span>
        </div>
        <p className="interview-report-overall">{report.overallFeedback}</p>
      </div>

      {report.skillBreakdown && report.skillBreakdown.length > 0 && (
        <div className="interview-report-section">
          <div className="interview-report-section-title">Phan tich ky nang</div>
          <div className="interview-skills">
            {report.skillBreakdown.map((skill) => {
              const c = skill.score >= 80 ? "#16a34a" : skill.score >= 60 ? "#d97706" : "#dc2626";
              return (
                <div key={skill.label} className="interview-skill-row">
                  <div className="interview-skill-name">{skill.label}</div>
                  <div className="interview-skill-bar-wrap">
                    <div className="interview-skill-bar-fill" style={{ width: `${skill.score}%`, background: c }} />
                  </div>
                  <div className="interview-skill-score" style={{ color: c }}>{skill.score}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {report.evaluations && report.evaluations.length > 0 && (
        <div className="interview-report-section">
          <div className="interview-report-section-title">Danh gia tung cau</div>
          <div className="interview-evals">
            {report.evaluations.map((ev, i) => {
              const c = ev.score >= 8 ? "#16a34a" : ev.score >= 5 ? "#d97706" : "#dc2626";
              return (
                <div key={i} className="interview-eval-card">
                  <div className="interview-eval-header">
                    <span className="interview-eval-q">Cau {i + 1}</span>
                    <span className="interview-eval-score" style={{ color: c }}>{ev.score}/10</span>
                  </div>
                  <div className="interview-eval-question">{ev.question}</div>
                  <div className="interview-eval-feedback">{ev.feedback}</div>
                  {ev.strengths && ev.strengths.length > 0 && (
                    <div className="interview-eval-tags">
                      {ev.strengths.map((s, j) => (
                        <span key={j} className="interview-tag interview-tag--green">✓ {s}</span>
                      ))}
                    </div>
                  )}
                  {ev.improvements && ev.improvements.length > 0 && (
                    <div className="interview-eval-tags">
                      {ev.improvements.map((s, j) => (
                        <span key={j} className="interview-tag interview-tag--orange">↑ {s}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="interview-report-actions">
        <button className="interview-start-btn" onClick={onRestart}>Phong van lai</button>
      </div>
    </div>
  );
};

export default InterviewReportView;