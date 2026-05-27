export type SoloMode = "rank" | "arya" | "room";
export type MatchStatus = "searching" | "found" | "ready" | "playing" | "finished";
export type MatchResult = "win" | "lose" | "draw";

export interface SoloPlayer {
  id: string;
  name: string;
  avatar: string;
  rank: string;
  elo: number;
  winRate: number | null; // null = ẩn
  globalRank?: number;
}

export interface MatchHistory {
  id: string;
  opponent: SoloPlayer;
  result: MatchResult;
  date: string;
}

export interface SoloProblem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  description: string;
  examples: { input: string; output: string; explanation: string }[];
  testCases: { name: string; inputs: Record<string, string> }[];
  starterCode: string;
}

export interface SoloSession {
  id: string;
  mode: SoloMode;
  player: SoloPlayer;
  opponent: SoloPlayer | null;
  problem: SoloProblem | null;
  status: MatchStatus;
  timeLeft: number; // seconds
  result: MatchResult | null;
}
