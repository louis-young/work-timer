export const useNotificationPermissions = () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
};
