import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaRobot, FaCheckCircle } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";
import { useProblems } from "../hooks/useProblems";
import { Difficulty, ProblemListItem, SubmissionStatus } from "../types/problem.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DifficultyBadge({ level }: { level: Difficulty }) {
  const map: Record<Difficulty, { label: string; cls: string }> = {
    EASY: { label: "Dễ", cls: "badge-easy" },
    MEDIUM: { label: "Trung bình", cls: "badge-medium" },
    HARD: { label: "Khó", cls: "badge-hard" },
  };
  const { label, cls } = map[level];
  return <span className={`prob-badge ${cls}`}>{label}</span>;
}

function StatusLabel({ status }: { status: SubmissionStatus }) {
  if (!status) return <span className="prob-status prob-status--none">—</span>;
  const map: Record<NonNullable<SubmissionStatus>, { label: string; cls: string }> = {
    AC: { label: "AC", cls: "prob-status--ac" },
    WA: { label: "WA", cls: "prob-status--wa" },
    TLE: { label: "TLE", cls: "prob-status--tle" },
    MLE: { label: "MLE", cls: "prob-status--mle" },
    RE: { label: "RE", cls: "prob-status--re" },
    CE: { label: "CE", cls: "prob-status--ce" },
    PENDING: { label: "...", cls: "prob-status--pending" },
  };
  const { label, cls } = map[status];
  return <span className={`prob-status ${cls}`}>{label}</span>;
}

function Pagination({
  page,
  total,
  limit,
  onPage,
}: {
  page: number;
  total: number;
  limit: number;
  onPage: (p: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (page > 5) pages.push("...");
    if (page > 3 && page < totalPages - 2) pages.push(page);
    if (page < totalPages - 4) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        Previous
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="page-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={`page-btn${p === page ? " active" : ""}`}
            onClick={() => onPage(p as number)}
          >
            {p}
          </button>
        )
      )}
      <button
        className="page-btn"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

// ─── Filter Bar ────────────────────────────────────────────────────────────────

interface FilterBarProps {
  tags: string[];
  activeTag: string | undefined;
  activeDiff: Difficulty | undefined;
  onTag: (t: string | undefined) => void;
  onDiff: (d: Difficulty | undefined) => void;
}

