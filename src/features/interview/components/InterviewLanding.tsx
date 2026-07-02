import React from "react";

interface PastInterview {
  id: number;
  name: string;
  date: string;
  score: string;
  result: "strong-hire" | "hire" | "no-hire";
}

const MOCK_PAST_INTERVIEWS: PastInterview[] = [
  { id: 3, name: "Nvidia", date: "Mar 10, 2024", score: "65/ 100", result: "hire" },
  { id: 2, name: "Meta", date: "Nov 3, 2024", score: "70/ 100", result: "hire" },
  { id: 1, name: "Google", date: "Mar 2, 2024", score: "50/ 100", result: "no-hire" },
];

const RESULT_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  "strong-hire": { label: "Strong Hire", color: "#16a34a", bg: "#f0fdf4" },
  "hire": { label: "Hire", color: "#2563eb", bg: "#eff6ff" },
  "no-hire": { label: "No Hire", color: "#dc2626", bg: "#fef2f2" },
};

interface Props {
  onStartNow: () => void;
  onSchedule?: () => void;
  onChatWithArya?: () => void;
}

const InterviewLanding: React.FC<Props> = ({ onStartNow, onSchedule, onChatWithArya }) => {
  return (
    <div className="ai-interview-page">
      {/* Header */}
      <div className="ai-interview-header">
        <div className="ai-interview-header-left">
          <h1 className="ai-interview-title">Interview with Arya</h1>
          <p className="ai-interview-subtitle">
            Ready to meet our best and hardest examiner for your Interview
          </p>
        </div>
        <button className="ai-interview-chat-btn" onClick={onChatWithArya}>
          Chat với Arya
        </button>
      </div>

      {/* Active & Upcoming */}
      <section className="ai-interview-section">
        <h2 className="ai-interview-section-title">Active &amp; Upcoming</h2>
        <div className="ai-interview-cards">
          {/* Start Now Card */}
          <div className="ai-interview-card">
            <div className="ai-interview-card-icon">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="#6366f1" strokeWidth="2" />
                <polygon points="18,15 32,22 18,29" fill="#6366f1" />
              </svg>
            </div>
            <div className="ai-interview-card-name">Bắt đầu nhanh</div>
            <div className="ai-interview-card-desc">Kéo dài 1–2 tiếng</div>
            <button className="ai-interview-start-btn" onClick={onStartNow}>
              Bắt đầu 1 cuộc phỏng vấn với Arya ngay bây giờ
            </button>
          </div>

          {/* Schedule Card */}
          <div className="ai-interview-card ai-interview-card--schedule">
            <div className="ai-interview-card-icon">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="#9ca3af" strokeWidth="2" />
                <circle cx="22" cy="22" r="8" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="22" y1="14" x2="22" y2="22" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="22" y1="22" x2="27" y2="25" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="ai-interview-card-name ai-interview-card-name--muted">Hẹn lịch</div>
            <div className="ai-interview-card-desc ai-interview-card-desc--muted">
              Lịch tiếp theo của bạn: 2 ngày nữa
            </div>
            <button className="ai-interview-schedule-btn" onClick={onSchedule}>
              Lên lịch buổi phỏng vấn tiếp theo
            </button>
          </div>
        </div>
      </section>

      {/* Past Interviews */}
      <section className="ai-interview-section">
        <h2 className="ai-interview-section-title">Past Interviews</h2>
        <div className="ai-interview-table-wrapper">
          <table className="ai-interview-table">
            <thead>
              <tr>
                <th>Interview</th>
                <th>Date</th>
                <th>Score</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PAST_INTERVIEWS.map((item) => {
                const badge = RESULT_BADGE[item.result];
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.id} – {item.name}</td>
                    <td>{item.date}</td>
                    <td style={{ fontWeight: 700 }}>{item.score}</td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.15rem 0.65rem",
                          borderRadius: "99px",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          background: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default InterviewLanding;
