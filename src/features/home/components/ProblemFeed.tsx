import React from "react";
import { Problem } from "../types/home.types";

interface Props {
  problems: Problem[];
}

const ProblemFeed: React.FC<Props> = ({ problems }) => {
  return (
    <div className="card problem-feed-card">
      <h3 className="card-title">Bài tập nổi bật</h3>
      <table className="problem-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>AC rate</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.acRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemFeed;
