import notifee, {
  AndroidImportance,
  TriggerType,
  TimestampTrigger,
  AuthorizationStatus,
} from '@notifee/react-native';
import {koreanQuotes} from '../data/quotes';

const CHANNEL_ID = 'motivation-quotes';

export const notificationService = {
  async requestPermission(): Promise<boolean> {
    const settings = await notifee.requestPermission();
    return (
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
    );
  },

  async createChannel(): Promise<void> {
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: '동기부여 명언',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });
  },

  async scheduleRepeatingNotification(intervalHours: number): Promise<void> {
    await this.cancelAllNotifications();

    const quote = this.getRandomQuote();
    const intervalMs = intervalHours * 60 * 60 * 1000;

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + intervalMs,
    };

    await notifee.createTriggerNotification(
      {
        title: '오늘의 명언',
        body: quote.author ? `"${quote.text}" - ${quote.author}` : quote.text,
        android: {
          channelId: CHANNEL_ID,
          smallIcon: 'ic_launcher',
          pressAction: {id: 'default'},
        },
        ios: {
          sound: 'default',
        },
      },
      trigger,
    );
  },

  async cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications();
  },

  getRandomQuote() {
    const index = Math.floor(Math.random() * koreanQuotes.length);
    return koreanQuotes[index];
  },

  async displayTestNotification(): Promise<void> {
    const quote = this.getRandomQuote();

    await notifee.displayNotification({
      title: '오늘의 명언',
      body: quote.author ? `"${quote.text}" - ${quote.author}` : quote.text,
      android: {
        channelId: CHANNEL_ID,
        smallIcon: 'ic_launcher',
        pressAction: {id: 'default'},
      },
      ios: {
        sound: 'default',
      },
    });
  },
};
