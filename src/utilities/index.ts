import { intervals, notifications } from "../constants";

export const getNewNotificationMessage = (isWorking: boolean) => {
  if (isWorking) {
    return notifications.BREAK;
  }

  return notifications.WORK;
};

export const getNewBreakInterval = (isWorking: boolean) => {
  if (isWorking) {
    return intervals.BREAK;
  }

  return intervals.WORK;
};
