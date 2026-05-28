import React from "react";

interface Props {
  month: string;
  today: number;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// May 2026 starts on Friday (index 5)
const MAY_2026_START = 5;
const MAY_2026_DAYS = 31;

const CalendarWidget: React.FC<Props> = ({ month, today }) => {
  const cells: (number | null)[] = [
    ...Array(MAY_2026_START).fill(null),
    ...Array.from({ length: MAY_2026_DAYS }, (_, i) => i + 1),
  ];

  return (
    <div className="card calendar-card">
      <div className="calendar-header">
        <button className="cal-nav">&#8249;</button>
        <span className="cal-month">{month}</span>
        <button className="cal-nav">&#8250;</button>
      </div>
      <div className="calendar-grid">
        {DAYS.map((d) => (
          <div key={d} className="cal-day-label">{d}</div>
        ))}
        {cells.map((day, i) => (
          <div
            key={i}
            className={`cal-day${day === today ? " cal-today" : ""}${day === null ? " cal-empty" : ""}`}
          >
            {day ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
