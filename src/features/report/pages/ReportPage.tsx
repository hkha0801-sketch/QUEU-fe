import React from "react";
import { ReportForm } from "../components/ReportForm";

const ReportPage: React.FC = () => {
  return (
    <div className="report-page">
      <h1 className="report-title">Report an issue</h1>
      <ReportForm />
    </div>
  );
};

export default ReportPage;