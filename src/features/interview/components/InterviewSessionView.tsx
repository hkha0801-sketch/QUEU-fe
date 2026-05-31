import React, { useState, useRef, useEffect } from "react";
import { InterviewSession } from "../types/interview.types";

interface Props {
  session: InterviewSession;
  onSubmitAnswer: (answer: string) => void;
  isLoading: boolean;
  error: string | null;
}

const TOPIC_LABELS: Record<string, string> = {
  algorithms: "Algorithms",
  "data-structures": "Data Structures",
  "system-design": "System Design",
  behavioral: "Behavioral",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
};

const InterviewSessionView: React.FC<Props> = ({ session, onSubmitAnswer, isLoading, error }) => {
  const [answer, setAnswer] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - session.startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [session.startTime]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.messages]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleSubmit = () => {
    if (!answer.trim() || isLoading) return;
    onSubmitAnswer(answer.trim());
    setAnswer("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const progress = Math.min((session.currentQuestionIndex / session.config.numQuestions) * 100, 100);
  const diffColor = session.config.difficulty === "easy" ? "#16a34a" : session.config.difficulty === "medium" ? "#d97706" : "#dc2626";

  return (
    <div className="interview-session">
      <div className="interview-session-topbar">
        <div className="interview-session-info">
          <span className="interview-session-topic">{TOPIC_LABELS[session.config.topic]}</span>
          <span className="interview-session-diff" style={{ color: diffColor }}>{session.config.difficulty.toUpperCase()}</span>
        </div>
        <div className="interview-session-progress-wrap">
          <div className="interview-session-progress-bar">
            <div className="interview-session-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="interview-session-progress-text">{session.currentQuestionIndex}/{session.config.numQuestions} cau</span>
        </div>
        <div className="interview-session-timer">⏱ {fmt(elapsed)}</div>
      </div>

      <div className="interview-messages">
        {session.messages.map((msg) => (
          <div key={msg.id} className={`interview-message interview-message--${msg.role}`}>
            <div className="interview-message-avatar">{msg.role === "interviewer" ? "🤖" : "👤"}</div>
            <div className="interview-message-bubble">
              <div className="interview-message-sender">{msg.role === "interviewer" ? "Arya" : "Ban"}</div>
              <div className="interview-message-text">{msg.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="interview-message interview-message--interviewer">
            <div className="interview-message-avatar">🤖</div>
            <div className="interview-message-bubble">
              <div className="interview-message-sender">Arya</div>
              <div className="interview-typing"><span /><span /><span /></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!session.isCompleted && (
        <div className="interview-input-area">
          {error && <div className="interview-error">{error}</div>}
          <div className="interview-input-row">
            <textarea
              className="interview-textarea"
              placeholder="Nhap cau tra loi... (Ctrl+Enter de gui)"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKey}
              disabled={isLoading}
              rows={4}
            />
            <button className="interview-send-btn" onClick={handleSubmit} disabled={isLoading || !answer.trim()}>
              Gui ↑
            </button>
          </div>
          <div className="interview-input-hint">Ctrl + Enter de gui nhanh</div>
        </div>
      )}

      {session.isCompleted && (
        <div className="interview-generating">
          <div className="interview-generating-text">Phong van hoan tat! Dang tao bao cao...</div>
        </div>
      )}
    </div>
  );
};

export default InterviewSessionView;