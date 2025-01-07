import React from "react";

import { Icon } from "@iconify/react";

import "../styles/Statistics.css";

export interface Statistic {
  title: string;
  value: string;
  icon: string;
}

const Statistics = ({ stats }: { stats: Statistic[] }) => {
  return (
    <div className="statistics text-lg">
      <div className="statistics-container">
        {stats.map((stat, index) => (
          <div
            className="statistic flex flex-row justify-around gap-5"
            key={index}
          >
            <Icon icon={stat.icon} className="iconify-icon" />
            <div className="w-fit">
              <h2
                className="w-fit"
                style={{ margin: "0.5rem 0", fontSize: "2.3rem" }}
              >
                {stat.value}
              </h2>
              <div className="statistic-title">
                <p className="w-fit" style={{ margin: 0, textAlign: "left" }}>
                  {stat.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
