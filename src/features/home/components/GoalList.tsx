import React from "react";
import { useNavigate } from "react-router-dom";
import { Goal } from "../types/home.types";

interface Props {
  goals: Goal[];
}

const GOAL_ICONS: Record<string, string> = {
  interview: "🎯",
  solo: "⚔️",
  dsa: "📋",
};

const GOAL_ROUTES: Record<string, string> = {
  interview: "/interview",
  solo: "/solo",
  dsa: "/problems",
};

const GoalList: React.FC<Props> = ({ goals }) => {
  const navigate = useNavigate();

  return (
    <div className="card goal-card">
      <h3 className="card-title">Mục tiêu hôm nay</h3>
      <div className="goal-list">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`goal-item${goal.isPrimary ? " goal-primary" : ""}`}
          >
            <span className="goal-icon">{GOAL_ICONS[goal.icon] ?? "📌"}</span>
            <span className="goal-text">{goal.text}</span>
            {goal.isPrimary ? (
              <button
                className="btn-start"
                onClick={() => navigate(GOAL_ROUTES[goal.icon] ?? "/")}
              >
                Bắt đầu
              </button>
            ) : (
              <span className={`goal-check${goal.completed ? " checked" : ""}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalList;
