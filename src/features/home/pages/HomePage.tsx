import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import UserProfileStats from "../components/UserProfileStats";
import ContestBanner from "../components/ContestBanner";
import GoalList from "../components/GoalList";
import ProgressChart from "../components/ProgressChart";
import RankingWidget from "../components/RankingWidget";
import ProblemFeed from "../components/ProblemFeed";
import CalendarWidget from "../components/CalendarWidget";

const HomePage: React.FC = () => {
  const { data, loading, error } = useDashboard();

  if (loading) return <div className="home-loading">Đang tải...</div>;
  if (error || !data) return <div className="home-error">Không thể tải dữ liệu.</div>;

  return (
    <div className="home-page">

      {/* 2 cột trái: greeting + divider + content */}
      <div className="home-main-cols">
        {/* Greeting + divider — trải full width 2 cột */}
        <div className="home-header">
          <div className="user-greeting">
            <img src={data.user.avatar} alt={data.user.name} className="user-avatar" />
            <div>
              <h2 className="user-name">Xin chào, {data.user.name}!</h2>
              <p className="user-sub">{data.user.greeting}</p>
            </div>
          </div>
          <hr className="divider-full" />
        </div>

        {/* 2 cột nội dung */}
        <div className="home-two-cols">
          {/* Left — skills + stats */}
          <UserProfileStats
            skills={data.skills}
            stats={data.exerciseStats}
          />

          {/* Mid — contest + goals + checklist */}
          <div className="home-mid-col">
            <ContestBanner contest={data.contest} />
            <GoalList goals={data.goals} />
            <ProgressChart
              overall={data.checklistProgress}
              phases={data.checklistPhases}
            />
          </div>
        </div>
      </div>

      {/* Cột phải — calendar + ranking + problems */}
      <div className="home-right-col">
        <CalendarWidget month={data.currentMonth} today={data.today} />
        <RankingWidget rankings={data.rankings} />
        <ProblemFeed problems={data.featuredProblems} />
      </div>

    </div>
  );
};

export default HomePage;
