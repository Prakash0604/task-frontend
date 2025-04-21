// Example usage in a page or parent component

import React from "react";
import AnalyticsChart, { ChartData } from "./analytics-graph";

const chartData: ChartData[] = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 150 },
  { day: "Wed", value: 170 },
  { day: "Thu", value: 100 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 200 },
  { day: "Sun", value: 160 },
];

const Dashboard = () => {
  return (
    <div className="p-8">
      <AnalyticsChart data={chartData} lineColor="#4F46E5" />
    </div>
  );
};

export default Dashboard;
