import React from "react";
import { SoloProblem } from "../types/solo.types";

interface TestCasePanelProps {
  problem: SoloProblem;
  activeTestCase: number;
  onSelectTestCase: (index: number) => void;
  onRun: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const TestCasePanel: React.FC<TestCasePanelProps> = ({
  problem,
  activeTestCase,
  onSelectTestCase,
  onRun,
  onSubmit,
  isSubmitting,
}) => {
  const currentCase = problem.testCases[activeTestCase];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.4rem 1rem",
          borderBottom: "1px solid #333",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "#cdd6f4", fontWeight: 600 }}>Test Cases</span>
          <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>|</span>
          <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>Console</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="solo-run-btn" onClick={onRun}>
            Run
          </button>
          <button className="solo-submit-btn" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Test case tabs */}
      <div className="test-case-tabs">
        {problem.testCases.map((tc, i) => (
          <button
            key={i}
            className={`test-case-tab${activeTestCase === i ? " active" : ""}`}
            onClick={() => onSelectTestCase(i)}
          >
            {tc.name}
          </button>
        ))}
      </div>

      {/* Test case content */}
      <div className="test-case-content">
        {currentCase &&
          Object.entries(currentCase.inputs).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "0.75rem" }}>
              <div className="test-case-label">{key.toUpperCase()}</div>
              <div className="test-case-value">{value}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TestCasePanel;
