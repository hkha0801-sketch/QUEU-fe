import React from "react";
import { MatchHistory } from "../types/solo.types";

interface MatchHistoryListProps {
  history: MatchHistory[];
}

const MatchHistoryList: React.FC<MatchHistoryListProps> = ({ history }) => {
  return (
    <div className="match-history-card" style={{ borderRadius: "14px", padding: "1.25rem", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div className="match-history-header" style={{ marginBottom: "0.75rem" }}>
        <span>LỊCH SỬ ĐẤU</span>
        <span className="match-history-count">{history.length} trận</span>
      </div>

      {history.map((item) => (
        <div key={item.id} className="match-history-item">
          <img
            src={item.opponent.avatar}
            alt={item.opponent.name}
            style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.opponent.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>
              {item.opponent.rank} · {item.date}
            </div>
          </div>
          <span className={`match-result-badge ${item.result}`}>
            {item.result === "win" ? "THẮNG" : item.result === "lose" ? "THUA" : "HÒA"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MatchHistoryList;
