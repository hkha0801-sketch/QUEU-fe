export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Proficient";
  progress: number; // 0-100
}

export interface UserProfile {
  name: string;
  avatar: string;
  greeting: string;
}

export interface Goal {
  id: number;
  text: string;
  icon: string; // emoji or icon key
  completed: boolean;
  isPrimary: boolean; // hiển thị nút "Bắt đầu"
}

export interface ExerciseStats {
  totalHours: number;
  totalExercises: number;
  totalInterviewTests: number;
}

export interface Contest {
  name: string;
  countdown: string; // "20 phút nữa"
}

export interface ChecklistPhase {
  phase: string;
  name: string;
  progress: number; // 0-100
}

export interface RankingEntry {
  rank: number;
  name: string;
  avatar: string;
  ranking: string;
  elo: number;
}

export interface Problem {
  id: number;
  name: string;
  acRate: number; // percentage
}

export interface HomeDashboard {
  user: UserProfile;
  skills: Skill[];
  goals: Goal[];
  exerciseStats: ExerciseStats;
  contest: Contest;
  checklistProgress: number; // overall % (29)
  checklistPhases: ChecklistPhase[];
  rankings: RankingEntry[];
  featuredProblems: Problem[];
  currentMonth: string;
  today: number;
}
