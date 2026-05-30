import React from "react";
import { MatchStatus } from "../types/solo.types";

interface MatchCenterProps {
  status: MatchStatus;
  rankLabel: string;
  rankValue: string;
  onStart: () => void;
}

const MatchCenter: React.FC<MatchCenterProps> = ({ status, rankLabel, rankValue, onStart }) => {
  const isFound = status === "found";

  return (
    <div className="matchmaking-center">
      <div className="matchmaking-circle">
        {/* Crossed swords icon */}
        <span style={{ fontSize: "2rem" }}>⚔️</span>
        <div className="matchmaking-rank-label">{rankLabel}</div>
        <div className="matchmaking-rank-value">{rankValue}</div>
      </div>

      {isFound ? (
        <button className="matchmaking-start-btn" onClick={onStart}>
          Bắt đầu
        </button>
      ) : (
        <span className="matchmaking-status-badge searching">ĐANG TÌM TRẬN...</span>
      )}
    </div>
  );
};

export default MatchCenter;
