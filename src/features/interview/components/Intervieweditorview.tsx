import React, { useEffect, useMemo, useRef, useState } from "react";
import { InterviewSession } from "../types/interview.types";

interface Props {
  session: InterviewSession | null;
  onSubmitAnswer: (answer: string) => void;
  isLoading: boolean;
  error: string | null;
  onBack?: () => void;
}

const LANG_OPTIONS = ["JavaScript", "Python", "C++", "Java", "TypeScript"];

const KEYWORDS_BY_LANG: Record<string, string[]> = {
  JavaScript: [
    "var", "let", "const", "function", "return", "if", "else", "for", "while",
    "do", "switch", "case", "break", "continue", "new", "delete", "typeof",
    "instanceof", "in", "of", "class", "extends", "super", "this", "try",
    "catch", "finally", "throw", "async", "await", "yield", "import", "export",
    "default", "from", "as", "static", "get", "set", "true", "false", "null",
    "undefined", "void", "with",
  ],
  TypeScript: [
    "var", "let", "const", "function", "return", "if", "else", "for", "while",
    "do", "switch", "case", "break", "continue", "new", "delete", "typeof",
    "instanceof", "in", "of", "class", "extends", "super", "this", "try",
    "catch", "finally", "throw", "async", "await", "yield", "import", "export",
    "default", "from", "as", "static", "get", "set", "true", "false", "null",
    "undefined", "void", "interface", "type", "enum", "implements", "public",
    "private", "protected", "readonly", "abstract", "namespace", "declare",
    "is", "keyof", "infer", "never", "unknown", "any", "string", "number",
    "boolean",
  ],
  Python: [
    "def", "return", "if", "elif", "else", "for", "while", "break", "continue",
    "pass", "import", "from", "as", "class", "try", "except", "finally",
    "raise", "with", "lambda", "yield", "global", "nonlocal", "assert", "del",
    "in", "is", "not", "and", "or", "True", "False", "None", "async", "await",
  ],
  "C++": [
    "int", "float", "double", "char", "bool", "void", "long", "short",
    "unsigned", "signed", "class", "struct", "public", "private", "protected",
    "virtual", "override", "static", "const", "constexpr", "return", "if",
    "else", "for", "while", "do", "switch", "case", "break", "continue",
    "new", "delete", "this", "namespace", "using", "template", "typename",
    "try", "catch", "throw", "true", "false", "nullptr", "auto", "vector",
    "string", "include", "define",
  ],
  Java: [
    "public", "private", "protected", "static", "final", "class", "interface",
    "extends", "implements", "abstract", "void", "int", "long", "float",
    "double", "char", "boolean", "byte", "short", "return", "if", "else",
    "for", "while", "do", "switch", "case", "break", "continue", "new",
    "this", "super", "try", "catch", "finally", "throw", "throws", "import",
    "package", "true", "false", "null", "instanceof", "enum",
  ],
};

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const highlightCode = (code: string, language: string) => {
  const keywords = KEYWORDS_BY_LANG[language] ?? KEYWORDS_BY_LANG.JavaScript;
  const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
  return escapeHtml(code).replace(pattern, '<strong class="ie-kw">$1</strong>');
};

type Difficulty = "Easy" | "Medium" | "Hard";

const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  Easy: "ie-tag--easy",
  Medium: "ie-tag--medium",
  Hard: "ie-tag--hard",
};

interface TestCase {
  id: number;
  label: string;
  nums: string;
  target: string;
}

interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  description: string[];
  exampleInput: string;
  exampleOutput: string;
  exampleExplanation: string;
  defaultCode: string;
  testCases: TestCase[];
}

const PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "1. Two Sum",
    difficulty: "Easy",
    description: [
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      "You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    ],
    exampleInput: "nums = [2,7,11,15], target = 9",
    exampleOutput: "[0,1]",
    exampleExplanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    defaultCode: `var twoSum = function(nums, target) {\n    \n};`,
    testCases: [
      { id: 1, label: "Case 1", nums: "[2,7,11,15]", target: "9" },
      { id: 2, label: "Case 2", nums: "[3,2,4]", target: "6" },
      { id: 3, label: "Case 3", nums: "[3,3]", target: "6" },
    ],
  },
  {
    id: 2,
    title: "2. Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    description: [
      "You are given an array prices where prices[i] is the price of a given stock on the i-th day.",
      "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve.",
    ],
    exampleInput: "prices = [7,1,5,3,6,4]",
    exampleOutput: "5",
    exampleExplanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    defaultCode: `var maxProfit = function(prices) {\n    \n};`,
    testCases: [
      { id: 1, label: "Case 1", nums: "[7,1,5,3,6,4]", target: "-" },
      { id: 2, label: "Case 2", nums: "[7,6,4,3,1]", target: "-" },
    ],
  },
  {
    id: 3,
    title: "3. Valid Anagram",
    difficulty: "Easy",
    description: [
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    ],
    exampleInput: 's = "anagram", t = "nagaram"',
    exampleOutput: "true",
    exampleExplanation: "Both strings contain the same characters with the same frequency.",
    defaultCode: `var isAnagram = function(s, t) {\n    \n};`,
    testCases: [
      { id: 1, label: "Case 1", nums: '"anagram"', target: '"nagaram"' },
      { id: 2, label: "Case 2", nums: '"rat"', target: '"car"' },
    ],
  },
];

