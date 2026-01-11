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
  | {type: 'SET_NOTIFICATION_TIMES'; payload: string[]};

interface SettingsContextType {
  settings: AppSettings;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  setNotificationTimes: (times: string[]) => void;
  addNotificationTime: (time: string) => void;
  removeNotificationTime: (time: string) => void;
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
    case 'SET_NOTIFICATION_TIMES':
      return {...state, notificationTimes: action.payload};
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
        await notificationService.scheduleNotificationsAtTimes(
          settings.notificationTimes,
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

  const setNotificationTimes = useCallback((times: string[]) => {
    dispatch({type: 'SET_NOTIFICATION_TIMES', payload: times});
  }, []);

  const addNotificationTime = useCallback((time: string) => {
    dispatch({
      type: 'SET_NOTIFICATION_TIMES',
      payload: [...settings.notificationTimes, time].sort(),
    });
  }, [settings.notificationTimes]);

  const removeNotificationTime = useCallback((time: string) => {
    dispatch({
      type: 'SET_NOTIFICATION_TIMES',
      payload: settings.notificationTimes.filter(t => t !== time),
    });
  }, [settings.notificationTimes]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setNotificationsEnabled,
        setNotificationTimes,
        addNotificationTime,
        removeNotificationTime,
        isLoading,
      }}>
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
