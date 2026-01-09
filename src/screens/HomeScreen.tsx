import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';
import {useSettings} from '../context/SettingsContext';
import {NotificationToggle} from '../components/NotificationToggle';
import {IntervalSlider} from '../components/IntervalSlider';
import {QuoteCard} from '../components/QuoteCard';

export function HomeScreen() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;
  const insets = useSafeAreaInsets();
  const {settings, setNotificationsEnabled, setInterval, isLoading} =
    useSettings();

  if (isLoading) {
    return (
      <View style={[styles.loading, {backgroundColor: theme.background}]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background}]}
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 20,
        paddingHorizontal: 20,
      }}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.text}]}>동기부여</Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          매일 당신을 응원하는 명언
        </Text>
      </View>

      <QuoteCard />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.textSecondary}]}>
          설정
        </Text>
        <NotificationToggle
          value={settings.notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <IntervalSlider
          value={settings.intervalHours}
          onValueChange={setInterval}
          disabled={!settings.notificationsEnabled}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
});
