import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { editor } from "monaco-editor";
import type { Monaco } from "@monaco-editor/react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { FiRepeat } from "react-icons/fi";
import { runCode } from "../api/judge0Api";
import {
  DEFAULT_LANGUAGE_ID,
  getLanguageById,
} from "../constants/languages";
import { getTemplateForLanguage } from "../constants/templates";
import CodeEditorPanel from "./CodeEditorPanel";
import EditorToolbar from "./EditorToolbar";
import "../styles/editor.css";

const EditorWorkspace: React.FC = () => {
  const [languageId, setLanguageId] = useState(DEFAULT_LANGUAGE_ID);
  const [sourceCode, setSourceCode] = useState(() =>
    getTemplateForLanguage(DEFAULT_LANGUAGE_ID)
  );
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");
  const [compilerOptions, setCompilerOptions] = useState("");
  const [commandLineArguments, setCommandLineArguments] = useState("");
  const [isOutputFirst, setIsOutputFirst] = useState(false);
  const [isWideLayout, setIsWideLayout] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1100
  );
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sourceEditor, setSourceEditor] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const currentLanguage = useMemo(
    () => getLanguageById(languageId),
    [languageId]
  );

  const handleLanguageChange = useCallback((nextLanguageId: number) => {
    setLanguageId(nextLanguageId);
    setSourceCode(getTemplateForLanguage(nextLanguageId));
    setStdin("");
    setStdout("");
    setStatusMessage("");
    setErrorMessage("");
  }, []);

  const handleInsertTemplate = useCallback(() => {
    const shouldReplace = window.confirm(
      "Replace current code with the template for this language?"
    );
    if (!shouldReplace) return;
    setSourceCode(getTemplateForLanguage(languageId));
    setStdin("");
    setErrorMessage("");
  }, [languageId]);

  const handleDownload = useCallback(() => {
    const fileName = currentLanguage?.fileName || "source.txt";
    const blob = new Blob([sourceCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [currentLanguage?.fileName, sourceCode]);

  const handleRun = useCallback(async () => {
    if (sourceCode.trim() === "") {
      setErrorMessage("Source code cannot be empty.");
      return;
    }

    setIsRunning(true);
    setErrorMessage("");
    setStdout("");
    setIsOutputFirst(false);
    setStatusMessage("Submitting...");

    const startedAt = performance.now();

    try {
      const result = await runCode({
        sourceCode,
        stdin,
        languageId,
        compilerOptions,
        commandLineArguments,
      });
      const elapsed = Math.round(performance.now() - startedAt);
      setStdout(result.output || "Program finished with no output.");
      setStatusMessage(`${result.statusLine} (TAT: ${elapsed}ms)`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to run code.";
      setErrorMessage(message);
      setStdout("");
      setStatusMessage("");
    } finally {
      setIsRunning(false);
    }
  }, [
    commandLineArguments,
    compilerOptions,
    languageId,
    sourceCode,
    stdin,
  ]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1100px)");
    const handleChange = () => setIsWideLayout(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        handleRun();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRun]);

  useEffect(() => {
    if (!sourceEditor || !currentLanguage || !monacoRef.current) return;
    const model = sourceEditor.getModel();
    if (model) {
      monacoRef.current.editor.setModelLanguage(model, currentLanguage.mode);
    }
  }, [currentLanguage, sourceEditor]);

  const inputPanel = (
    <Panel id="stdin" defaultSize={50} minSize={25} className="editor-resize-panel">
      <section className="editor-panel editor-panel-io">
        <header className="editor-panel-header">
          <span>Input</span>
        </header>
        <div className="editor-panel-body">
          <CodeEditorPanel
            value={stdin}
            language="plaintext"
            onChange={setStdin}
          />
        </div>
      </section>
    </Panel>
  );

  const outputPanel = (
    <Panel id="stdout" defaultSize={50} minSize={25} className="editor-resize-panel">
      <section className="editor-panel editor-panel-io">
        <header className="editor-panel-header">
          <span>Output</span>
          {stdout && <span className="editor-panel-hint">Ready</span>}
        </header>
        <div className="editor-panel-body">
          <CodeEditorPanel value={stdout} language="plaintext" readOnly />
        </div>
      </section>
    </Panel>
  );

  return (
    <div className="editor-workspace">
      <EditorToolbar
        languageId={languageId}
        compilerOptions={compilerOptions}
        commandLineArguments={commandLineArguments}
        isRunning={isRunning}
        statusMessage={statusMessage}
        onLanguageChange={handleLanguageChange}
        onCompilerOptionsChange={setCompilerOptions}
        onCommandLineArgumentsChange={setCommandLineArguments}
        onRun={handleRun}
        onInsertTemplate={handleInsertTemplate}
        onDownload={handleDownload}
      />

      {errorMessage && (
        <div className="editor-error-banner" role="alert">
          {errorMessage}
          {!process.env.REACT_APP_JUDGE0_API_KEY && (
            <span className="editor-error-hint">
              {" "}
              Set REACT_APP_JUDGE0_API_KEY in .env to enable Judge0 API.
            </span>
          )}
        </div>
      )}

      <Group
        id="editor-main-panels"
        orientation={isWideLayout ? "horizontal" : "vertical"}
        className="editor-panels"
      >
        <Panel id="source" defaultSize={isWideLayout ? 62 : 58} minSize={30}>
          <section className="editor-panel editor-panel-source">
            <header className="editor-panel-header">
              <span>{currentLanguage?.fileName || "source"}</span>
              <span className="editor-panel-hint">Ctrl + Enter to run</span>
            </header>
            <div className="editor-panel-body">
              <CodeEditorPanel
                value={sourceCode}
                language={currentLanguage?.mode || "plaintext"}
                onChange={setSourceCode}
                onMount={(editorInstance, monaco) => {
                  monacoRef.current = monaco;
                  setSourceEditor(editorInstance);
                }}
              />
            </div>
          </section>
        </Panel>

        <Separator className="editor-resize-handle">
          <span className="editor-resize-grip" />
        </Separator>

        <Panel id="io" defaultSize={isWideLayout ? 38 : 42} minSize={25}>
          <section className="editor-io-shell">
            <header className="editor-panel-header editor-io-header">
              <span>Input / Output</span>
              <button
                type="button"
                className="editor-icon-btn"
                onClick={() => setIsOutputFirst((current) => !current)}
                title="Swap input and output"
                aria-label="Swap input and output"
              >
                <FiRepeat />
              </button>
            </header>

            <Group
              id="editor-io-panels"
              orientation="vertical"
              className="editor-io-panels"
            >
              {isOutputFirst ? outputPanel : inputPanel}
              <Separator className="editor-resize-handle editor-resize-handle-vertical">
                <span className="editor-resize-grip" />
              </Separator>
              {isOutputFirst ? inputPanel : outputPanel}
            </Group>
          </section>
        </Panel>
      </Group>
    </div>
  );
};

export default EditorWorkspace;
