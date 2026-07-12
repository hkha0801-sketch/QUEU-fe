import { Contest, RegisteredContest, ContestProblem, ContestSubmission } from "../types/contest.types";

const now = Date.now();

// ISO dates helper
const makeDate = (offsetMs: number): string => new Date(now + offsetMs).toISOString();

export const mockContests: Contest[] = [
  {
    id: "contest_389",
    title: "Weekly Contest 389",
    startAt: makeDate(-45 * 60 * 1000), // Started 45m ago
    endAt: makeDate(2 * 60 * 60 * 1000 + 15 * 60 * 1000), // Ends in 2h 15m
    status: "ONGOING",
    description: "Compete with global coders on weekly algorithmic challenges.",
    durationMinutes: 180,
    participantsCount: 12500,
  },
  {
    id: "contest_126",
    title: "Biweekly Contest 126",
    startAt: makeDate(24 * 60 * 60 * 1000), // Starts in 24 hours (1 day)
    endAt: makeDate(27 * 60 * 60 * 1000),
    status: "UPCOMING",
    description: "Biweekly algorithms contest sponsored by Google Cloud.",
    durationMinutes: 180,
    participantsCount: 8500,
  },
  {
    id: "contest_388",
    title: "Weekly Contest 388",
    startAt: new Date(now - 7 * 24 * 3600 * 1000).toISOString(),
    endAt: new Date(now - 7 * 24 * 3600 * 1000 + 3 * 3600 * 1000).toISOString(),
    status: "FINISHED",
    description: "Algorithmic puzzles on greedy heuristics and trees.",
    durationMinutes: 180,
    participantsCount: 24512,
  },
  {
    id: "contest_125",
    title: "Biweekly Contest 125",
    startAt: new Date(now - 14 * 24 * 3600 * 1000).toISOString(),
    endAt: new Date(now - 14 * 24 * 3600 * 1000 + 3 * 3600 * 1000).toISOString(),
    status: "FINISHED",
    description: "Array sorting and geometry queries.",
    durationMinutes: 180,
    participantsCount: 18293,
  },
  {
    id: "contest_387",
    title: "Weekly Contest 387",
    startAt: new Date(now - 21 * 24 * 3600 * 1000).toISOString(),
    endAt: new Date(now - 21 * 24 * 3600 * 1000 + 3 * 3600 * 1000).toISOString(),
    status: "FINISHED",
    description: "Advanced graph flow and recursion structures.",
    durationMinutes: 180,
    participantsCount: 26104,
  }
];

// Initial registered contests (mocking that the user is registered for the live one)
// Note: dates here use snake_case start_time and end_time
export const mockRegisteredContests: RegisteredContest[] = [
  {
    id: "contest_389",
    title: "Weekly Contest 389",
    description: "Compete with global coders on weekly algorithmic challenges.",
    start_time: makeDate(-45 * 60 * 1000),
    end_time: makeDate(2 * 60 * 60 * 1000 + 15 * 60 * 1000),
    status: "ONGOING",
  }
];

// Contest Problems Mock
export const mockContestProblems: Record<string, ContestProblem[]> = {
  contest_389: [
    {
      id: "cp_1",
      slug: "two-sum",
      title: "1. Two sum",
      difficulty: "EASY",
      acCount: 10012,
      points: 100,
      maxPoints: 500,
    },
    {
      id: "cp_2",
      slug: "add-two-numbers",
      title: "2. Add Two Numbers",
      difficulty: "MEDIUM",
      acCount: 1000,
      points: 200,
      maxPoints: 500,
    },
    {
      id: "cp_3",
      slug: "longest-substring",
      title: "3. Longest Substring Without Repeating Characters",
      difficulty: "MEDIUM",
      acCount: 30,
      points: 300,
      maxPoints: 500,
    },
    {
      id: "cp_4",
      slug: "median-sorted-arrays",
      title: "4. Median of Two Sorted Arrays",
      difficulty: "HARD",
      acCount: 2,
      points: 500,
      maxPoints: 500,
    }
  ]
};

// User Submissions during the contest
export const mockContestSubmissions: Record<string, ContestSubmission[]> = {
  contest_389: [
    {
      submissionId: "cs_1",
      problemId: "two-sum",
      status: "time_limit_exceeded",
      pointsObtained: 0,
    },
    {
      submissionId: "cs_2",
      problemId: "two-sum",
      status: "accepted", // AC
      pointsObtained: 100,
    },
    {
      submissionId: "cs_3",
      problemId: "add-two-numbers",
      status: "wrong_answer", // WA
      pointsObtained: 0,
    },
    {
      submissionId: "cs_4",
      problemId: "longest-substring",
      status: "time_limit_exceeded", // TLE
      pointsObtained: 0,
    }
  ]
};
