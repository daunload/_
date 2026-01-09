import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppSettings, DEFAULT_SETTINGS} from '../types';

const SETTINGS_KEY = '@motivation_settings';

export const storageService = {
  async getSettings(): Promise<AppSettings> {
    try {
      const json = await AsyncStorage.getItem(SETTINGS_KEY);
      return json ? JSON.parse(json) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      console.error('Failed to save settings');
    }
  },
};
