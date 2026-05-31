import { useState, useCallback, useRef } from "react";
import { InterviewConfig, InterviewMessage, InterviewReport, InterviewSession } from "../types/interview.types";
import { startInterview, sendAnswer, generateReport } from "../api/interviewApi";

function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export type InterviewPhase = "setup" | "session" | "generating-report" | "report";

export function useInterview() {
  const [phase, setPhase] = useState<InterviewPhase>("setup");
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startTimeRef = useRef<number>(0);

  const beginInterview = useCallback(async (config: InterviewConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const firstMsg = await startInterview(config);
      const sess: InterviewSession = {
        id: genId(),
        config,
        messages: [{ id: genId(), role: "interviewer", content: firstMsg, timestamp: Date.now() }],
        currentQuestionIndex: 0,
        isCompleted: false,
        startTime: Date.now(),
      };
      startTimeRef.current = Date.now();
      setSession(sess);
      setPhase("session");
    } catch {
      setError("Khong the bat dau phong van. Vui long thu lai.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (answer: string) => {
    if (!session || isLoading) return;
    setError(null);

    const candidateMsg: InterviewMessage = { id: genId(), role: "candidate", content: answer, timestamp: Date.now() };
    const updatedMsgs = [...session.messages, candidateMsg];
    setSession((prev) => prev ? { ...prev, messages: updatedMsgs } : prev);

    setIsLoading(true);
    try {
      const response = await sendAnswer(session.config, updatedMsgs, answer);
      const isComplete = response.includes("INTERVIEW_COMPLETE");
      const clean = response.replace("INTERVIEW_COMPLETE", "").trim();

      const interviewerMsg: InterviewMessage = { id: genId(), role: "interviewer", content: clean, timestamp: Date.now() };
      const finalMsgs = [...updatedMsgs, interviewerMsg];

      setSession((prev) =>
        prev ? { ...prev, messages: finalMsgs, currentQuestionIndex: prev.currentQuestionIndex + 1, isCompleted: isComplete } : prev
      );

      if (isComplete) {
        setPhase("generating-report");
        const secs = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const r = await generateReport(session.config, finalMsgs, secs);
        setReport(r);
        setPhase("report");
      }
    } catch {
      setError("Loi ket noi. Vui long thu lai.");
    } finally {
      setIsLoading(false);
    }
  }, [session, isLoading]);

  const resetInterview = useCallback(() => {
    setPhase("setup");
    setSession(null);
    setReport(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { phase, session, report, isLoading, error, beginInterview, submitAnswer, resetInterview };
}