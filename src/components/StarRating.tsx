import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  rating: number; // 0..5
  size?: number;
  count?: number; // optional count to display next to stars
};

export const StarRating: React.FC<Props> = ({ rating, size = 14, count }) => {
  const rounded = Math.round(Math.max(0, Math.min(5, rating)));
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <Text key={i} style={[styles.star, { fontSize: size, color: i < rounded ? '#FFC107' : '#CFCFCF' }]}>★</Text>
  ));

  return (
    <View style={styles.row}>
      <View style={styles.stars}>{stars}</View>
      {typeof count === 'number' ? (
        <Text style={[styles.count, { fontSize: size * 0.8 }]}>{`(${count})`}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
  count: {
    marginLeft: 6,
    color: '#666',
  },
});
