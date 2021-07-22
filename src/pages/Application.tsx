import { useState } from "react";
import { intervals, notifications } from "../constants";
import { getNewBreakInterval, getNewNotificationMessage } from "../utilities";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useTimer } from "../hooks/useTimer";
import { Button } from "../components/Button";
import { ProgressIndicator } from "../components/ProgressIndicator";

const initialBreakInterval = intervals.WORK;
const initialNotificationMessage = notifications.BREAK;

export const Application = () => {
  Notification.requestPermission();

  const [notificationMessage, setNotificationMessage] = useState(
    initialNotificationMessage
  );

  const [isWorking, setIsWorking] = useState(true);

  const {
    time,
    isTimerRunning,
    intervalPercentageExpended,
    hasIntervalFinished,
    startTimer,
    stopTimer,
    resetTimer,
    restartTimer,
  } = useTimer({
    initialBreakInterval,
    notificationMessage,
  });

  useDocumentTitle({ isWorking, time });

  const startNextInterval = () => {
    setIsWorking((previousIsWorking) => !previousIsWorking);

    const newNotificationMessage = getNewNotificationMessage(!isWorking);

    setNotificationMessage(newNotificationMessage);

    const newBreakInterval = getNewBreakInterval(!isWorking);

    restartTimer(newBreakInterval);
  };

  const handleResetButtonClick = () => {
    resetTimer();

    setIsWorking(true);
  };

  const isStartButtonVisible = !isTimerRunning && !hasIntervalFinished;

  const isStopButtonVisible = isTimerRunning;

  const isStartNextIntervalButtonVisible = hasIntervalFinished;

  return (
    <section className="flex justify-center items-center min-h-screen text-center">
      <main className="w-full max-w-sm m-auto">
        <div className="w-full mt-8">
          <ProgressIndicator
            progress={intervalPercentageExpended}
            time={time}
            isWorking={isWorking}
          />
        </div>

        <div className="mt-8 flex gap-4 justify-center items-center">
          {isStartButtonVisible && (
            <Button text="Start" type="success" onClick={startTimer} />
          )}

          {isStopButtonVisible && (
            <Button text="Stop" type="default" onClick={stopTimer} />
          )}

          {isStartNextIntervalButtonVisible && (
            <Button
              text={`Start ${isWorking ? "Break" : "Work"}`}
              type="information"
              onClick={startNextInterval}
            />
          )}

          <Button text="Reset" type="danger" onClick={handleResetButtonClick} />
        </div>
      </main>
    </section>
  );
};
