import { SoloPlayer, SoloMode } from "../types/solo.types";
import { mockPlayer, mockOpponent } from "../data/soloMock";

const USE_MOCK = true;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPlayerProfile(): Promise<SoloPlayer> {
  if (USE_MOCK) {
    await delay(300);
    return mockPlayer;
  }
  const res = await fetch("/api/solo/profile");
  if (!res.ok) throw new Error("Failed to fetch player profile");
  return res.json();
}

export async function findMatch(mode: SoloMode, roomCode?: string): Promise<SoloPlayer> {
  if (USE_MOCK) {
    // Simulate 3-second matchmaking delay
    await delay(3000);
    console.log("Matchmaking mode:", mode, roomCode);
    return mockOpponent;
  }
  const res = await fetch("/api/solo/match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, roomCode }),
  });
  if (!res.ok) throw new Error("Failed to find match");
  return res.json();
}

export async function submitCode(
  sessionId: string,
  code: string,
  language: string
): Promise<{ score: number; passed: number; total: number }> {
  if (USE_MOCK) {
    await delay(1500);
    console.log("Submitting code for session:", sessionId, "language:", language);
    const passed = Math.floor(Math.random() * 3) + 1;
    return { score: Math.round((passed / 3) * 100), passed, total: 3 };
  }
  const res = await fetch(`/api/solo/sessions/${sessionId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });
  if (!res.ok) throw new Error("Failed to submit code");
  return res.json();
}
