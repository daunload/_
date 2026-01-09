import React from 'react';
import {View, Text, Switch, StyleSheet, useColorScheme} from 'react-native';
import {colors} from '../theme/colors';

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function NotificationToggle({value, onValueChange}: Props) {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View style={[styles.container, {backgroundColor: theme.card}]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, {color: theme.text}]}>알림 받기</Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          설정한 간격으로 명언을 받습니다
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{false: theme.border, true: theme.primary}}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
});
