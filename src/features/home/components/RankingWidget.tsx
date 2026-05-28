import React from "react";
import { RankingEntry } from "../types/home.types";

interface Props {
  rankings: RankingEntry[];
}

const RankingWidget: React.FC<Props> = ({ rankings }) => {
  return (
    <div className="card ranking-card">
      <h3 className="card-title">Bảng xếp hạng coder</h3>
      <table className="ranking-table">
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>ranking</th>
            <th>elo</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((entry, i) => (
            <tr key={i}>
              <td className="rank-num">#{entry.rank}</td>
              <td className="rank-name">
                <img src={entry.avatar} alt={entry.name} className="rank-avatar" />
                {entry.name}
              </td>
              <td>{entry.ranking}</td>
              <td>{entry.elo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingWidget;
