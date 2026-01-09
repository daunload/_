import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import Slider from '@react-native-community/slider';
import {colors} from '../theme/colors';

interface Props {
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
}

export function IntervalSlider({value, onValueChange, disabled}: Props) {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  const formatInterval = (hours: number) => {
    if (hours === 1) {
      return '1시간';
    }
    if (hours === 24) {
      return '24시간 (하루)';
    }
    return `${hours}시간`;
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.card, opacity: disabled ? 0.5 : 1},
      ]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.text}]}>알림 간격</Text>
        <Text style={[styles.value, {color: theme.primary}]}>
          {formatInterval(value)}
        </Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={24}
        step={1}
        value={value}
        onSlidingComplete={onValueChange}
        disabled={disabled}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.border}
        thumbTintColor={theme.primary}
      />
      <View style={styles.labels}>
        <Text style={[styles.label, {color: theme.textSecondary}]}>1시간</Text>
        <Text style={[styles.label, {color: theme.textSecondary}]}>24시간</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  label: {
    fontSize: 12,
  },
});
