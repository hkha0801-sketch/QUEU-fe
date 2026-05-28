import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SoloMode, SoloPlayer } from "../types/solo.types";
import { mockPlayer } from "../data/soloMock";
import { findMatch } from "../api/soloApi";
import PlayerCard from "../components/PlayerCard";
import MatchCenter from "../components/MatchCenter";

const MatchmakingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") ?? "rank") as SoloMode;
  const roomCode = searchParams.get("code") ?? undefined;

  const [opponent, setOpponent] = useState<SoloPlayer | null>(null);
  const [isFound, setIsFound] = useState(false);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    let cancelled = false;

    findMatch(mode, roomCode)
      .then((found) => {
        if (!cancelled) {
          setOpponent(found);
          setIsFound(true);
        }
      })
      .catch((err) => {
        console.error("Matchmaking error:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [mode, roomCode]);

  const handleStart = () => {
    const sessionId = "session-" + Date.now();
    navigate(`/solo/editor/${sessionId}`);
  };

  return (
    <div className="matchmaking-page">
      {/* Back button */}
      <button
        onClick={() => navigate("/solo")}
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "#333",
          fontWeight: 700,
          lineHeight: 1,
        }}
        aria-label="Quay lại"
      >
        ‹
      </button>

      {/* Arena */}
      <div className="matchmaking-arena">
        {/* Left player */}
        <PlayerCard player={mockPlayer} />

        {/* Center */}
        <MatchCenter
          status={isFound ? "found" : "searching"}
          rankLabel="RANK CỦA BẠN"
          rankValue={mockPlayer.rank}
          onStart={handleStart}
        />

        {/* Right player (opponent) */}
        {opponent ? (
          <PlayerCard player={opponent} />
        ) : (
          <div className="matchmaking-player-card matchmaking-opponent-hidden">
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                margin: "0 auto 0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              ?
            </div>
            <div style={{ fontWeight: 800, fontSize: "1rem" }}>???</div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>
              Đang tìm...
            </div>
          </div>
        )}
      </div>

      {/* Tip text */}
      <div className="matchmaking-tip">
        Mẹo: Hãy chuẩn bị tinh thần thép trước khi bước vào trận đấu.
      </div>

      {/* Mini chat input */}
      <div
        style={{
          position: "absolute",
          bottom: "4rem",
          left: "2rem",
          width: "280px",
        }}
      >
        <input
          type="text"
          placeholder="Bạn muốn tìm hiểu về gì?"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid #e0e0e0",
            fontSize: "0.8rem",
            outline: "none",
            boxSizing: "border-box",
          }}
          aria-label="Mini chat"
        />
      </div>
    </div>
  );
};

export default MatchmakingPage;
