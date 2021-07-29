import { intervals, notifications } from "../constants";

export const getNewNotificationMessage = (isWorking: boolean) => {
  if (isWorking) {
    return notifications.WORK;
  }

  return notifications.BREAK;
};

export const getNewBreakInterval = (isWorking: boolean) => {
  if (isWorking) {
    return intervals.BREAK;
  }

  return intervals.WORK;
};
