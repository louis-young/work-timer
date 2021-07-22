import type { ProgressIndicatorProps } from "./types";

const radius = 150;
const diameter = radius * 2;

const strokeWidth = 5;

const normalisedRadius = radius - strokeWidth * 2;

const circumference = normalisedRadius * 2 * Math.PI;

const viewBox = `0 0 ${diameter} ${diameter}`;
const strokeDasharray = `${circumference} ${circumference}`;

export const ProgressIndicator = ({
  progress,
  time,
  isWorking,
}: ProgressIndicatorProps) => {
  const stroke = isWorking ? "#4fd994" : "#6074bd";

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      <svg className="transform -rotate-90" width="100%" viewBox={viewBox}>
        <circle
          stroke="#f2f2f2"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalisedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={stroke}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          r={normalisedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div className="absolute left-2/4 top-2/4 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <time className="text-5xl text-gray-700 font-light" dateTime={time}>
          {time}
        </time>
      </div>
    </div>
  );
};
