import type { ClockProps } from "./types";

export const Clock = ({ time }: ClockProps) => {
  return <p>{time}</p>;
};
