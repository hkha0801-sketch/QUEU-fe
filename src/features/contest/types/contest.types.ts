export type ContestStatus = "UPCOMING" | "ONGOING" | "FINISHED";

export interface Contest {
  id: string;
  title: string;
  startAt: string; // ISO String or date format
  endAt: string;
  status: ContestStatus;
  description?: string;
  durationMinutes?: number;
  participantsCount?: number;
}

// The registered contest schema uses snake_case as specified
export interface RegisteredContest {
  id: string;
  title: string;
  description?: string;
  start_time: string; // ISO date-time string
  end_time: string;
  status: ContestStatus;
}

export interface ContestUser {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  eloRating?: number;
}

export interface ContestDetails extends Contest {
  registeredUsers?: ContestUser[];
}

export interface ContestProblem {
  id: string;
  slug: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  acCount: number;
  points: number;
  maxPoints: number;
}

export interface ContestSubmission {
  submissionId: string;
  problemId: string;
  status: "accepted" | "wrong_answer" | "time_limit_exceeded" | "compile_error" | "runtime_error" | "memory_limit_exceeded";
  pointsObtained: number;
}

export interface ContestsListResponse {
  status: string;
  message: string;
  data: {
    items: Contest[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface RegisteredContestsResponse {
  status: string;
  message: string;
  data: RegisteredContest[];
}

export interface ContestDetailsResponse {
  status: string;
  message: string;
  data: ContestDetails;
}

export interface ContestProblemsResponse {
  status: string;
  message: string;
  data: ContestProblem[];
}

export interface ContestSubmissionsResponse {
  status: string;
  message: string;
  data: ContestSubmission[];
}
