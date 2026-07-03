import React from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

interface CodeEditorPanelProps {
  value: string;
  language: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onMount?: (
    editorInstance: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => void;
}

const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  value,
  language,
  readOnly = false,
  onChange,
  onMount,
}) => {
  const handleMount: OnMount = (editorInstance, monaco) => {
    onMount?.(editorInstance, monaco);
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme="vs"
      onChange={(nextValue) => onChange?.(nextValue ?? "")}
      onMount={handleMount}
      options={{
        automaticLayout: true,
        readOnly,
        minimap: { enabled: false },
        scrollBeyondLastLine: readOnly ? false : true,
        fontSize: 14,
        fontFamily: "'Consolas', 'Courier New', monospace",
        lineNumbers: "on",
        roundedSelection: true,
        padding: { top: 12, bottom: 12 },
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  );
};

export default CodeEditorPanel;
