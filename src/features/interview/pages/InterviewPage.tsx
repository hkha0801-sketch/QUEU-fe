import React from "react";
import { useInterview } from "../hooks/useInterview";
import InterviewSetup from "../components/InterviewSetup";
import InterviewSessionView from "../components/InterviewSessionView";
import InterviewReportView from "../components/InterviewReportView";
import InterviewLanding from "../components/InterviewLanding";

const InterviewPage: React.FC = () => {
  const {
    phase,
    session,
    report,
    isLoading,
    error,
    goToSetup,
    beginInterview,
    submitAnswer,
    resetInterview,
  } = useInterview();

  if (phase === "landing") {
    return <InterviewLanding onStartNow={goToSetup} />;
  }

  if (phase === "setup") {
    return <InterviewSetup onStart={beginInterview} isLoading={isLoading} onBack={resetInterview} />;
  }

  if (phase === "generating-report") {
    return (
      <div className="interview-loading-screen">
        <div className="interview-spinner" />
        <div className="interview-loading-title">Đang phân tích buổi phỏng vấn...</div>
        <div className="interview-loading-sub">
          Arya đang đọc lại toàn bộ câu trả lời và tạo báo cáo chi tiết.
        </div>
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