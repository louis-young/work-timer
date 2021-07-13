import { Clock } from "../components/Clock";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { useNotificationPermissions } from "../hooks/useNotificationPermissions";
import { useTimer } from "../hooks/useTimer";

const interval = 0.25 * 60;

export const Application = () => {
  useNotificationPermissions();

  const { seconds, time, reset } = useTimer();

  const progress = Math.round((seconds / interval) * 100);

  // if (seconds === 3) {
  //   new Notification("Hi there!");
  // }

  if (progress >= 100) {
    // ...
  }

  return (
    <h1 className="text-gray-700 text-3xl p-8">
      <Clock time={time} />

      <ProgressIndicator progress={progress} />

      <button onClick={reset}>Reset</button>
    </h1>
  );
};
