import React from "react";
import { useInterview } from "../hooks/useInterview";
import InterviewSetup from "../components/InterviewSetup";
import InterviewSessionView from "../components/InterviewSessionView";
import InterviewReportView from "../components/InterviewReportView";

const InterviewPage: React.FC = () => {
  const { phase, session, report, isLoading, error, beginInterview, submitAnswer, resetInterview } =
    useInterview();

  if (phase === "setup") {
    return <InterviewSetup onStart={beginInterview} isLoading={isLoading} />;
  }

  if (phase === "generating-report") {
    return (
      <div className="interview-loading-screen">
        <div className="interview-spinner" />
        <div className="interview-loading-title">Dang phan tich buoi phong van...</div>
        <div className="interview-loading-sub">Arya dang doc lai toan bo cau tra loi va tao bao cao chi tiet.</div>
      </div>
    );
  }

  if (phase === "report" && report) {
    return <InterviewReportView report={report} onRestart={resetInterview} />;
  }

  if (phase === "session" && session) {
    return (
      <InterviewSessionView
        session={session}
        onSubmitAnswer={submitAnswer}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return null;
};

export default InterviewPage;