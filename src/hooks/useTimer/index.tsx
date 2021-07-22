import { useState, useEffect } from "react";
import { getFormattedTime } from "./utilities";
import type { UseTimerParameters } from "./types";

export const useTimer = ({
  initialBreakInterval,
  notificationMessage,
}: UseTimerParameters) => {
  const [timer, setTimer] = useState(initialBreakInterval);
  const [breakInterval, setBreakInterval] = useState(initialBreakInterval);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (!isTimerRunning) {
      return;
    }

    const timeout = setTimeout(
      () => setTimer((previousTimer) => previousTimer - 1),
      1000
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [isTimerRunning, timer]);

  const intervalPercentageExpended = 100 - (timer / breakInterval) * 100;

  const hasIntervalFinished = intervalPercentageExpended >= 100;

  useEffect(() => {
    if (isTimerRunning && hasIntervalFinished) {
      stopTimer();

      new Notification(notificationMessage);

      const audio = new Audio("alarm.mp3");

      audio.play();
    }
  }, [isTimerRunning, hasIntervalFinished, notificationMessage]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    stopTimer();

    setTimer(initialBreakInterval);
    setBreakInterval(initialBreakInterval);
  };

  const restartTimer = (newBreakInterval: number) => {
    setTimer(newBreakInterval);
    setBreakInterval(newBreakInterval);

    startTimer();
  };

  const time = getFormattedTime(timer);

  return {
    time,
    isTimerRunning,
    intervalPercentageExpended,
    hasIntervalFinished,
    startTimer,
    stopTimer,
    resetTimer,
    restartTimer,
  };
};
