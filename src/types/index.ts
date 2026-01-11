export interface Quote {
  id: number;
  text: string;
  author?: string;
}

export interface AppSettings {
  notificationsEnabled: boolean;
  notificationTimes: string[]; // Array of times in "HH:mm" format (24-hour)
}

export const DEFAULT_SETTINGS: AppSettings = {
  notificationsEnabled: false,
  notificationTimes: ['09:00', '14:00', '20:00'], // Default: 9 AM, 2 PM, 8 PM
};