const InterviewEditorView: React.FC<Props> = ({ onSubmitAnswer, isLoading, error, onBack }) => {

  const [problemIndex, setProblemIndex] = useState(0);
  const problem = PROBLEMS[problemIndex];

  const [testCases, setTestCases] = useState<TestCase[]>(problem.testCases);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  const updateCaseField = (index: number, field: "nums" | "target", value: string) => {
    setTestCases((prev) => prev.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc)));
  };

  const activeCase = testCases[activeCaseIndex] ?? testCases[0];

  const [code, setCode] = useState(problem.defaultCode);
  const lineCount = useMemo(() => code.split("\n").length, [code]);

  const [language, setLanguage] = useState(LANG_OPTIONS[0]);
  const highlightedCode = useMemo(
    () => highlightCode(code, language),
    [code, language]
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const highlightRef = useRef<HTMLPreElement | null>(null);

  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const goToProblem = (nextIndex: number) => {
    const wrapped = (nextIndex + PROBLEMS.length) % PROBLEMS.length;
    const nextProblem = PROBLEMS[wrapped];
    setProblemIndex(wrapped);
    setCode(nextProblem.defaultCode);
    setTestCases(nextProblem.testCases);
    setActiveCaseIndex(0);
  };

  const handlePrevProblem = () => goToProblem(problemIndex - 1);
  const handleNextProblem = () => goToProblem(problemIndex + 1);

  const handleSubmit = () => {
    onSubmitAnswer(code);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [mediaSource, setMediaSource] = useState<"none" | "camera" | "screen">("none");
  const [mediaStatus, setMediaStatus] = useState<"idle" | "starting" | "active" | "error">("idle");
  const [mediaError, setMediaError] = useState<string | null>(null);

  const stopMedia = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setMediaSource("none");
    setMediaStatus("idle");
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMediaStatus("error");
      setMediaError("Trình duyệt không hỗ trợ camera.");
      return;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setMediaStatus("starting");
    setMediaError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setMediaSource("camera");
      setMediaStatus("active");
      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        stopMedia();
      });
    } catch (err) {
      setMediaStatus("error");
      setMediaError(
        err instanceof Error ? err.message : "Không thể truy cập camera."
      );
    }
  };

  const startScreenShare = async () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setMediaStatus("error");
      setMediaError("Trình duyệt không hỗ trợ chia sẻ màn hình.");
      return;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setMediaStatus("starting");
    setMediaError(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setMediaSource("screen");
      setMediaStatus("active");
      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        stopMedia();
      });
    } catch (err) {
      setMediaStatus("error");
      setMediaError(
        err instanceof Error ? err.message : "Không thể chia sẻ màn hình."
      );
    }
  };

  const toggleScreenShare = () => {
    if (mediaSource === "screen" && mediaStatus === "active") {
      stopMedia();
    } else {
      startScreenShare();
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="ie-page">
      <div className="ie-header">
        <div className="ie-header-left">
          <span className="ie-header-icon">{"</>"}</span>
          <span className="ie-header-title">ARYA's mock interview</span>
        </div>
        <div className="ie-header-nav">
          <button className="ie-pill-btn">
            Problem List
          </button>
          <button
            className="ie-icon-btn"
            onClick={handlePrevProblem}
            title="Bài trước"
          >
            ‹
          </button>
          <button
            className="ie-icon-btn"
            onClick={handleNextProblem}
            title="Bài tiếp theo"
          >
            ›
          </button>
        </div>
        <div className="ie-header-right">
          <button
            className="ie-share-btn"
            onClick={toggleScreenShare}
            disabled={mediaStatus === "starting"}
          >
            {mediaSource === "screen" && mediaStatus === "active"
              ? "Stop sharing"
              : mediaStatus === "starting"
              ? "Đang xử lý…"
              : "Share screen"}
          </button>
          <select
            className="ie-lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANG_OPTIONS.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <button className="ie-icon-btn">⚙</button>
        </div>
      </div>

      <div className="ie-main">
        <div className="ie-left">
          <div className="ie-video-row">
            <div className="ie-video-card">
              <span className="ie-live-badge">● LIVE</span>
              <div className="ie-video-placeholder" />
            </div>
            <div className="ie-video-card">
              {mediaStatus === "active" && (
                <span className="ie-live-badge">● LIVE</span>
              )}
              <video
                ref={videoRef}
                className="ie-video-feed"
                autoPlay
                playsInline
                muted
                style={{
                  display: mediaStatus === "active" ? "block" : "none",
                  width: "100%",
                  height: "100%",
                  objectFit: mediaSource === "screen" ? "contain" : "cover",
                  background: mediaSource === "screen" ? "#000" : undefined,
                  borderRadius: "inherit",
                }}
              />
              {mediaStatus !== "active" && (
                <div
                  className="ie-video-placeholder ie-video-placeholder--camera"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {mediaStatus === "starting" && <span>Đang khởi động…</span>}
                  {mediaStatus === "idle" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        className="ie-btn ie-btn--ghost"
                        onClick={startCamera}
                      >
                        Bật camera
                      </button>
                      <button
                        type="button"
                        className="ie-btn ie-btn--ghost"
                        onClick={startScreenShare}
                      >
                        Chia sẻ màn hình
                      </button>
                    </div>
                  )}
                  {mediaStatus === "error" && (
                    <div
                      className="ie-camera-error"
                      style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}
                    >
                      <span>{mediaError ?? "Không thể mở camera hoặc chia sẻ màn hình."}</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          type="button"
                          className="ie-btn ie-btn--ghost"
                          onClick={startCamera}
                        >
                          Thử bật camera
                        </button>
                        <button
                          type="button"
                          className="ie-btn ie-btn--ghost"
                          onClick={startScreenShare}
                        >
                          Thử chia sẻ màn hình
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {mediaStatus === "active" && (
                <button
                  type="button"
                  className="ie-icon-btn ie-video-stop-btn"
                  onClick={stopMedia}
                  title={mediaSource === "screen" ? "Dừng chia sẻ màn hình" : "Tắt camera"}
                  style={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    zIndex: 2,
                  }}
                >
                  ⏻
                </button>
              )}
            </div>
          </div>

          <div className="ie-description-card">
            <div className="ie-description-tab">Description</div>
            <div className="ie-description-body">
              <h2 className="ie-problem-title">{problem.title}</h2>
              <span className={`ie-tag ${DIFFICULTY_CLASS[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              {problem.description.map((para, i) => (
                <p className="ie-problem-text" key={i}>
                  {para}
                </p>
              ))}
              <h4 className="ie-example-title">Example 1:</h4>
              <pre className="ie-example-box">{`Input: ${problem.exampleInput}\nOutput: ${problem.exampleOutput}\nExplanation: ${problem.exampleExplanation}`}</pre>
            </div>
          </div>
        </div>

        <div className="ie-right">
          <div className="ie-editor-card">
            <div className="ie-editor-tab">solution.js</div>
            <div className="ie-editor-body">
              <div className="ie-editor-wrap" style={{ display: "flex", width: "100%", height: "100%" }}>
                <div className="ie-editor-lines" aria-hidden="true">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div key={i} className="ie-line-num" style={{ fontSize: "13px", lineHeight: "1.4" }}>
                      {i + 1}
                    </div>
                  ))}
                </div>

                <div className="ie-editor-container" style={{ position: "relative", flex: 1, minHeight: `${lineCount * 18.2}px`, width: "100%" }}>
                  <pre
                    ref={highlightRef}
                    className="ie-editor-highlight"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      zIndex: 1,
                      overflow: "hidden",
                      pointerEvents: "none",
                      userSelect: "none",
                      fontSize: "13px",
                      lineHeight: "1.4"
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightedCode + "\n" }}
                  />

                  <textarea
                    ref={textareaRef}
                    className="ie-editor-textarea"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onScroll={syncScroll}
                    spellCheck={false}
                    wrap="off"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      color: "transparent",
                      caretColor: "var(--ie-caret-color, #111)",
                      resize: "none",
                      zIndex: 2,
                      fontSize: "13px",
                      lineHeight: "1.4"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ie-tests-card">
            <div className="ie-tests-tabbar">
              <div className="ie-tests-tabs-left">
                <span className="ie-tests-tab ie-tests-tab--active">Test Cases</span>
                <span className="ie-tests-tab">{"Console"}</span>
              </div>
              <div className="ie-tests-actions">
                <button className="ie-btn ie-btn--ghost" disabled={isLoading}>Run</button>
                <button className="ie-btn ie-btn--primary" disabled={isLoading} onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>

            <div className="ie-case-pills">
              {testCases.map((tc, i) => (
                <span
                  key={tc.id}
                  className={`ie-case-pill ${i === activeCaseIndex ? "ie-case-pill--active" : ""}`}
                  onClick={() => setActiveCaseIndex(i)}
                >
                  <span className="ie-case-pill-text">{tc.label}</span>
                </span>
              ))}
            </div>

            {activeCase && (
              <>
                <div className="ie-case-field">
                  <label className="ie-case-label">NUMS =</label>
                  <input
                    className="ie-case-input"
                    value={activeCase.nums}
                    onChange={(e) => updateCaseField(activeCaseIndex, "nums", e.target.value)}
                  />
                </div>
                <div className="ie-case-field">
                  <label className="ie-case-label">TARGET =</label>
                  <input
                    className="ie-case-input"
                    value={activeCase.target}
                    onChange={(e) => updateCaseField(activeCaseIndex, "target", e.target.value)}
                  />
                </div>
              </>
            )}

            {error && (
              <div className="ie-error">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewEditorView;