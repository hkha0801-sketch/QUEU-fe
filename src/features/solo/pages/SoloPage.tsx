import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockPlayer, mockMatchHistory } from "../data/soloMock";
import MatchHistoryList from "../components/MatchHistoryList";

const SoloPage: React.FC = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  const handleRoomJoin = () => {
    if (roomCode.trim()) {
      navigate(`/solo/matchmaking?mode=room&code=${encodeURIComponent(roomCode.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleRoomJoin();
  };

  return (
    <div className="solo-page">
      {/* Left column */}
      <div className="solo-left-col">
        {/* Rank mode card */}
        <div
          className="solo-mode-card rank"
          onClick={() => navigate("/solo/matchmaking?mode=rank")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/solo/matchmaking?mode=rank")}
          aria-label="Đấu rank"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="solo-mode-icon">⚔️</span>
              <div>
                <div className="solo-mode-title">ĐẤU RANK</div>
                <div className="solo-mode-sub">Thi đấu xếp hạng với người chơi khác</div>
              </div>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.25rem" }}>›</span>
          </div>
        </div>

        {/* Arya mode card */}
        <div
          className="solo-mode-card arya"
          onClick={() => navigate("/solo/matchmaking?mode=arya")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/solo/matchmaking?mode=arya")}
          aria-label="Solo với Arya"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="solo-mode-icon" style={{ color: "#f97316" }}>👥</span>
              <div>
                <div className="solo-mode-title" style={{ color: "#333" }}>SOLO VỚI ARYA DỄ THƯƠNG :3</div>
                <div className="solo-mode-sub" style={{ color: "#666" }}>Luyện tập với AI Arya</div>
              </div>
            </div>
            <span style={{ color: "#ccc", fontSize: "1.25rem" }}>›</span>
          </div>
        </div>

        {/* Room code input */}
        <div style={{ background: "white", borderRadius: "14px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.75rem", color: "#333" }}>
            Tham gia phòng
          </div>
          <div className="solo-room-input-row">
            <input
              className="solo-room-input"
              type="text"
              placeholder="Mã phòng"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Nhập mã phòng"
            />
            <button className="solo-room-btn" onClick={handleRoomJoin}>
              NHẬP
            </button>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="solo-right-col">
        {/* Player profile card */}
        <div className="player-profile-card" style={{ position: "relative" }}>
          <div className="player-global-badge">GLOBAL #{mockPlayer.globalRank?.toLocaleString()}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <img
              src={mockPlayer.avatar}
              alt={mockPlayer.name}
              style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.3)" }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{mockPlayer.name}</div>
              <div className="player-rank-name">
                <span>⚡</span>
                <span>{mockPlayer.rank}</span>
              </div>
            </div>
          </div>

          <div className="player-stats-row">
            <div className="player-stat-box">
              <div className="player-stat-label">ELO</div>
              <div className="player-stat-value">{mockPlayer.elo}</div>
            </div>
            <div className="player-stat-box">
              <div className="player-stat-label">Tỉ lệ thắng</div>
              <div className="player-stat-value">{mockPlayer.winRate}%</div>
            </div>
          </div>
        </div>

        {/* Match history */}
        <MatchHistoryList history={mockMatchHistory} />
      </div>
    </div>
  );
};

export default SoloPage;
