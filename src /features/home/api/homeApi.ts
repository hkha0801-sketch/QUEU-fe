import { HomeDashboard } from "../types/home.types";
import { homeMockData } from "../data/homeMock";

// ─── Toggle này để chuyển giữa mock và API thật ───────────────────────────────
const USE_MOCK = true;

const API_BASE = process.env.REACT_APP_API_URL ?? "http://localhost:8080/api";

// Khi có API thật, implement các hàm bên dưới và đặt USE_MOCK = false
async function fetchDashboardFromApi(): Promise<HomeDashboard> {
  const res = await fetch(`${API_BASE}/home/dashboard`);
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json() as Promise<HomeDashboard>;
}

async function fetchDashboardMock(): Promise<HomeDashboard> {
  // Giả lập network delay 300ms
  return new Promise((resolve) =>
    setTimeout(() => resolve(homeMockData), 300)
  );
}

export async function fetchDashboard(): Promise<HomeDashboard> {
  return USE_MOCK ? fetchDashboardMock() : fetchDashboardFromApi();
}
