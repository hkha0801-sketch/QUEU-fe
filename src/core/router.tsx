import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import HomePage from "../features/home/pages/HomePage";
import ChatPage from "../features/chat/pages/ChatPage";
import RoadmapPage from "../features/ai-roadmap/pages/RoadmapPage";
import SoloPage from "../features/solo/pages/SoloPage";
import EditorPage from "../features/editor/pages/EditorPage";
import InterviewPage from "../features/interview/pages/InterviewPage";
import ProblemPage from "../features/problem/pages/ProblemPage";
import ContestPage from "../features/contest/pages/ContestPage";
import SubmissionPage from "../features/submission/pages/SubmissionPage";
import RankingPage from "../features/ranking/pages/RankingPage";
import AboutPage from "../features/about/pages/AboutPage";
import ReportPage from "../features/report/pages/ReportPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/solo" element={<SoloPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/problems" element={<ProblemPage />} />
          <Route path="/contests" element={<ContestPage />} />
          <Route path="/submissions" element={<SubmissionPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
