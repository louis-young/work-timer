import { useState, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { Clock } from "../components/Clock";
import { ProgressIndicator } from "../components/ProgressIndicator";

const initialBreakInterval = 0.05 * 60;
const initialNotificationMessage = "Time to take a break";

export const Application = () => {
  Notification.requestPermission();

  const [breakInterval, setBreakInterval] = useState(initialBreakInterval);
  const [notificationMessage, setNotificationMessage] = useState(
    initialNotificationMessage
  );

  const { isTimerRunning, timer, time, startTimer, stopTimer, setTimer } =
    useTimer({
      breakInterval,
    });

  const percentageOfIntervalRemaining = Math.round(
    (timer / breakInterval) * 100
  );

  const hasFinishedInterval = percentageOfIntervalRemaining <= 0;

  useEffect(() => {
    if (isTimerRunning && hasFinishedInterval) {
      stopTimer();

      new Notification(notificationMessage);
    }
  }, [isTimerRunning, hasFinishedInterval, stopTimer, notificationMessage]);

  const startBreak = () => {
    setBreakInterval(0.05 * 60);

    setTimer(0.05 * 60); // TODO: This shouldn't be required.

    setNotificationMessage("Time to start working.");

    startTimer();
  };

  return (
    <h1 className="text-gray-700 text-3xl p-8">
      <Clock time={time} />

      <ProgressIndicator progress={percentageOfIntervalRemaining} />

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>

      {hasFinishedInterval && (
        <button onClick={startBreak}>Start new interval</button>
      )}
    </h1>
  );
};
