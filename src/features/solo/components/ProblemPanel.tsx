import React from "react";
import { SoloProblem } from "../types/solo.types";

interface ProblemPanelProps {
  problem: SoloProblem;
}

const difficultyClass: Record<string, string> = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
};

const ProblemPanel: React.FC<ProblemPanelProps> = ({ problem }) => {
  return (
    <div className="solo-problem-scroll">
      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem" }}>
        {problem.id}. {problem.title}
      </h2>

      <div style={{ marginBottom: "0.75rem" }}>
        <span className={`problem-tag ${difficultyClass[problem.difficulty] ?? "default"}`}>
          {problem.difficulty}
        </span>
        {problem.tags.map((tag) => (
          <span key={tag} className="problem-tag default">
            {tag}
          </span>
        ))}
      </div>

      <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#333", marginBottom: "1rem", whiteSpace: "pre-line" }}>
        {problem.description}
      </p>

      {problem.examples.map((ex, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <div style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Example {i + 1}:
          </div>
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: "6px",
              padding: "0.6rem 0.875rem",
              fontFamily: "monospace",
              fontSize: "0.82rem",
              lineHeight: 1.6,
            }}
          >
            <div>
              <strong>Input:</strong> {ex.input}
            </div>
            <div>
              <strong>Output:</strong> {ex.output}
            </div>
            {ex.explanation && (
              <div>
                <strong>Explanation:</strong> {ex.explanation}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProblemPanel;
