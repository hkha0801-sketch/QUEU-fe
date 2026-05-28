import React from "react";
import { Skill, ExerciseStats } from "../types/home.types";

interface Props {
  skills: Skill[];
  stats: ExerciseStats;
}

const LEVEL_POSITIONS: Record<string, number> = {
  Beginner: 0,
  Intermediate: 50,
  Proficient: 100,
};

const UserProfileStats: React.FC<Props> = ({ skills, stats }) => {
  return (
    <div className="home-left-col">
      {/* Skills card */}
      <div className="card skills-card">
        <h3 className="card-title">Khả năng hiện tại</h3>
        <div className="skills-list">
          {skills.map((skill, i) => (
            <div key={i} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level.toUpperCase()}</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-track-fill"
                  style={{ width: `${LEVEL_POSITIONS[skill.level]}%` }}
                />
                <div
                  className="skill-thumb"
                  style={{ left: `${LEVEL_POSITIONS[skill.level]}%` }}
                />
              </div>
              <div className="skill-labels">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Proficient</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise stats card */}
      <div className="card stats-card">
        <h3 className="stats-card-title">Số lượng bài tập</h3>
        <div className="stats-row">
          <span className="stats-label">Tổng thời lượng</span>
          <span className="stats-value">{stats.totalHours} giờ</span>
        </div>
        <div className="stats-row">
          <span className="stats-label">Tổng số bài tập</span>
          <span className="stats-value">{stats.totalExercises}</span>
        </div>
        <div className="stats-row">
          <span className="stats-label">Tổng số bài test Interview</span>
          <span className="stats-value">{stats.totalInterviewTests}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileStats;
