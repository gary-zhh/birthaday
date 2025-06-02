import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Gift } from 'lucide-react-native';
import { useGameContext } from '@/context/GameContext';

interface GiftRevealProps {
  level: number;
  giftName: string;
  giftDescription: string;
  nextLevel: string;
}

export default function GiftReveal({ level, giftName, giftDescription, nextLevel }: GiftRevealProps) {
  const router = useRouter();
  const { completeLevel } = useGameContext();
  const scale = useSharedValue(0.8);
  const rotation = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 800, easing: Easing.elastic(1.2) });
    rotation.value = withTiming(360, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    completeLevel(level);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateY: `${rotation.value}deg` }
      ],
    };
  });

  const handleContinue = () => {
    router.replace(nextLevel);
  };

  return (
    <Animated.View 
      style={[styles.container]} 
      entering={FadeIn.duration(800)}
      exiting={FadeOut.duration(300)}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.giftIconContainer, animatedStyle]}>
          <Gift size={64} color="#FF69B4" strokeWidth={1.5} />
        </Animated.View>
        
        <Text style={styles.congratsText}>恭喜解锁礼物！</Text>
        <Text style={styles.giftName}>{giftName}</Text>
        <Text style={styles.giftDescription}>{giftDescription}</Text>
        
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>继续下一关</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,250,240,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  giftIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  congratsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 16,
    textAlign: 'center',
  },
  giftName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  giftDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: '#FFD6E0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});