import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaArrowLeft,
  FaClock,
  FaTrophy,
  FaSearch,
  FaUserFriends,
  FaFilter,
  FaSortAmountDown,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import {
  getContests,
  getRegisteredContests,
  registerContest,
  unregisterContest,
  getContestProblems,
  getContestSubmissions,
} from "../api/contestApi";
import {
  Contest,
  RegisteredContest,
  ContestProblem,
  ContestSubmission,
} from "../types/contest.types";

const viewModes = {
  DASHBOARD: "dashboard",
  CALENDAR: "calendar",
  PROBLEMS: "problems",
} as const;

type ViewMode = typeof viewModes[keyof typeof viewModes];

const ContestPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(viewModes.DASHBOARD);
  const [contests, setContests] = useState<Contest[]>([]);
  const [registeredContests, setRegisteredContests] = useState<RegisteredContest[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Registration feedback state
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  // Calendar View States
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  
  // View 3: Problems Table States
  const [activeContest, setActiveContest] = useState<Contest | null>(null);
  const [problems, setProblems] = useState<ContestProblem[]>([]);
  const [submissions, setSubmissions] = useState<ContestSubmission[]>([]);
  const [loadingProblems, setLoadingProblems] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Periodically update current time to keep countdowns accurate
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Dashboard data: contests & registered
  const fetchDashboardData = async () => {
    setLoadingDashboard(true);
    try {
      const [contestsRes, registeredRes] = await Promise.all([
        getContests(1, 20),
        getRegisteredContests(),
      ]);
      setContests(contestsRes.data.items);
      setRegisteredContests(registeredRes.data);
    } catch (err) {
      console.error("Error fetching contests dashboard:", err);
    } finally {
      setLoadingDashboard(false);
    }
  };

  useEffect(() => {
    if (viewMode === viewModes.DASHBOARD || viewMode === viewModes.CALENDAR) {
      fetchDashboardData();
    }
  }, [viewMode]);

  // Derived state: Registered Contest IDs
  const registeredIds = useMemo(() => {
    return new Set(registeredContests.map((c) => c.id));
  }, [registeredContests]);

  // Split contests into Active/Upcoming and Past
  const activeUpcomingContests = useMemo(() => {
    return contests.filter((c) => {
      const endAtTime = new Date(c.endAt).getTime();
      return endAtTime >= currentTime;
    });
  }, [contests, currentTime]);

  const pastContests = useMemo(() => {
    return contests.filter((c) => {
      const endAtTime = new Date(c.endAt).getTime();
      return endAtTime < currentTime;
    });
  }, [contests, currentTime]);

  // Handle Registration
  const handleRegister = async (contestId: string) => {
    setRegisteringId(contestId);
    try {
      await registerContest(contestId);
      // Refresh dashboard data
      await fetchDashboardData();
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setRegisteringId(null);
    }
  };

  // Handle Unregistration
  const handleUnregister = async (contestId: string) => {
    setRegisteringId(contestId);
    try {
      await unregisterContest(contestId);
      // Refresh dashboard data
      await fetchDashboardData();
    } catch (err) {
      console.error("Unregistration error:", err);
    } finally {
      setRegisteringId(null);
    }
  };

  // Switch to View 3 (Enter active registered contest)
  const handleEnterContest = async (contest: Contest) => {
    setActiveContest(contest);
    setViewMode(viewModes.PROBLEMS);
    setLoadingProblems(true);
    try {
      const [problemsRes, submissionsRes] = await Promise.all([
        getContestProblems(contest.id),
        getContestSubmissions(contest.id),
      ]);
      setProblems(problemsRes.data);
      setSubmissions(submissionsRes.data);
    } catch (err) {
      console.error("Error loading contest details:", err);
    } finally {
      setLoadingProblems(false);
    }
  };

  // Formatting helpers
  const formatCountdown = (targetDateStr: string, isOngoing: boolean) => {
    const diff = new Date(targetDateStr).getTime() - currentTime;
    if (diff <= 0) return isOngoing ? "Contest ended" : "Starting soon";

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${isOngoing ? "Ends" : "Starts"} in ${days} day${days > 1 ? "s" : ""}`;
    }

    const h = String(hours % 24).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");

    return `${isOngoing ? "Ends" : "Starts"} in ${h}:${m}:${s}`;
  };

  const getProblemStatus = (problemSlug: string) => {
    const probSubs = submissions.filter((s) => s.problemId === problemSlug);
    if (probSubs.length === 0) return null;

    const isAc = probSubs.some((s) => s.status === "accepted");
    if (isAc) return "AC";

    // Find the latest submission verdict
    const latest = probSubs[probSubs.length - 1];
    if (latest.status === "wrong_answer") return "WA";
    if (latest.status === "time_limit_exceeded") return "TLE";
    if (latest.status === "compile_error") return "CE";
    if (latest.status === "runtime_error") return "RE";
    if (latest.status === "memory_limit_exceeded") return "MLE";

    return "WA";
  };

  // Filters and Sorting for problems list
  const filteredProblems = useMemo(() => {
    let result = [...problems];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (difficultyFilter) {
      result = result.filter((p) => p.difficulty === difficultyFilter);
    }

    if (sortBy === "points-asc") {
      result.sort((a, b) => a.points - b.points);
    } else if (sortBy === "points-desc") {
      result.sort((a, b) => b.points - a.points);
    } else if (sortBy === "ac-desc") {
      result.sort((a, b) => b.acCount - a.acCount);
    }

    return result;
  }, [problems, searchQuery, difficultyFilter, sortBy]);

  // Calendar logic: dates of the current week (Sun - Sat)
  const currentWeekDays = useMemo(() => {
    const startOfWeek = new Date(calendarDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // Adjust to Sunday
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  }, [calendarDate]);

  const calendarEvents = useMemo(() => {
    return registeredContests.map((c) => {
      // API uses snake_case keys (start_time, end_time)
      const start = new Date(c.start_time);
      const end = new Date(c.end_time);
      return {
        id: c.id,
        title: c.title,
        start,
        end,
      };
    });
  }, [registeredContests]);

  const handlePrevWeek = () => {
    const d = new Date(calendarDate);
    d.setDate(d.getDate() - 7);
    setCalendarDate(d);
  };

  const handleNextWeek = () => {
    const d = new Date(calendarDate);
    d.setDate(d.getDate() + 7);
    setCalendarDate(d);
  };

  const handleToday = () => {
    setCalendarDate(new Date());
  };

  return (
    <div className="contest-page">
      {/* ───────────────────────────────────────────────────────────────────────
         VIEW 1: DASHBOARD
         ──────────────────────────────────────────────────────────────────── */}
      {viewMode === viewModes.DASHBOARD && (
        <section className="contest-dashboard-view">
          <div className="contest-dashboard-header">
            <div>
              <h1>Contests</h1>
              <p className="contest-subtitle">Compete with others and measure your skills.</p>
            </div>
            <button
              className="contest-my-btn"
              type="button"
              onClick={() => setViewMode(viewModes.CALENDAR)}
            >
              <FaCalendarAlt /> My Contests
            </button>
          </div>

          {loadingDashboard ? (
            <div className="contest-spinner-container">
              <FaSpinner className="contest-spinner" />
              <p>Loading contests dashboard...</p>
            </div>
          ) : (
            <>
              {/* Active & Upcoming Section */}
              <div className="dashboard-section">
                <h2 className="section-title">Active & Upcoming</h2>
                {activeUpcomingContests.length === 0 ? (
                  <div className="empty-section-card">No active or upcoming contests at the moment.</div>
                ) : (
                  <div className="contest-grid">
                    {activeUpcomingContests.map((c) => {
                      const startAtTime = new Date(c.startAt).getTime();
                      const endAtTime = new Date(c.endAt).getTime();
                      const isOngoing = currentTime >= startAtTime && currentTime <= endAtTime;
                      const isReg = registeredIds.has(c.id);

                      // Button rendering based on 4 states:
                      let buttonText = "Register";
                      let buttonClass = "contest-btn-register";
                      let buttonAction = () => handleRegister(c.id);
                      let isDisabled = false;

                      if (currentTime < startAtTime) {
                        // State 1 & 2: Upcoming
                        if (isReg) {
                          buttonText = "Cancel register";
                          buttonClass = "contest-btn-cancel";
                          buttonAction = () => handleUnregister(c.id);
                        } else {
                          buttonText = "Register";
                          buttonClass = "contest-btn-register";
                          buttonAction = () => handleRegister(c.id);
                        }
                      } else {
                        // State 3 & 4: Ongoing
                        buttonText = "Enter Contest";
                        if (isReg) {
                          buttonClass = "contest-btn-enter";
                          buttonAction = () => handleEnterContest(c);
                        } else {
                          buttonClass = "contest-btn-disabled";
                          isDisabled = true;
                        }
                      }

                      return (
                        <div className="contest-card" key={c.id}>
                          {isOngoing && <span className="ongoing-badge">LIVE</span>}
                          <div className="contest-card-icon">
                            {isOngoing ? <FaTrophy style={{ color: "#f59e0b" }} /> : <FaClock />}
                          </div>
                          <h3 className="contest-card-title">{c.title}</h3>
                          <p className="contest-countdown-text">
                            {formatCountdown(isOngoing ? c.endAt : c.startAt, isOngoing)}
                          </p>

                          <button
                            type="button"
                            className={`contest-action-btn ${buttonClass}`}
                            onClick={buttonAction}
                            disabled={isDisabled || registeringId === c.id}
                          >
                            {registeringId === c.id ? (
                              <FaSpinner className="contest-spinner-icon" />
                            ) : (
                              buttonText
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Past Contests Section */}
              <div className="dashboard-section past-section">
                <h2 className="section-title">Past Contests</h2>
                {pastContests.length === 0 ? (
                  <div className="empty-section-card">No past contests found.</div>
                ) : (
                  <div className="past-table-wrap">
                    <table className="past-table">
                      <thead>
                        <tr>
                          <th>Contest</th>
                          <th>Date</th>
                          <th>Participants</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastContests.map((c) => (
                          <tr key={c.id}>
                            <td className="past-title-cell">
                              <strong>{c.title}</strong>
                            </td>
                            <td>
                              {new Date(c.startAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>
                            <td>{(c.participantsCount ?? 0).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
         VIEW 2: CALENDAR
         ──────────────────────────────────────────────────────────────────── */}
      {viewMode === viewModes.CALENDAR && (
        <section className="contest-calendar-view">
          <div className="calendar-view-header">
            <button
              className="back-btn"
              type="button"
              onClick={() => setViewMode(viewModes.DASHBOARD)}
            >
              <FaArrowLeft /> Back to Contests
            </button>
            <div className="calendar-nav-controls">
              <button type="button" className="nav-arrow" onClick={handlePrevWeek}>
                &lt;
              </button>
              <button type="button" className="today-nav-btn" onClick={handleToday}>
                Today
              </button>
              <button type="button" className="nav-arrow" onClick={handleNextWeek}>
                &gt;
              </button>
            </div>
            <h1>My Contests Scheduled</h1>
          </div>

          <div className="calendar-main-layout">
            {/* Sidebar mini calendar */}
            <aside className="calendar-sidebar">
              <div className="mini-month-header">
                <h3>
                  {calendarDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
              </div>
              <div className="mini-grid-days">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>
              <div className="mini-grid-dates">
                {/* Generate standard calendar grid dates */}
                {(() => {
                  const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
                  const startOffset = firstDay.getDay();
                  const lastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);
                  const totalDays = lastDay.getDate();

                  const cells = [];
                  for (let i = 0; i < startOffset; i++) {
                    cells.push(<span key={`offset-${i}`} className="empty-cell" />);
                  }
                  for (let d = 1; d <= totalDays; d++) {
                    const isSelected =
                      calendarDate.getDate() === d &&
                      calendarDate.getMonth() === new Date().getMonth();
                    cells.push(
                      <span key={`date-${d}`} className={`date-cell ${isSelected ? "selected" : ""}`}>
                        {d}
                      </span>
                    );
                  }
                  return cells;
                })()}
              </div>
            </aside>

            {/* Weekly calendar main grid */}
            <div className="calendar-grid-wrapper">
              <div className="calendar-week-header">
                <div className="time-col-spacer" />
                {currentWeekDays.map((day, i) => {
                  const isCurrent =
                    day.getDate() === new Date().getDate() &&
                    day.getMonth() === new Date().getMonth();
                  return (
                    <div key={i} className={`week-day-header ${isCurrent ? "current" : ""}`}>
                      <span>
                        {day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
                      </span>
                      <strong>{day.getDate()}</strong>
                    </div>
                  );
                })}
              </div>

              <div className="calendar-grid-body">
                {/* Hourly time slots */}
                {Array.from({ length: 11 }, (_, hourIdx) => {
                  const hour = hourIdx + 7; // Hours 7 AM to 5 PM
                  const ampm = hour >= 12 ? "PM" : "AM";
                  const displayHour = hour > 12 ? hour - 12 : hour;

                  return (
                    <div className="calendar-hour-row" key={hourIdx}>
                      <div className="time-scale-label">
                        {displayHour} {ampm}
                      </div>

                      {currentWeekDays.map((dayDate, dayIdx) => {
                        // Filter registered contests that match the exact date
                        const dayEvents = calendarEvents.filter((ev) => {
                          const evStart = ev.start;
                          return (
                            evStart.getDate() === dayDate.getDate() &&
                            evStart.getMonth() === dayDate.getMonth() &&
                            evStart.getFullYear() === dayDate.getFullYear()
                          );
                        });

                        return (
                          <div className="calendar-grid-cell" key={dayIdx}>
                            {dayEvents.map((ev) => {
                              const evHour = ev.start.getHours() + ev.start.getMinutes() / 60;
                              const evDuration = (ev.end.getTime() - ev.start.getTime()) / (1000 * 60 * 60);

                              // Only draw inside the correct hour row slot to prevent overlapping
                              if (Math.floor(evHour) === hour) {
                                const topOffset = (evHour % 1) * 60; // offset in pixels
                                const heightPx = evDuration * 60;
                                return (
                                  <div
                                    key={ev.id}
                                    className="calendar-event-block"
                                    style={{
                                      top: `${topOffset}px`,
                                      height: `${heightPx}px`,
                                    }}
                                  >
                                    <strong>
                                      {ev.start.toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </strong>
                                    <span>{ev.title}</span>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
         VIEW 3: PROBLEMS TABLE
         ──────────────────────────────────────────────────────────────────── */}
      {viewMode === viewModes.PROBLEMS && activeContest && (
        <section className="contest-problems-view">
          <div className="contest-problems-header">
            <button
              className="back-btn"
              type="button"
              onClick={() => setViewMode(viewModes.DASHBOARD)}
            >
              <FaArrowLeft /> Back to Dashboard
            </button>
            <div className="title-area">
              <h1>{activeContest.title} - Problems:</h1>
              <p className="contest-subtitle">All problems in this contest</p>
            </div>
          </div>

          <div className="problems-control-bar">
            {/* Search problems */}
            <div className="problems-search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter by difficulty */}
            <div className="filter-wrapper">
              <button
                type="button"
                className="control-btn"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FaFilter /> {difficultyFilter ? difficultyFilter : "Filter"}
              </button>
              {isFilterOpen && (
                <ul className="control-dropdown">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setDifficultyFilter("");
                        setIsFilterOpen(false);
                      }}
                    >
                      All Difficulties
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setDifficultyFilter("EASY");
                        setIsFilterOpen(false);
                      }}
                    >
                      Easy
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setDifficultyFilter("MEDIUM");
                        setIsFilterOpen(false);
                      }}
                    >
                      Medium
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setDifficultyFilter("HARD");
                        setIsFilterOpen(false);
                      }}
                    >
                      Hard
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* Sort problems */}
            <div className="filter-wrapper">
              <button
                type="button"
                className="control-btn"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <FaSortAmountDown /> Sort by
              </button>
              {isSortOpen && (
                <ul className="control-dropdown">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("default");
                        setIsSortOpen(false);
                      }}
                    >
                      Default
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("points-asc");
                        setIsSortOpen(false);
                      }}
                    >
                      Points (Low to High)
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("points-desc");
                        setIsSortOpen(false);
                      }}
                    >
                      Points (High to Low)
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("ac-desc");
                        setIsSortOpen(false);
                      }}
                    >
                      Highest AC Count
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="problems-table-wrapper">
            {loadingProblems ? (
              <div className="contest-spinner-container">
                <FaSpinner className="contest-spinner" />
                <p>Loading problems...</p>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="empty-problems-msg">No problems found matching filters.</div>
            ) : (
              <table className="problems-table">
                <thead>
                  <tr>
                    <th>Trạng thái</th>
                    <th>Tên bài</th>
                    <th>AC count</th>
                    <th>Point</th>
                    <th>Max Point</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProblems.map((prob) => {
                    const statusVal = getProblemStatus(prob.slug);

                    let statusClass = "status-col--none";
                    let statusIcon = null;

                    if (statusVal === "AC") {
                      statusClass = "status-col--ac";
                      statusIcon = <FaCheckCircle />;
                    } else if (statusVal === "WA" || statusVal === "RE") {
                      statusClass = "status-col--wa";
                      statusIcon = <FaTimesCircle />;
                    } else if (statusVal === "TLE" || statusVal === "MLE" || statusVal === "CE") {
                      statusClass = "status-col--tle";
                      statusIcon = <FaExclamationCircle />;
                    }

                    return (
                      <tr key={prob.id}>
                        <td className={`status-col ${statusClass}`}>
                          {statusVal ? (
                            <>
                              {statusIcon} <span>{statusVal}</span>
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="title-col">
                          <Link to={`/editor?problem=${prob.slug}`}>{prob.title}</Link>
                        </td>
                        <td>{prob.acCount.toLocaleString()}</td>
                        <td className="points-col">{prob.points}</td>
                        <td className="points-max-col">{prob.maxPoints}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ContestPage;
