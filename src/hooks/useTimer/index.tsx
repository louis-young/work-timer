import { useState, useEffect } from "react";
import { UseTimerParameters } from "./types";
import { getFormattedTime } from "./utilities";

export const useTimer = ({ initialBreakInterval }: UseTimerParameters) => {
  const [timer, setTimer] = useState(initialBreakInterval);
  const [breakInterval, setBreakInterval] = useState(initialBreakInterval);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = (newBreakInterval: number) => {
    setTimer(newBreakInterval);
    setBreakInterval(newBreakInterval);

    startTimer();
  };

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

  const time = getFormattedTime(timer);

  const intervalPercentageRemaining = Math.round((timer / breakInterval) * 100);

  const hasFinishedInterval = intervalPercentageRemaining <= 0;

  return {
    isTimerRunning,
    timer,
    time,
    startTimer,
    stopTimer,
    resetTimer,
    intervalPercentageRemaining,
    hasFinishedInterval,
  };
};
