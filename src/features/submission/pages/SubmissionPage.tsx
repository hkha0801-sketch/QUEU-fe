import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaTimes,
  FaCopy,
  FaCheck,
  FaCode,
  FaServer,
  FaSpinner,
} from "react-icons/fa";
import { getSubmissions, getSubmissionDetails } from "../api/submissionApi";
import {
  SubmissionItem,
  SubmissionDetails,
  SubmissionStatus,
} from "../types/submission.types";

const statusOptions: { value: string; label: string }[] = [
  { value: "", label: "All Statuses" },
  { value: "accepted", label: "Full Accepted" },
  { value: "wrong_answer", label: "Wrong Answer" },
  { value: "time_limit_exceeded", label: "Time Limit Exceeded" },
  { value: "compile_error", label: "Compile Error" },
  { value: "runtime_error", label: "Runtime Error" },
  { value: "memory_limit_exceeded", label: "Memory Limit Exceeded" },
];

const sortOptions = [
  { value: "time-desc", label: "Newest First" },
  { value: "time-asc", label: "Oldest First" },
  { value: "runtime-asc", label: "Fastest Runtime" },
  { value: "memory-asc", label: "Lowest Memory" },
];

function formatRelativeTime(timestamp?: number): string {
  if (!timestamp) return "Just now";
  const diff = Date.now() - timestamp;
  if (diff < 60 * 1000) return "Just now";
  
  const minutes = Math.floor(diff / (60 * 1000));
  if (minutes < 60) return `${minutes} mins ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function mapLanguageLabel(lang: string): string {
  const mapping: Record<string, string> = {
    cpp: "C++",
    python: "Python",
    java: "Java",
    javascript: "JavaScript",
    go: "Go",
    rust: "Rust",
  };
  return mapping[lang.toLowerCase()] ?? lang;
}

function getStatusBadgeClass(status: SubmissionStatus): string {
  switch (status) {
    case "accepted":
      return "status-badge--accepted";
    case "wrong_answer":
      return "status-badge--wrong-answer";
    case "time_limit_exceeded":
      return "status-badge--tle";
    case "compile_error":
      return "status-badge--ce";
    case "runtime_error":
      return "status-badge--re";
    case "memory_limit_exceeded":
      return "status-badge--mle";
    default:
      return "";
  }
}

function formatStatusText(status: SubmissionStatus): string {
  switch (status) {
    case "accepted":
      return "Full Accepted";
    case "wrong_answer":
      return "Wrong Answer";
    case "time_limit_exceeded":
      return "Time Limit Exceeded";
    case "compile_error":
      return "Compile Error";
    case "runtime_error":
      return "Runtime Error";
    case "memory_limit_exceeded":
      return "Memory Limit Exceeded";
    default:
      return status;
  }
}

function formatRuntime(timeInSeconds: number): string {
  if (timeInSeconds === 0) return "0ms";
  return `${Math.round(timeInSeconds * 1000)}ms`;
}

function formatMemory(memoryInKB: number): string {
  if (memoryInKB === 0) return "0.00mb";
  return `${(memoryInKB / 1024).toFixed(2)}mb`;
}

const SubmissionPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Display 10 items per page

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("time-desc");

  // Dropdown states
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Detail Modal states
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [subDetails, setSubDetails] = useState<SubmissionDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  // Refs for closing dropdowns on click outside
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 on new search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch submissions from API
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await getSubmissions({
        page,
        limit,
        problemId: debouncedSearch || undefined,
        status: statusFilter || undefined,
      });

      let items = response.data.items;

      // Apply client-side sorting based on sortBy option
      items = [...items].sort((a, b) => {
        if (sortBy === "time-desc") {
          return (b.createdAt ?? 0) - (a.createdAt ?? 0);
        }
        if (sortBy === "time-asc") {
          return (a.createdAt ?? 0) - (b.createdAt ?? 0);
        }
        if (sortBy === "runtime-asc") {
          return a.time - b.time;
        }
        if (sortBy === "memory-asc") {
          return a.memory - b.memory;
        }
        return 0;
      });

      setSubmissions(items);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [page, limit, debouncedSearch, statusFilter, sortBy]);

  // Fetch submission details when modal opens
  useEffect(() => {
    if (!selectedSubId) {
      setSubDetails(null);
      return;
    }

    const fetchDetails = async () => {
      setLoadingDetails(true);
      try {
        const response = await getSubmissionDetails(selectedSubId);
        setSubDetails(response.data);
      } catch (err) {
        console.error("Error fetching submission details:", err);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [selectedSubId]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const totalPages = Math.ceil(totalItems / limit) || 1;

  const handleCopyCode = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="submission-page">
      <div className="submission-header">
        <div className="submission-title-section">
          <h1>Submission</h1>
          <p className="submission-subtitle">All submissions today</p>
        </div>

        {/* Right-aligned control bar */}
        <div className="submission-control-bar">
          <div className="submission-search-wrapper">
            <FaSearch className="submission-search-icon" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search problems"
            />
            {searchQuery && (
              <button
                type="button"
                className="submission-clear-search"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="submission-dropdown-wrapper" ref={filterRef}>
            <button
              type="button"
              className={`submission-dropdown-btn ${statusFilter ? "active-filter" : ""}`}
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            >
              <FaFilter />
              <span>
                {statusFilter
                  ? statusOptions.find((opt) => opt.value === statusFilter)?.label
                  : "Filter"}
              </span>
            </button>

            {isFilterDropdownOpen && (
              <ul className="submission-dropdown-menu">
                {statusOptions.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      className={statusFilter === opt.value ? "selected" : ""}
                      onClick={() => {
                        setStatusFilter(opt.value);
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="submission-dropdown-wrapper" ref={sortRef}>
            <button
              type="button"
              className="submission-dropdown-btn"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            >
              <FaSortAmountDown />
              <span>Sort by</span>
            </button>

            {isSortDropdownOpen && (
              <ul className="submission-dropdown-menu">
                {sortOptions.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      className={sortBy === opt.value ? "selected" : ""}
                      onClick={() => {
                        setSortBy(opt.value);
                        setIsSortDropdownOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="submission-table-container">
        {loading ? (
          <div className="submission-loading-container">
            <FaSpinner className="submission-spinner" />
            <p>Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="submission-empty">
            <FaServer />
            <h3>No submissions found</h3>
            <p>Try resetting filters or searching for another problem title.</p>
          </div>
        ) : (
          <>
            <table className="submission-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>User</th>
                  <th>Problem</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Runtime</th>
                  <th>Memory</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr
                    key={sub.submissionId}
                    className="submission-row"
                    onClick={() => setSelectedSubId(sub.submissionId)}
                  >
                    <td>{formatRelativeTime(sub.createdAt)}</td>
                    <td className="user-cell">{sub.username ?? "Khoidesu"}</td>
                    <td className="problem-cell" onClick={(e) => e.stopPropagation()}>
                      <Link to={`/editor?problem=${sub.problemId}`}>
                        {sub.problemTitle ?? "Two sum"}
                      </Link>
                    </td>
                    <td>
                      <span className="lang-pill">
                        {mapLanguageLabel(sub.language)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(sub.status)}`}>
                        {formatStatusText(sub.status)}
                      </span>
                    </td>
                    <td>{formatRuntime(sub.time)}</td>
                    <td>{formatMemory(sub.memory)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="submission-pagination">
                <button
                  type="button"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <div className="page-indicator">
                  Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubId && (
        <div
          className="submission-modal-overlay"
          onClick={() => setSelectedSubId(null)}
          role="presentation"
        >
          <div
            className="submission-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="submission-modal-head">
              <div>
                <h2 id="modal-title">Submission Details</h2>
                <p className="modal-subtitle">ID: {selectedSubId}</p>
              </div>
              <button
                className="submission-modal-close-btn"
                type="button"
                onClick={() => setSelectedSubId(null)}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>

            {loadingDetails ? (
              <div className="modal-loading">
                <FaSpinner className="submission-spinner" />
                <p>Loading submission details...</p>
              </div>
            ) : !subDetails ? (
              <div className="modal-error">
                <p>Failed to load details for this submission.</p>
              </div>
            ) : (
              <div className="submission-modal-body">
                {/* Meta details strip */}
                <div className="submission-detail-meta-grid">
                  <div className="meta-item">
                    <span>Problem</span>
                    <strong>{subDetails.problemTitle ?? "Two sum"}</strong>
                  </div>
                  <div className="meta-item">
                    <span>Language</span>
                    <span className="lang-pill">{mapLanguageLabel(subDetails.language)}</span>
                  </div>
                  <div className="meta-item">
                    <span>Status</span>
                    <span className={`status-badge ${getStatusBadgeClass(subDetails.status)}`}>
                      {formatStatusText(subDetails.status)}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span>Runtime</span>
                    <strong>{formatRuntime(subDetails.time)}</strong>
                  </div>
                  <div className="meta-item">
                    <span>Memory</span>
                    <strong>{formatMemory(subDetails.memory)}</strong>
                  </div>
                </div>

                {/* Main panel layout: Code + Testcases */}
                <div className="submission-detail-content-layout">
                  {/* Left: Code Snippet */}
                  <div className="modal-section code-section">
                    <div className="section-header">
                      <h3>
                        <FaCode /> Submitted Code
                      </h3>
                      {subDetails.codeSnippet && (
                        <button
                          type="button"
                          className="copy-code-btn"
                          onClick={() => handleCopyCode(subDetails.codeSnippet)}
                        >
                          {copied ? (
                            <>
                              <FaCheck style={{ color: "#10b981" }} /> Copied
                            </>
                          ) : (
                            <>
                              <FaCopy /> Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="code-pre-wrapper">
                      {subDetails.codeSnippet ? (
                        <pre className="code-snippet-pre">
                          <code>
                            {subDetails.codeSnippet.split("\n").map((line, index) => (
                              <div key={index} className="code-line">
                                <span className="line-number">{index + 1}</span>
                                <span className="line-content">{line}</span>
                              </div>
                            ))}
                          </code>
                        </pre>
                      ) : (
                        <div className="no-code-msg">No code snippet available for this submission.</div>
                      )}
                    </div>
                  </div>

                  {/* Right: Test Cases */}
                  <div className="modal-section testcase-section">
                    <div className="section-header">
                      <h3>
                        <FaServer /> Test Case Breakdown
                      </h3>
                    </div>
                    {subDetails.tests && subDetails.tests.length > 0 ? (
                      <div className="testcase-table-wrapper">
                        <table className="testcase-table">
                          <thead>
                            <tr>
                              <th>Case ID</th>
                              <th>Verdict</th>
                              <th>Runtime</th>
                              <th>Memory</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subDetails.tests.map((test) => (
                              <tr key={test.caseId}>
                                <td>Case {test.caseId}</td>
                                <td>
                                  <span className={`status-badge ${getStatusBadgeClass(test.verdict)}`}>
                                    {formatStatusText(test.verdict)}
                                  </span>
                                </td>
                                <td>{formatRuntime(test.time)}</td>
                                <td>{formatMemory(test.memory)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="no-testcases-msg">
                        {subDetails.status === "compile_error" ? (
                          <div className="compile-error-box">
                            <strong>Compilation Error:</strong>
                            <pre className="compile-log-pre">
                              {`error: main.go:5:5: missing return at end of function\nmake: *** [build] Error 1`}
                            </pre>
                          </div>
                        ) : (
                          "No test case data available."
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionPage;
