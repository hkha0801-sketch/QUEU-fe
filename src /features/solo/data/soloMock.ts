import { SoloPlayer, MatchHistory, SoloProblem } from "../types/solo.types";

export const mockPlayer: SoloPlayer = {
  id: "player-1",
  name: "Anh Khoi",
  avatar: "/shidoon-blue-icon.jpg",
  rank: "VÀNG III",
  elo: 1650,
  winRate: 54.2,
  globalRank: 4201,
};

export const mockOpponent: SoloPlayer = {
  id: "opponent-1",
  name: "Bảy gao bạc",
  avatar: "/shidoon-blue-icon.jpg",
  rank: "Silver I",
  elo: 1660,
  winRate: null,
};

export const mockMatchHistory: MatchHistory[] = [
  {
    id: "h1",
    opponent: { id: "o1", name: "Minh Tú", avatar: "/shidoon-blue-icon.jpg", rank: "VÀNG II", elo: 1620, winRate: 48.5 },
    result: "win",
    date: "05/08/2026",
  },
  {
    id: "h2",
    opponent: { id: "o2", name: "Hải Long", avatar: "/shidoon-blue-icon.jpg", rank: "BẠC I", elo: 1580, winRate: 45.0 },
    result: "win",
    date: "05/08/2026",
  },
  {
    id: "h3",
    opponent: { id: "o3", name: "Bảy gao bạc", avatar: "/shidoon-blue-icon.jpg", rank: "Silver I", elo: 1660, winRate: null },
    result: "lose",
    date: "05/08/2026",
  },
  {
    id: "h4",
    opponent: { id: "o4", name: "Quang Vinh", avatar: "/shidoon-blue-icon.jpg", rank: "VÀNG I", elo: 1700, winRate: 60.1 },
    result: "win",
    date: "05/08/2026",
  },
  {
    id: "h5",
    opponent: { id: "o5", name: "Thanh Hà", avatar: "/shidoon-blue-icon.jpg", rank: "VÀNG III", elo: 1640, winRate: 52.3 },
    result: "win",
    date: "05/08/2026",
  },
  {
    id: "h6",
    opponent: { id: "o6", name: "Đức Anh", avatar: "/shidoon-blue-icon.jpg", rank: "BẠC II", elo: 1560, winRate: 41.7 },
    result: "win",
    date: "05/08/2026",
  },
];

export const mockProblem: SoloProblem = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
    },
  ],
  testCases: [
    { name: "Case 1", inputs: { nums: "[2,7,11,15]", target: "9" } },
    { name: "Case 2", inputs: { nums: "[3,2,4]", target: "6" } },
    { name: "Case 3", inputs: { nums: "[3,3]", target: "6" } },
  ],
  starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
};
