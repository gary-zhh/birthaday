import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useGameContext } from '@/context/GameContext';

export default function ProgressBar() {
  const { completedLevels } = useGameContext();
  const totalLevels = 7;
  const progress = (completedLevels.length / totalLevels) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>进度</Text>
        <Text style={styles.percentage}>{Math.round(progress)}%</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <View style={styles.levelIndicator}>
        {Array.from({ length: totalLevels }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.levelDot, 
              completedLevels.includes(index + 1) && styles.completedLevel
            ]} 
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  percentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFB6C1',
    borderRadius: 4,
  },
  levelIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  levelDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  completedLevel: {
    backgroundColor: '#FFB6C1',
    borderColor: '#FF69B4',
  },
});