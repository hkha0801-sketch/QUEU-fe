import React from "react";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { LeaderboardEntry, LeaderboardPeriod } from "../types/ranking.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <span className="rank-icon rank-icon--gold">1</span>;
  if (rank === 2) return <span className="rank-icon rank-icon--silver">2</span>;
  if (rank === 3) return <span className="rank-icon rank-icon--bronze">3</span>;
  return <span className="rank-icon rank-icon--normal">{rank}</span>;
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
      <button className="page-btn" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Previous
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="page-ellipsis">...</span>
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

function RankingRow({ entry }: { entry: LeaderboardEntry }) {
  const isTop3 = entry.rank <= 3;

  return (
    <tr className={`rank-row${isTop3 ? " rank-row--top3" : ""}`}>
      <td className="rank-col-rank">
        <RankIcon rank={entry.rank} />
      </td>
      <td className="rank-col-user">
        <div className="rank-user-cell">
          {entry.avatar ? (
            <img
              src={entry.avatar}
              alt={entry.name}
              className="rank-avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${entry.username}&background=f97316&color=fff&size=40`;
              }}
            />
          ) : (
            <div className="rank-avatar rank-avatar--placeholder">
              {entry.username.charAt(0).toUpperCase()}
            </div>
          )}
          <span
            className="rank-username"
            style={entry.tierColor ? { color: entry.tierColor } : undefined}
          >
            {entry.username}
          </span>
          {entry.tier && (
            <span className="rank-tier-badge" style={{ color: entry.tierColor }}>
              {entry.tier}
            </span>
          )}
        </div>
      </td>
      <td className="rank-col-rating">
        <span className="rank-rating">{entry.points.toLocaleString()}</span>
      </td>
      <td className="rank-col-solved">
        <span className="rank-solved">{entry.solved.toLocaleString()}</span>
      </td>
    </tr>
  );
}

// ─── Period Tabs ──────────────────────────────────────────────────────────────

const PERIOD_TABS: { key: LeaderboardPeriod; label: string }[] = [
  { key: "all", label: "Global" },
  { key: "monthly", label: "Country" },
  { key: "weekly", label: "Province" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

const RankingPage: React.FC = () => {
  const { data, loading, error, filters, setPeriod, setPage } = useLeaderboard();

  return (
    <div className="rank-page">
      {/* ── Header ── */}
      <div className="rank-header">
        <div className="rank-header-left">
          <h1 className="rank-title">
            <FaTrophy className="rank-title-icon" /> Global Ranking
          </h1>
          <p className="rank-subtitle">Top competitive programmers around the world.</p>
        </div>

        {/* Period tabs */}
        <div className="rank-tabs">
          {PERIOD_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`rank-tab${filters.period === tab.key ? " active" : ""}`}
              onClick={() => setPeriod(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rank-table-wrap">
        {loading ? (
          <div className="rank-loading">
            <div className="prob-spinner" />
            <span>Đang tải...</span>
          </div>
        ) : error ? (
          <div className="rank-error">⚠ {error}</div>
        ) : !data || data.items.length === 0 ? (
          <div className="rank-empty">
            <FaMedal />
            <p>Chưa có dữ liệu xếp hạng.</p>
          </div>
        ) : (
          <table className="rank-table">
            <thead>
              <tr>
                <th className="rank-col-rank">Rank</th>
                <th className="rank-col-user">User</th>
                <th className="rank-col-rating">Rating</th>
                <th className="rank-col-solved">Solved</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((entry) => (
                <RankingRow key={entry.userId} entry={entry} />
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

export default RankingPage;