function FilterBar({ tags, activeTag, activeDiff, onTag, onDiff }: FilterBarProps) {
  const difficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD"];
  const diffLabel: Record<Difficulty, string> = {
    EASY: "Dễ",
    MEDIUM: "Trung bình",
    HARD: "Khó",
  };

  return (
    <div className="prob-filter-bar">
      <div className="prob-filter-group">
        <span className="prob-filter-label">
          <MdOutlineFilterList /> Độ khó
        </span>
        <div className="prob-filter-chips">
          <button
            className={`prob-chip${!activeDiff ? " active" : ""}`}
            onClick={() => onDiff(undefined)}
          >
            Tất cả
          </button>
          {difficulties.map((d) => (
            <button
              key={d}
              className={`prob-chip prob-chip--${d.toLowerCase()}${activeDiff === d ? " active" : ""}`}
              onClick={() => onDiff(activeDiff === d ? undefined : d)}
            >
              {diffLabel[d]}
            </button>
          ))}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="prob-filter-group">
          <span className="prob-filter-label">Tag</span>
          <div className="prob-filter-chips prob-filter-chips--tags">
            <button
              className={`prob-chip${!activeTag ? " active" : ""}`}
              onClick={() => onTag(undefined)}
            >
              Tất cả
            </button>
            {tags.slice(0, 12).map((t) => (
              <button
                key={t}
                className={`prob-chip${activeTag === t ? " active" : ""}`}
                onClick={() => onTag(activeTag === t ? undefined : t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Problem Row ──────────────────────────────────────────────────────────────

function ProblemRow({
  problem,
  index,
  onNavigate,
}: {
  problem: ProblemListItem;
  index: number;
  onNavigate: (slug: string) => void;
}) {
  return (
    <tr
      className={`prob-row${index % 2 === 0 ? "" : " prob-row--alt"}`}
      onClick={() => onNavigate(problem.slug)}
    >
      <td className="prob-col-status">
        <StatusLabel status={problem.userStatus} />
      </td>
      <td className="prob-col-title">
        <span className="prob-title">{problem.title}</span>
        <div className="prob-tags">
          {problem.tags.map((tag) => (
            <span key={tag} className="prob-tag">
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="prob-col-acrate">
        <span className="prob-acrate">{problem.acRate.toFixed(2)}%</span>
      </td>
      <td className="prob-col-diff">
        <DifficultyBadge level={problem.difficulty} />
      </td>
      <td className="prob-col-ai">
        {problem.hasAI && (
          <button
            className="prob-ai-btn"
            title="Hỏi Arya AI"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: open AI hint panel
            }}
          >
            <FaRobot />
          </button>
        )}
      </td>
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProblemPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    data,
    tags,
    loading,
    error,
    filters,
    setSearch,
    setDifficulty,
    setTag,
    setPage,
  } = useProblems();

  const [searchInput, setSearchInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearch(searchInput.trim());
    },
    [searchInput, setSearch]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      if (e.target.value === "") setSearch("");
    },
    [setSearch]
  );

  const handleNavigate = useCallback(
    (slug: string) => {
      navigate(`/editor?problem=${slug}`);
    },
    [navigate]
  );

  return (
    <div className="prob-page">
      {/* ── Header ── */}
      <div className="prob-header">
        <div className="prob-header-left">
          <h1 className="prob-title-main">Problems</h1>
          <p className="prob-subtitle">Top problems today</p>
        </div>

        <div className="prob-header-right">
          {/* Search */}
          <form className="prob-search-form" onSubmit={handleSearchSubmit}>
            <FaSearch className="prob-search-icon" />
            <input
              className="prob-search-input"
              type="text"
              placeholder="Search problems..."
              value={searchInput}
              onChange={handleSearchChange}
            />
          </form>

          {/* Filter toggle */}
          <button
            className={`prob-filter-btn${showFilter ? " active" : ""}`}
            onClick={() => setShowFilter((v) => !v)}
          >
            <MdOutlineFilterList /> Filter
          </button>

          {/* Sort (future) */}
          <button className="prob-filter-btn">Sort by</button>
        </div>
      </div>

      {/* ── Filter panel ── */}
      {showFilter && (
        <FilterBar
          tags={tags}
          activeTag={filters.tag}
          activeDiff={filters.difficulty}
          onTag={setTag}
          onDiff={setDifficulty}
        />
      )}

      {/* ── Active filters indicator ── */}
      {(filters.difficulty || filters.tag || filters.q) && (
        <div className="prob-active-filters">
          {filters.difficulty && (
            <span className="prob-active-chip">
              Độ khó: {filters.difficulty}
              <button onClick={() => setDifficulty(undefined)}>×</button>
            </span>
          )}
          {filters.tag && (
            <span className="prob-active-chip">
              Tag: {filters.tag}
              <button onClick={() => setTag(undefined)}>×</button>
            </span>
          )}
          {filters.q && (
            <span className="prob-active-chip">
              Tìm: "{filters.q}"
              <button
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                }}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* ── Table ── */}
      <div className="prob-table-wrap">
        {loading ? (
          <div className="prob-loading">
            <div className="prob-spinner" />
            <span>Đang tải...</span>
          </div>
        ) : error ? (
          <div className="prob-error">
            <span>⚠ {error}</span>
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="prob-empty">
            <FaCheckCircle />
            <p>Không tìm thấy bài toán nào.</p>
          </div>
        ) : (
          <table className="prob-table">
            <thead>
              <tr>
                <th className="prob-col-status">Trạng thái</th>
                <th className="prob-col-title">Tên bài</th>
                <th className="prob-col-acrate">Tỉ lệ AC</th>
                <th className="prob-col-diff">Độ khó</th>
                <th className="prob-col-ai">Hỏi Arya</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((p, i) => (
                <ProblemRow
                  key={p.id}
                  problem={p}
                  index={i}
                  onNavigate={handleNavigate}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Pagination ── */}
      {data && data.total > data.limit && (
        <Pagination
          page={filters.page}
          total={data.total}
          limit={filters.limit}
          onPage={setPage}
        />
      )}
    </div>
  );
};

export default ProblemPage;
