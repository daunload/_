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

  // Re-schedule next notification when one is delivered
  if (type === 1) {
    // EventType.DELIVERED
    const settings = await storageService.getSettings();
    if (settings.notificationsEnabled) {
      await notificationService.scheduleRepeatingNotification(
        settings.intervalHours,
      );
    }
  }
});

AppRegistry.registerComponent(appName, () => App);
