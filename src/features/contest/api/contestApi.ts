import {
  Contest,
  RegisteredContest,
  ContestProblem,
  ContestSubmission,
  ContestsListResponse,
  RegisteredContestsResponse,
  ContestDetailsResponse,
  ContestProblemsResponse,
  ContestSubmissionsResponse,
} from "../types/contest.types";
import {
  mockContests,
  mockRegisteredContests,
  mockContestProblems,
  mockContestSubmissions,
} from "../data/contestMock";

const USE_MOCK = true;
const API_BASE = process.env.REACT_APP_API_URL ?? "http://localhost:8080/api";
const MOCK_DELAY_MS = 500;

// Local in-memory state for mock registrations
let registeredStore = [...mockRegisteredContests];

function getAuthToken(): string | null {
  return (
    localStorage.getItem("accessToken") ??
    localStorage.getItem("token") ??
    localStorage.getItem("authToken")
  );
}

export async function getContests(page = 1, limit = 20): Promise<ContestsListResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
    const startIndex = (page - 1) * limit;
    const items = mockContests.slice(startIndex, startIndex + limit);
    return {
      status: "Success",
      message: "Contests fetched",
      data: {
        items,
        total: mockContests.length,
        page,
        limit,
      },
    };
  }

  const response = await fetch(`${API_BASE}/contests?page=${page}&limit=${limit}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch contests");
  return response.json() as Promise<ContestsListResponse>;
}

export async function getRegisteredContests(): Promise<RegisteredContestsResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
    return {
      status: "Success",
      message: "Registered contests fetched",
      data: registeredStore,
    };
  }

  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}/contests/registered`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch registered contests");
  return response.json() as Promise<RegisteredContestsResponse>;
}

export async function getContestDetails(contestId: string): Promise<ContestDetailsResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
    const contest = mockContests.find((c) => c.id === contestId);
    if (!contest) throw new Error("Contest not found");
    return {
      status: "Success",
      message: "Contest fetched",
      data: {
        ...contest,
        registeredUsers: [
          {
            id: "user_1",
            username: "normal_user",
            fullName: "Normal User",
            eloRating: 1200,
          },
        ],
      },
    };
  }

  const response = await fetch(`${API_BASE}/contests/${contestId}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch contest details");
  return response.json() as Promise<ContestDetailsResponse>;
}

export async function registerContest(contestId: string): Promise<{ status: string; message: string }> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
    const contest = mockContests.find((c) => c.id === contestId);
    if (contest && !registeredStore.some((c) => c.id === contestId)) {
      registeredStore.push({
        id: contest.id,
        title: contest.title,
        description: contest.description,
        start_time: contest.startAt,
        end_time: contest.endAt,
        status: contest.status,
      });
    }
    return { status: "Success", message: "Registered to contest" };
  }

  const token = getAuthToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}/contests/${contestId}/register`, {
    method: "POST",
    headers,
  });
  if (!response.ok) throw new Error("Failed to register for contest");
  return response.json() as Promise<{ status: string; message: string }>;
}

export async function unregisterContest(contestId: string): Promise<{ status: string; message: string }> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
    registeredStore = registeredStore.filter((c) => c.id !== contestId);
    return { status: "Success", message: "Unregistered from contest" };
  }

  const token = getAuthToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}/contests/${contestId}/unregister`, {
    method: "POST",
    headers,
  });
  if (!response.ok) throw new Error("Failed to unregister from contest");
  return response.json() as Promise<{ status: string; message: string }>;
}

export async function getContestProblems(contestId: string): Promise<ContestProblemsResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
    const problems = mockContestProblems[contestId] ?? [];
    return {
      status: "Success",
      message: "Contest problems fetched",
      data: problems,
    };
  }

  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}/contests/${contestId}/problems`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch contest problems");
  return response.json() as Promise<ContestProblemsResponse>;
}

export async function getContestSubmissions(contestId: string): Promise<ContestSubmissionsResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
    const subs = mockContestSubmissions[contestId] ?? [];
    return {
      status: "Success",
      message: "Contest submissions fetched",
      data: subs,
    };
  }

  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  // Using the submissions base URL or similar, assuming query param contestId
  const response = await fetch(`${API_BASE}/submissions?contestId=${contestId}`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch contest submissions");
  return response.json() as Promise<ContestSubmissionsResponse>;
}
