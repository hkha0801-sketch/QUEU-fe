import { HomeDashboard } from "../types/home.types";

export const homeMockData: HomeDashboard = {
  user: {
    name: "Bé Bự",
    avatar: "/shidoon-blue-icon.jpg",
    greeting: "Cùng luyện tập để tiến bộ mỗi ngày nào!",
  },

  skills: [
    { name: "Kỹ năng Code", level: "Intermediate", progress: 50 },
    { name: "Tư duy thuật toán", level: "Intermediate", progress: 50 },
    { name: "Kỹ năng giao tiếp", level: "Intermediate", progress: 50 },
  ],

  goals: [
    {
      id: 1,
      text: "Vượt qua phỏng vấn giả lập",
      icon: "interview",
      completed: false,
      isPrimary: true,
    },
    {
      id: 2,
      text: "Chiến thắng 1 trận Solo 1vs1",
      icon: "solo",
      completed: false,
      isPrimary: false,
    },
    {
      id: 3,
      text: "Hoàn thành bài tập DSA",
      icon: "dsa",
      completed: false,
      isPrimary: false,
    },
  ],

  exerciseStats: {
    totalHours: 16,
    totalExercises: 45,
    totalInterviewTests: 20,
  },

  contest: {
    name: "contest xxx",
    countdown: "20 phút nữa",
  },

  checklistProgress: 29,

  checklistPhases: [
    { phase: "PHẦN 1", name: "Cơ bản", progress: 100 },
    { phase: "PHẦN 2", name: "FE", progress: 50 },
    { phase: "PHẦN 1", name: "Cơ bản", progress: 100 },
    { phase: "PHẦN 1", name: "Cơ bản", progress: 100 },
    { phase: "PHẦN 1", name: "Cơ bản", progress: 100 },
    { phase: "PHẦN 1", name: "Cơ bản", progress: 100 },
  ],

  rankings: [
    { rank: 1, name: "Bây gao", avatar: "/shidoon-blue-icon.jpg", ranking: "Legendary", elo: 4010 },
    { rank: 1, name: "Bây gao", avatar: "/shidoon-blue-icon.jpg", ranking: "Legendary", elo: 4010 },
    { rank: 1, name: "Bây gao", avatar: "/shidoon-blue-icon.jpg", ranking: "Legendary", elo: 4010 },
  ],

  featuredProblems: [
    { id: 1, name: "Two sum", acRate: 69 },
    { id: 2, name: "Two sum", acRate: 69 },
    { id: 3, name: "Two sum", acRate: 69 },
  ],

  currentMonth: "May 2026",
  today: 19,
};
