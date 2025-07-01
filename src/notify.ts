const ICON = 'icons/64.png';

function baseNotification(id: string, message: string): chrome.notifications.NotificationOptions {
  return {
    iconUrl: ICON,
    title: `AutoApply • ${id}`,
    message,
    silent: true,
    type: 'basic',
  };
}

export function toastInfo(id: string, message: string): void {
  const opts = baseNotification(id, message);
  chrome.notifications.create(id, opts as chrome.notifications.NotificationCreateOptions, () => {
    setTimeout(() => chrome.notifications.clear(id), 1000);
  });
}

export function toastError(id: string, message: string): void {
  const opts = baseNotification(id, message);
  chrome.notifications.create(id, opts as chrome.notifications.NotificationCreateOptions, () => {
    setTimeout(() => chrome.notifications.clear(id), 5000);
  });
}
