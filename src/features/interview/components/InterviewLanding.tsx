import React from "react";

interface PastInterview {
  id: number;
  name: string;
  date: string;
  score: string;
}

// TODO: thay bằng API call thực tế
const MOCK_PAST_INTERVIEWS: PastInterview[] = [
  { id: 3, name: "3 - Nvidia", date: "Mar 10, 2024", score: "65/ 100" },
  { id: 1, name: "1 - Google", date: "Mar 2, 2024", score: "50/ 100" },
];

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
          <h1 className="ai-interview-title">Interview with Arya!</h1>
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
                <circle cx="22" cy="22" r="20" stroke="#1a1a2e" strokeWidth="2" />
                <text x="22" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a1a2e" fontFamily="sans-serif">NOW</text>
              </svg>
            </div>
            <div className="ai-interview-card-name">Bắt đầu nhanh</div>
            <div className="ai-interview-card-desc">Kéo dài 1-2 tiếng</div>
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
              Lên lịch cho buổi phỏng vấn tiếp theo
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
              </tr>
            </thead>
            <tbody>
              {MOCK_PAST_INTERVIEWS.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default InterviewLanding;