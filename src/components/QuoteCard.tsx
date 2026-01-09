import React, {useState, useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet, useColorScheme} from 'react-native';
import {colors} from '../theme/colors';
import {koreanQuotes} from '../data/quotes';

export function QuoteCard() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? colors.dark : colors.light;
  const [quoteIndex, setQuoteIndex] = useState(
    Math.floor(Math.random() * koreanQuotes.length),
  );

  const quote = koreanQuotes[quoteIndex];

  const showNextQuote = useCallback(() => {
    setQuoteIndex(prev => (prev + 1) % koreanQuotes.length);
  }, []);

  return (
    <TouchableOpacity
      onPress={showNextQuote}
      style={[styles.container, {backgroundColor: theme.card}]}
      activeOpacity={0.8}>
      <Text style={[styles.label, {color: theme.textSecondary}]}>
        오늘의 명언 미리보기
      </Text>
      <Text style={[styles.quote, {color: theme.text}]}>"{quote.text}"</Text>
      {quote.author && (
        <Text style={[styles.author, {color: theme.textSecondary}]}>
          - {quote.author}
        </Text>
      )}
      <Text style={[styles.hint, {color: theme.primary}]}>
        탭하여 다른 명언 보기
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quote: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 12,
  },
  author: {
    fontSize: 14,
    marginBottom: 16,
  },
  hint: {
    fontSize: 12,
    textAlign: 'center',
  },
});
