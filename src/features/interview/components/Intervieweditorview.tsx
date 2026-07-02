import React, { useMemo, useState } from "react";
import { InterviewSession } from "../types/interview.types";

interface Props {
  session: InterviewSession | null;
  onSubmitAnswer: (answer: string) => void;
  isLoading: boolean;
  error: string | null;
  onBack?: () => void;
}

const LANG_OPTIONS = ["JavaScript", "Python", "C++", "Java", "TypeScript"];

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
    defaultCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
};`,
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
    defaultCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Write your code here
};`,
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
    defaultCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    // Write your code here
};`,
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

  return (
    <div className="ie-page">
      {/* Header */}
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
          <button className="ie-share-btn">Share screen</button>
          <select className="ie-lang-select" defaultValue={LANG_OPTIONS[0]}>
            {LANG_OPTIONS.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <button className="ie-icon-btn">⚙</button>
        </div>
      </div>

      {/* Main grid: left (video + description) / right (editor + tests) */}
      <div className="ie-main">
        {/* LEFT COLUMN */}
        <div className="ie-left">
          {/* Video panels */}
          <div className="ie-video-row">
            <div className="ie-video-card">
              <span className="ie-live-badge">● LIVE</span>
              <div className="ie-video-placeholder" />
            </div>
            <div className="ie-video-card">
              <span className="ie-live-badge">● LIVE</span>
              <div className="ie-video-placeholder" />
            </div>
          </div>

          {/* Description box */}
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

        {/* RIGHT COLUMN */}
        <div className="ie-right">
          {/* Code editor card */}
          <div className="ie-editor-card">
            <div className="ie-editor-tab">solution.js</div>
            <div className="ie-editor-body">
              <div className="ie-editor-wrap">
                <div className="ie-editor-lines" aria-hidden="true">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div key={i} className="ie-line-num">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  className="ie-editor-textarea"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  rows={lineCount}
                  wrap="off"
                />
              </div>
            </div>
          </div>

          {/* Test cases card */}
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