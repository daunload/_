import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {colors} from '../theme/colors';
import {useSettings} from '../context/SettingsContext';

export function TimePickerList() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;
  const {settings, addNotificationTime, removeNotificationTime} = useSettings();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const handleAddTime = () => {
    const timeString = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    if (!settings.notificationTimes.includes(timeString)) {
      addNotificationTime(timeString);
    }
    setShowTimePicker(false);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? '오후' : '오전';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${ampm} ${displayHour}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timesList}>
        {settings.notificationTimes.map(time => (
          <View
            key={time}
            style={[styles.timeItem, {backgroundColor: theme.cardBackground}]}>
            <Text style={[styles.timeText, {color: theme.text}]}>
              {formatTime(time)}
            </Text>
            <TouchableOpacity
              onPress={() => removeNotificationTime(time)}
              style={styles.removeButton}>
              <Text style={[styles.removeButtonText, {color: theme.error}]}>
                삭제
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {showTimePicker ? (
        <View
          style={[styles.pickerContainer, {backgroundColor: theme.cardBackground}]}>
          <View style={styles.pickerRow}>
            <View style={styles.picker}>
              <Text style={[styles.pickerLabel, {color: theme.text}]}>시</Text>
              <View style={styles.pickerButtons}>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedHour(prev => (prev > 0 ? prev - 1 : 23))
                  }
                  style={[
                    styles.pickerButton,
                    {backgroundColor: theme.primary},
                  ]}>
                  <Text style={styles.pickerButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.pickerValue, {color: theme.text}]}>
                  {selectedHour.toString().padStart(2, '0')}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedHour(prev => (prev < 23 ? prev + 1 : 0))
                  }
                  style={[
                    styles.pickerButton,
                    {backgroundColor: theme.primary},
                  ]}>
                  <Text style={styles.pickerButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.colon, {color: theme.text}]}>:</Text>

            <View style={styles.picker}>
              <Text style={[styles.pickerLabel, {color: theme.text}]}>분</Text>
              <View style={styles.pickerButtons}>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedMinute(prev => (prev > 0 ? prev - 15 : 45))
                  }
                  style={[
                    styles.pickerButton,
                    {backgroundColor: theme.primary},
                  ]}>
                  <Text style={styles.pickerButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.pickerValue, {color: theme.text}]}>
                  {selectedMinute.toString().padStart(2, '0')}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedMinute(prev => (prev < 45 ? prev + 15 : 0))
                  }
                  style={[
                    styles.pickerButton,
                    {backgroundColor: theme.primary},
                  ]}>
                  <Text style={styles.pickerButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => setShowTimePicker(false)}
              style={[
                styles.actionButton,
                {backgroundColor: theme.background},
              ]}>
              <Text style={[styles.actionButtonText, {color: theme.text}]}>
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddTime}
              style={[
                styles.actionButton,
                {backgroundColor: theme.primary},
              ]}>
              <Text style={styles.addButtonText}>추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={[styles.addButton, {backgroundColor: theme.primary}]}
          disabled={!settings.notificationsEnabled}>
          <Text style={styles.addButtonText}>+ 시간 추가</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  timesList: {
    gap: 8,
    marginBottom: 12,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    padding: 20,
    borderRadius: 12,
    gap: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  picker: {
    alignItems: 'center',
    gap: 8,
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  pickerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pickerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  pickerValue: {
    fontSize: 32,
    fontWeight: '700',
    minWidth: 60,
    textAlign: 'center',
  },
  colon: {
    fontSize: 32,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
