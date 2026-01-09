jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@notifee/react-native', () => {
  const notifee = {
    requestPermission: jest.fn().mockResolvedValue({authorizationStatus: 1}),
    createChannel: jest.fn().mockResolvedValue('channel-id'),
    createTriggerNotification: jest.fn().mockResolvedValue('notification-id'),
    cancelAllNotifications: jest.fn().mockResolvedValue(undefined),
    displayNotification: jest.fn().mockResolvedValue('notification-id'),
    onBackgroundEvent: jest.fn(),
  };

  return {
    __esModule: true,
    default: notifee,
    AndroidImportance: {
      HIGH: 4,
    },
    TriggerType: {
      TIMESTAMP: 0,
    },
    AuthorizationStatus: {
      AUTHORIZED: 1,
      PROVISIONAL: 2,
    },
  };
});

jest.mock('@react-native-community/slider', () => 'Slider');
