import React from "react";
import { ChecklistPhase } from "../types/home.types";

interface Props {
  overall: number;
  phases: ChecklistPhase[];
}

const ProgressChart: React.FC<Props> = ({ overall, phases }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overall / 100) * circumference;

  return (
    <div className="card progress-card">
      <h3 className="card-title">Check list</h3>
      <div className="progress-body">
        {/* Donut chart */}
        <div className="donut-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke="#e8e8e8"
              strokeWidth="14"
            />
            <circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke="#f97316"
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
            />
          </svg>
          <span className="donut-label">{overall}%</span>
        </div>

        {/* Phase grid */}
        <div className="phase-grid">
          {phases.map((p, i) => (
            <div key={i} className="phase-item">
              <span className="phase-tag">{p.phase}</span>
              <span className="phase-name">{p.name}</span>
              <span
                className="phase-progress"
                style={{ color: p.progress === 100 ? "#f97316" : "#f97316" }}
              >
                {p.progress}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
