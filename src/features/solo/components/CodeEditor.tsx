import React from "react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language }) => {
  const lines = code.split("\n");

  return (
    <div className="solo-code-area" style={{ position: "relative" }}>
      <div style={{ display: "flex" }}>
        {/* Line numbers */}
        <div
          style={{
            userSelect: "none",
            color: "#6b7280",
            textAlign: "right",
            paddingRight: "1rem",
            minWidth: "2.5rem",
            lineHeight: 1.6,
            fontSize: "0.85rem",
            fontFamily: "monospace",
          }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#cdd6f4",
            fontFamily: "monospace",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            resize: "none",
            minHeight: `${lines.length * 1.6 * 0.85 * 16}px`,
            padding: 0,
          }}
          aria-label={`${language} code editor`}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
