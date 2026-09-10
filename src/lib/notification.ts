export type NotificationItem = {
  id: number;
  message: string;
  read: boolean;
};

const STORAGE_KEY = "cuanku_notifications";

export function getNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addNotification(message: string) {
  if (typeof window === "undefined") return;

  const current = getNotifications();

  const newNotification: NotificationItem = {
    id: Date.now(),
    message,
    read: false,
  };

  const updated = [newNotification, ...current];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  window.dispatchEvent(new Event("notifications-updated"));
}

export function markAllNotificationsAsRead() {
  if (typeof window === "undefined") return;

  const current = getNotifications();

  const updated = current.map((notification) => ({
    ...notification,
    read: true,
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  window.dispatchEvent(new Event("notifications-updated"));
}