import { useState, useEffect } from "react";
import { getTimeFromDate } from "./utilities";
import type { UseTimerParameters } from "./types";

export const useTimer = ({ breakInterval }: UseTimerParameters) => {
  const [timer, setTimer] = useState(breakInterval);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setTimer(breakInterval);
  }, [breakInterval]);

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

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const date = new Date(timer * 1000);

  const time = getTimeFromDate(date);

  return {
    isTimerRunning,
    timer,
    time,
    startTimer,
    stopTimer,
    setTimer,
  };
};
