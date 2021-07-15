import { useState, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { Clock } from "../components/Clock";
import { ProgressIndicator } from "../components/ProgressIndicator";

const initialBreakInterval = 0.05 * 60;
const initialNotificationMessage = "Time to take a break";

export const Application = () => {
  Notification.requestPermission();

  const [notificationMessage, setNotificationMessage] = useState(
    initialNotificationMessage
  );

  const {
    isTimerRunning,
    time,
    startTimer,
    stopTimer,
    resetTimer,
    intervalPercentageRemaining,
    hasFinishedInterval,
  } = useTimer({
    initialBreakInterval,
  });

  useEffect(() => {
    if (isTimerRunning && hasFinishedInterval) {
      stopTimer();

      new Notification(notificationMessage);
    }
  }, [isTimerRunning, hasFinishedInterval, stopTimer, notificationMessage]);

  const startBreak = () => {
    setNotificationMessage("Time to start working.");

    const newBreakInterval = 0.1 * 60;

    resetTimer(newBreakInterval);
  };

  return (
    <h1 className="text-gray-700 text-3xl p-8">
      <Clock time={time} />

      <ProgressIndicator progress={intervalPercentageRemaining} />

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>

      {hasFinishedInterval && (
        <button onClick={startBreak}>Start new interval</button>
      )}
    </h1>
  );
};
