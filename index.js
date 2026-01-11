/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';
import {notificationService} from './src/services/notificationService';
import {storageService} from './src/services/storageService';

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Background notification event:', type, detail);

  // Re-schedule all notifications when one is delivered or pressed
  // This ensures the next day's notifications are scheduled
  if (type === 1 || type === 2) {
    // EventType.DELIVERED or EventType.PRESS
    const settings = await storageService.getSettings();
    if (settings.notificationsEnabled) {
      await notificationService.scheduleNotificationsAtTimes(
        settings.notificationTimes,
      );
    }
  }
});

AppRegistry.registerComponent(appName, () => App);
