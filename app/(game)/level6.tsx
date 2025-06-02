import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import LevelTitle from '@/components/LevelTitle';
import ProgressBar from '@/components/ProgressBar';
import GiftReveal from '@/components/GiftReveal';
import MusicToggle from '@/components/MusicToggle';

const { width } = Dimensions.get('window');

const loveMessages = [
  {
    id: 1,
    message: "就像繁星点缀夜空，你的笑容点亮了我的世界。",
  },
  {
    id: 2,
    message: "每个夜晚入睡前，我都会想着你的温柔和爱意。",
  },
  {
    id: 3,
    message: "愿你的梦境如诗如画，我会在那里等你。",
  },
  {
    id: 4,
    message: "你是我心中最美的风景，是我生命中最甜的梦。",
  },
  {
    id: 5,
    message: "愿每个夜晚都能带给你安宁，愿每个清晨都为你带来希望。",
  },
];

export default function Level6() {
  const [revealedStars, setRevealedStars] = useState<number[]>([]);
  const [showGift, setShowGift] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('点击星星，听听我的情话...');
  
  const scale = useSharedValue(1);
  
  const handleStarPress = (id: number) => {
    if (revealedStars.includes(id)) return;
    
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
    
    setRevealedStars([...revealedStars, id]);
    setCurrentMessage(loveMessages.find(msg => msg.id === id)?.message || '');
    
    if (revealedStars.length + 1 >= loveMessages.length) {
      setTimeout(() => {
        setShowGift(true);
      }, 2000);
    }
  };
  
  const starPositions = useRef(loveMessages.map(() => ({
    x: Math.random() * (width - 100) + 50,
    y: Math.random() * 400 + 100,
  })));
  
  const messageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <LinearGradient
        colors={['#191970', '#4B0082', '#000000']}
        style={styles.background}
      />
      
      <MusicToggle />
      <ProgressBar />
      
      <LevelTitle number={6} title="梦中情话" />
      
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <View style={styles.starsContainer}>
          {loveMessages.map((_, index) => (
            <StarView
              key={index}
              position={starPositions.current[index]}
              revealed={revealedStars.includes(index + 1)}
              onPress={() => handleStarPress(index + 1)}
            />
          ))}
          
          <View style={styles.bedroom}>
            <View style={styles.bed} />
            <View style={styles.pillow} />
            <View style={styles.blanket} />
          </View>
        </View>
        
        <Animated.View style={[styles.messageContainer, messageContainerStyle]}>
          <Text style={styles.messageText}>{currentMessage}</Text>
          <Text style={styles.starsCounter}>
            已发现情话: {revealedStars.length}/{loveMessages.length}
          </Text>
        </Animated.View>
      </Animated.View>
      
      {showGift && (
        <GiftReveal
          level={6}
          giftName="柔软睡衣"
          giftDescription="愿你每晚都能在柔软的怀抱中安然入梦，享受甜蜜的睡眠。"
          nextLevel="/level7"
        />
      )}
    </ScrollView>
  );
}

function StarView({ position, revealed, onPress }) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  
  const handlePress = () => {
    if (revealed) return;
    
    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1);
    });
    rotation.value = withSpring(rotation.value + 360);
    
    onPress();
  };
  
  const starStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });
  
  return (
    <Pressable 
      style={[
        styles.star, 
        { left: position.x, top: position.y },
        revealed && styles.revealedStar
      ]}
      onPress={handlePress}
    >
      <Animated.View style={[styles.starInner, starStyle]}>
        <View style={styles.starPoint1} />
        <View style={styles.starPoint2} />
        <View style={styles.starCore} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    minHeight: 800,
    paddingBottom: 40,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 16,
  },
  starsContainer: {
    height: 500,
    position: 'relative',
  },
  star: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starInner: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revealedStar: {
    opacity: 0.3,
  },
  starPoint1: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  starPoint2: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    transform: [{ rotate: '0deg' }],
  },
  starCore: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 7.5,
  },
  bedroom: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    height: 120,
  },
  bed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#8B4513',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pillow: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: 60,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  blanket: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    height: 20,
    backgroundColor: '#E6E6FA',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  messageContainer: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  messageText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  starsCounter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'right',
  },
});