import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import MusicToggle from '@/components/MusicToggle';
import { useGameContext } from '@/context/GameContext';

export default function Welcome() {
  const router = useRouter();
  const { resetGame } = useGameContext();

  useEffect(() => {
    // Reset game progress when landing on welcome screen
    resetGame();
  }, []);

  const handleStart = () => {
    router.replace('/level1');
  };

  return (
    <LinearGradient
      colors={['#FFD6E0', '#FFFAF0', '#E6E6FA']}
      style={styles.container}
    >
      <MusicToggle />
      
      <Animated.View 
        style={styles.headerContainer}
        entering={FadeInDown.duration(800).delay(300)}
      >
        <Heart size={32} color="#FF69B4" fill="#FF69B4" style={styles.heartIcon} />
        <Text style={styles.headerText}>爱的七重谜境</Text>
      </Animated.View>
      
      <Animated.View 
        style={styles.illustrationContainer}
        entering={FadeIn.duration(1000).delay(500)}
      >
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg' }}
          style={styles.illustration}
          resizeMode="cover"
        />
      </Animated.View>
      
      <Animated.View 
        style={styles.contentContainer}
        entering={FadeInDown.duration(800).delay(700)}
      >
        <Text style={styles.title}>亲爱的，</Text>
        <Text style={styles.subtitle}>
          我为你准备了七份惊喜，每一份都藏着我对你的爱意。通过解开七重谜题，你将一一收集这些特别的礼物。
        </Text>
        
        <Pressable style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>开始探索</Text>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  heartIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  illustrationContainer: {
    width: '80%',
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 30,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 24,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#FFB6C1',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});