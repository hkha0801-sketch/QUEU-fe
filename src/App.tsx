import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import Login from "./features/auth/pages/LoginPage";
import Register from "./features/auth/pages/RegisterPage";
import HomePage from "./features/home/pages/HomePage";
import ChatPage from "./features/chat/pages/ChatPage";
import UpgradePlanPage from "./features/chat/pages/UpgradePlanPage";
import RoadmapPage from "./features/ai-roadmap/pages/RoadmapPage";
import SoloPage from "./features/solo/pages/SoloPage";
import MatchmakingPage from "./features/solo/pages/MatchmakingPage";
import SoloEditorPage from "./features/solo/pages/SoloEditorPage";
import SoloResultPage from "./features/solo/pages/SoloResultPage";
import EditorPage from "./features/editor/pages/EditorPage";
import InterviewPage from "./features/interview/pages/InterviewPage";
import ProblemPage from "./features/problem/pages/ProblemPage";
import ContestPage from "./features/contest/pages/ContestPage";
import SubmissionPage from "./features/submission/pages/SubmissionPage";
import RankingPage from "./features/ranking/pages/RankingPage";
import AboutPage from "./features/about/pages/AboutPage";
import ReportPage from "./features/report/pages/ReportPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Auth - không Sidebar/Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App - có Sidebar/Navbar qua MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/upgrade" element={<UpgradePlanPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/solo" element={<SoloPage />} />
          <Route path="/solo/matchmaking" element={<MatchmakingPage />} />
          <Route path="/solo/editor/:sessionId" element={<SoloEditorPage />} />
          <Route path="/solo/result/:sessionId" element={<SoloResultPage />} />
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

export default App;