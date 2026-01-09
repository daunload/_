import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from 'react';
import {AppSettings, DEFAULT_SETTINGS} from '../types';
import {storageService} from '../services/storageService';
import {notificationService} from '../services/notificationService';

type Action =
  | {type: 'LOAD_SETTINGS'; payload: AppSettings}
  | {type: 'SET_NOTIFICATIONS_ENABLED'; payload: boolean}
  | {type: 'SET_INTERVAL'; payload: number};

interface SettingsContextType {
  settings: AppSettings;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  setInterval: (hours: number) => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

function settingsReducer(state: AppSettings, action: Action): AppSettings {
  switch (action.type) {
    case 'LOAD_SETTINGS':
      return action.payload;
    case 'SET_NOTIFICATIONS_ENABLED':
      return {...state, notificationsEnabled: action.payload};
    case 'SET_INTERVAL':
      return {...state, intervalHours: action.payload};
    default:
      return state;
  }
}

export function SettingsProvider({children}: {children: React.ReactNode}) {
  const [settings, dispatch] = useReducer(settingsReducer, DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await storageService.getSettings();
      dispatch({type: 'LOAD_SETTINGS', payload: saved});
      setIsLoading(false);
      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    (async () => {
      await storageService.saveSettings(settings);

      if (settings.notificationsEnabled) {
        await notificationService.scheduleRepeatingNotification(
          settings.intervalHours,
        );
      } else {
        await notificationService.cancelAllNotifications();
      }
    })();
  }, [settings, initialized]);

  const setNotificationsEnabled = useCallback(async (enabled: boolean) => {
    if (enabled) {
      const granted = await notificationService.requestPermission();
      if (!granted) {
        return;
      }
    }
    dispatch({type: 'SET_NOTIFICATIONS_ENABLED', payload: enabled});
  }, []);

  const setInterval = useCallback((hours: number) => {
    dispatch({type: 'SET_INTERVAL', payload: hours});
  }, []);

  return (
    <SettingsContext.Provider
      value={{settings, setNotificationsEnabled, setInterval, isLoading}}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
