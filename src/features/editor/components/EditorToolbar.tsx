import React from "react";
import { FiDownload, FiFileText, FiPlay } from "react-icons/fi";
import { LANGUAGE_OPTIONS } from "../constants/languages";

interface EditorToolbarProps {
  languageId: number;
  compilerOptions: string;
  commandLineArguments: string;
  isRunning: boolean;
  statusMessage: string;
  onLanguageChange: (languageId: number) => void;
  onCompilerOptionsChange: (value: string) => void;
  onCommandLineArgumentsChange: (value: string) => void;
  onRun: () => void;
  onInsertTemplate: () => void;
  onDownload: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  languageId,
  compilerOptions,
  commandLineArguments,
  isRunning,
  statusMessage,
  onLanguageChange,
  onCompilerOptionsChange,
  onCommandLineArgumentsChange,
  onRun,
  onInsertTemplate,
  onDownload,
}) => {
  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-main">
        <div className="editor-toolbar-group">
          <label className="editor-field-label" htmlFor="editor-language">
            Language
          </label>
          <select
            id="editor-language"
            className="editor-select"
            value={languageId}
            onChange={(event) => onLanguageChange(Number(event.target.value))}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="editor-toolbar-group editor-toolbar-group-wide">
          <label className="editor-field-label" htmlFor="compiler-options">
            Compiler options
          </label>
          <input
            id="compiler-options"
            className="editor-input"
            type="text"
            placeholder="Compiler options"
            value={compilerOptions}
            onChange={(event) => onCompilerOptionsChange(event.target.value)}
          />
        </div>

        <div className="editor-toolbar-group editor-toolbar-group-wide">
          <label className="editor-field-label" htmlFor="command-line-args">
            Arguments
          </label>
          <input
            id="command-line-args"
            className="editor-input"
            type="text"
            placeholder="Command line arguments"
            value={commandLineArguments}
            onChange={(event) => onCommandLineArgumentsChange(event.target.value)}
          />
        </div>

        <div className="editor-toolbar-actions">
          <button
            type="button"
            className="editor-btn editor-btn-secondary"
            onClick={onInsertTemplate}
          >
            <FiFileText />
            Template
          </button>
          <button
            type="button"
            className="editor-btn editor-btn-secondary"
            onClick={onDownload}
          >
            <FiDownload />
            Download
          </button>
          <button
            type="button"
            className="editor-btn editor-btn-primary"
            onClick={onRun}
            disabled={isRunning}
          >
            <FiPlay />
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="editor-status-bar">
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  );
};

export default EditorToolbar;
