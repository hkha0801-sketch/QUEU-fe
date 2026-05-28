import React from "react";
import { Contest } from "../types/home.types";

interface Props {
  contest: Contest;
}

const ContestBanner: React.FC<Props> = ({ contest }) => {
  return (
    <div className="card contest-banner">
      <span className="contest-text">
        {contest.name} đang chuẩn bị ({contest.countdown})
      </span>
    </div>
  );
};

export default ContestBanner;
