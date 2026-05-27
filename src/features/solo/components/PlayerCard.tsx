import React from "react";
import { SoloPlayer } from "../types/solo.types";

interface PlayerCardProps {
  player: SoloPlayer;
  hidden?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, hidden = false }) => {
  return (
    <div className={`matchmaking-player-card${hidden ? " matchmaking-opponent-hidden" : ""}`}>
      <img className="avatar" src={player.avatar} alt={player.name} />
      <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "0.25rem" }}>{player.name}</div>
      <div style={{ fontSize: "0.85rem", color: "#f97316", fontWeight: 700, marginBottom: "0.5rem" }}>
        ⚡ {player.rank}
      </div>
      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.25rem" }}>
        ELO: <span style={{ color: "#4ade80", fontWeight: 700 }}>{player.elo}</span>
      </div>
      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
        Tỉ lệ thắng:{" "}
        <span style={{ color: "#4ade80", fontWeight: 700 }}>
          {player.winRate !== null ? `${player.winRate}%` : "Đã ẩn"}
        </span>
      </div>
    </div>
  );
};

export default PlayerCard;
