export interface Quote {
  id: number;
  text: string;
  author?: string;
}

export interface AppSettings {
  notificationsEnabled: boolean;
  intervalHours: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  notificationsEnabled: false,
  intervalHours: 4,
};
