import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MatchResult } from "../types/solo.types";

// For demo purposes, we'll show a win result
const DEMO_RESULT: MatchResult = "win";
const DEMO_ELO_CHANGE = +25;

const resultConfig: Record<MatchResult, { label: string; color: string; emoji: string }> = {
  win: { label: "THẮNG", color: "#16a34a", emoji: "🏆" },
  lose: { label: "THUA", color: "#dc2626", emoji: "💔" },
  draw: { label: "HÒA", color: "#6b7280", emoji: "🤝" },
};

const SoloResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const result = DEMO_RESULT;
  const eloChange = DEMO_ELO_CHANGE;
  const config = resultConfig[result];

  console.log("Session result for:", sessionId);

  return (
    <div className="solo-result-page">
      <div style={{ fontSize: "4rem" }}>{config.emoji}</div>

      <div className="result-badge" style={{ color: config.color }}>
        {config.label}
      </div>

      <div
        className="result-elo-change"
        style={{ color: eloChange >= 0 ? "#16a34a" : "#dc2626" }}
      >
        ELO: {eloChange >= 0 ? "+" : ""}{eloChange}
      </div>

      <div style={{ fontSize: "0.875rem", color: "#888" }}>
        ELO mới: <strong style={{ color: "#333" }}>1675</strong>
      </div>

      <div className="result-actions">
        <button
          onClick={() => navigate("/solo/matchmaking?mode=rank")}
          style={{
            padding: "0.75rem 1.75rem",
            background: "#1a2340",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Chơi lại
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.75rem 1.75rem",
            background: "white",
            color: "#333",
            border: "1.5px solid #e0e0e0",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default SoloResultPage;
