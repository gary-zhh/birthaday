import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import LevelTitle from '@/components/LevelTitle';
import ProgressBar from '@/components/ProgressBar';
import GiftReveal from '@/components/GiftReveal';
import MusicToggle from '@/components/MusicToggle';

const { width, height } = Dimensions.get('window');
const CHARACTER_SIZE = 60;
const CLOUD_WIDTH = 80;
const CLOUD_HEIGHT = 40;

const compliments = [
  "你的笑容如阳光般温暖",
  "你的善良让世界更美好",
  "你的智慧令我钦佩",
  "你是我生命中的奇迹",
  "你的温柔抚慰我的心",
];

export default function Level5() {
  const [jumps, setJumps] = useState(0);
  const [currentCompliment, setCurrentCompliment] = useState('点击Q版人物开始跳跃！');
  const [showGift, setShowGift] = useState(false);
  
  const characterY = useSharedValue(height / 2);
  const cloudPositions = useRef(Array.from({ length: 5 }, (_, i) => ({
    x: width * (0.1 + i * 0.2),
    y: height * (0.3 + Math.random() * 0.4)
  })));
  
  const handleJump = () => {
    if (jumps >= 5) return;
    
    // Jump animation
    characterY.value = withSequence(
      withSpring(characterY.value - 100, { damping: 10 }),
      withSpring(characterY.value, { damping: 12 }, () => {
        runOnJS(completeJump)();
      })
    );
  };
  
  const completeJump = () => {
    const newJumps = jumps + 1;
    setJumps(newJumps);
    setCurrentCompliment(compliments[jumps]);
    
    if (newJumps >= 5) {
      setTimeout(() => {
        setShowGift(true);
      }, 1000);
    }
  };
  
  const characterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: characterY.value - height / 2 }],
    };
  });
  
  return (
    <View style={styles.container}>
      <MusicToggle />
      <ProgressBar />
      
      <LevelTitle number={5} title="爱的跳跃" />
      
      <View style={styles.gameContainer}>
        {/* Clouds */}
        {cloudPositions.current.map((cloud, index) => (
          <View 
            key={index} 
            style={[
              styles.cloud,
              { left: cloud.x - CLOUD_WIDTH / 2, top: cloud.y - CLOUD_HEIGHT / 2 }
            ]}
          >
            <View style={styles.cloudMain} />
            <View style={[styles.cloudPuff, styles.cloudPuff1]} />
            <View style={[styles.cloudPuff, styles.cloudPuff2]} />
            <View style={[styles.cloudPuff, styles.cloudPuff3]} />
          </View>
        ))}
        
        {/* Character */}
        <Animated.View style={[styles.character, characterStyle]}>
          <Pressable onPress={handleJump} disabled={jumps >= 5}>
            <View style={styles.characterBody}>
              <View style={styles.characterHead} />
              <View style={styles.characterEye1} />
              <View style={styles.characterEye2} />
              <View style={styles.characterMouth} />
            </View>
          </Pressable>
        </Animated.View>
        
        {/* Compliment display */}
        <View style={styles.complimentContainer}>
          <Text style={styles.complimentText}>{currentCompliment}</Text>
        </View>
        
        {/* Jump counter */}
        <View style={styles.jumpCounter}>
          <Text style={styles.jumpCounterText}>跳跃: {jumps}/5</Text>
        </View>
      </View>
      
      {showGift && (
        <GiftReveal
          level={5}
          giftName="弹力袜"
          giftDescription="让你的每一步都轻盈舒适，如同在云端漫步。"
          nextLevel="/level6"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  gameContainer: {
    flex: 1,
    position: 'relative',
  },
  cloud: {
    position: 'absolute',
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
  },
  cloudMain: {
    position: 'absolute',
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  cloudPuff: {
    position: 'absolute',
    width: CLOUD_WIDTH * 0.4,
    height: CLOUD_WIDTH * 0.4,
    backgroundColor: 'white',
    borderRadius: CLOUD_WIDTH * 0.2,
  },
  cloudPuff1: {
    top: -10,
    left: 10,
  },
  cloudPuff2: {
    top: -15,
    left: 30,
  },
  cloudPuff3: {
    top: -5,
    left: 50,
  },
  character: {
    position: 'absolute',
    left: width / 2 - CHARACTER_SIZE / 2,
    width: CHARACTER_SIZE,
    height: CHARACTER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterBody: {
    width: CHARACTER_SIZE,
    height: CHARACTER_SIZE,
    backgroundColor: '#FFB6C1',
    borderRadius: CHARACTER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  characterHead: {
    width: CHARACTER_SIZE * 0.7,
    height: CHARACTER_SIZE * 0.7,
    backgroundColor: '#FFF0F5',
    borderRadius: CHARACTER_SIZE * 0.35,
    position: 'absolute',
    top: -CHARACTER_SIZE * 0.3,
  },
  characterEye1: {
    position: 'absolute',
    top: -CHARACTER_SIZE * 0.25,
    left: CHARACTER_SIZE * 0.2,
    width: 8,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  characterEye2: {
    position: 'absolute',
    top: -CHARACTER_SIZE * 0.25,
    right: CHARACTER_SIZE * 0.2,
    width: 8,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  characterMouth: {
    position: 'absolute',
    top: -CHARACTER_SIZE * 0.1,
    width: CHARACTER_SIZE * 0.4,
    height: CHARACTER_SIZE * 0.1,
    backgroundColor: '#FF69B4',
    borderBottomLeftRadius: CHARACTER_SIZE * 0.2,
    borderBottomRightRadius: CHARACTER_SIZE * 0.2,
  },
  complimentContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 16,
  },
  complimentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF69B4',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    textAlign: 'center',
  },
  jumpCounter: {
    position: 'absolute',
    top: 24,
    left: 24,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  jumpCounterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
});