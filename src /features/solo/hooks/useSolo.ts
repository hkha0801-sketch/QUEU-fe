import { useState, useEffect, useCallback, useRef } from "react";
import { SoloSession, SoloMode, MatchStatus } from "../types/solo.types";
import { mockPlayer, mockProblem } from "../data/soloMock";
import { findMatch, submitCode as apiSubmitCode } from "../api/soloApi";

const INITIAL_TIME = 15 * 60 + 57; // 15:57 in seconds

export function useSolo(mode?: SoloMode, roomCode?: string) {
  const [session, setSession] = useState<SoloSession>({
    id: "session-" + Date.now(),
    mode: mode ?? "rank",
    player: mockPlayer,
    opponent: null,
    problem: mockProblem,
    status: "searching",
    timeLeft: INITIAL_TIME,
    result: null,
  });

  const [matchStatus, setMatchStatus] = useState<MatchStatus>("searching");
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [code, setCode] = useState(mockProblem.starterCode);
  const [language, setLanguage] = useState("JavaScript");
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const matchmakingRef = useRef<boolean>(false);

  // Timer countdown (only when playing)
  useEffect(() => {
    if (matchStatus === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [matchStatus]);

  const startMatchmaking = useCallback(async () => {
    if (matchmakingRef.current) return;
    matchmakingRef.current = true;
    setMatchStatus("searching");

    try {
      const opponent = await findMatch(session.mode, roomCode);
      setSession((prev) => ({ ...prev, opponent, status: "found" }));
      setMatchStatus("found");
    } catch (err) {
      console.error("Matchmaking failed:", err);
      setMatchStatus("searching");
    } finally {
      matchmakingRef.current = false;
    }
  }, [session.mode, roomCode]);

  const cancelMatchmaking = useCallback(() => {
    matchmakingRef.current = false;
    setMatchStatus("searching");
    setSession((prev) => ({ ...prev, opponent: null, status: "searching" }));
  }, []);

  const startGame = useCallback(() => {
    setMatchStatus("playing");
    setSession((prev) => ({ ...prev, status: "playing" }));
  }, []);

  const runCode = useCallback(() => {
    console.log("Running code:", code, "language:", language);
    // Mock run — just log for now
  }, [code, language]);

  const submitCode = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await apiSubmitCode(session.id, code, language);
      console.log("Submit result:", result);
      const matchResult = result.passed === result.total ? "win" : "lose";
      setSession((prev) => ({ ...prev, result: matchResult, status: "finished" }));
      setMatchStatus("finished");
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, session.id, code, language]);

  return {
    session,
    matchStatus,
    timeLeft,
    code,
    language,
    activeTestCase,
    isSubmitting,
    setCode,
    setLanguage,
    setActiveTestCase,
    startMatchmaking,
    cancelMatchmaking,
    startGame,
    runCode,
    submitCode,
  };
}
