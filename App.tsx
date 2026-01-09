import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SettingsProvider} from './src/context/SettingsContext';
import {HomeScreen} from './src/screens/HomeScreen';
import {notificationService} from './src/services/notificationService';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    notificationService.createChannel();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SettingsProvider>
        <HomeScreen />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}

export default App;
