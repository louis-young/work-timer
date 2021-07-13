import type { ProgressIndicatorProps } from "./types";

export const ProgressIndicator = ({ progress }: ProgressIndicatorProps) => {
  return <progress value={progress} max={100} />;
};
