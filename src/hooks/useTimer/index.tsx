import { useEffect, useState } from "react";
import { getTimeFromDate } from "./utilities";

const initialSeconds = 0;

export const useTimer = () => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(
      () => setSeconds((previousSeconds) => previousSeconds + 1),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const reset = () => {
    setSeconds(initialSeconds);
  };

  const date = new Date(seconds * 1000);

  const time = getTimeFromDate(date);

  return { seconds, time, reset };
};
