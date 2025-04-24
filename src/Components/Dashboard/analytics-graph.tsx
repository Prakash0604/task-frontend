import React, { useState } from "react";

export interface ChartData {
  day: string;
  value: number;
  details?: string;
}

interface AnalyticsChartProps {
  data: ChartData[];
  lineColor: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, lineColor }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value));
  const roundedMax = Math.ceil(maxValue / 10) * 10;

  const getX = (index: number) => (index * 100) / (data.length - 1);
  const getY = (value: number) => 100 - (value / roundedMax) * 100;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)},${getY(d.value)}`)
    .join(" ");
  const areaPath = linePath + ` L 100,100 L 0,100 Z`;

  return (
    <div className="w-full h-64 p-4 border rounded relative bg-white dark:bg-gray-800">
      {/* Grid Lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 w-full border-t border-dashed border-gray-300 text-xs text-gray-400"
          style={{ top: `${(i * 100) / 5}%` }}
        >
          <span className="absolute -left-8 -mt-2">
            {((5 - i) * roundedMax) / 5}
          </span>
        </div>
      ))}

      {/* X-axis labels */}
      <div className="absolute bottom-2 left-0 flex w-full justify-between px-6 text-xs text-gray-500">
        {data.map((d, i) => (
          <div key={i} className="text-center w-10">
            {d.day}
          </div>
        ))}
      </div>

      {/* Chart */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Area */}
        <path d={areaPath} fill={`${lineColor}33`} />
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Points */}
        {data.map((d, i) => {
          const x = getX(i);
          const y = getY(d.value);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="3"
                fill={lineColor}
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {hoveredIndex === i && (
                <>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="white"
                    stroke={lineColor}
                    strokeWidth="2"
                  />
                  <circle cx={x} cy={y} r="3" fill={lineColor} />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div
          className="absolute bg-black text-[#2596be] text-xs px-2 py-1 rounded"
          style={{
            left: `calc(${getX(hoveredIndex)}% + 12px)`,
            bottom: `calc(${getY(data[hoveredIndex].value)}% + 30px)`,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {data[hoveredIndex].details ||
            `${data[hoveredIndex].day}: ${data[
              hoveredIndex
            ].value.toLocaleString()}`}
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;
