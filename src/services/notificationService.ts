import notifee, {
  AndroidImportance,
  TriggerType,
  TimestampTrigger,
  AuthorizationStatus,
  RepeatFrequency,
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

  async scheduleNotificationsAtTimes(times: string[]): Promise<void> {
    await this.cancelAllNotifications();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (const time of times) {
      const [hours, minutes] = time.split(':').map(Number);

      // Calculate next occurrence of this time
      let scheduledDate = new Date(today);
      scheduledDate.setHours(hours, minutes, 0, 0);

      // If the time has already passed today, schedule for tomorrow
      if (scheduledDate.getTime() <= now.getTime()) {
        scheduledDate.setDate(scheduledDate.getDate() + 1);
      }

      const quote = this.getRandomQuote();

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: scheduledDate.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
      };

      await notifee.createTriggerNotification(
        {
          id: `notification-${time}`, // Unique ID per time slot
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
    }
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
