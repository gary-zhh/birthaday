import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Gift, Share2, RefreshCw } from 'lucide-react-native';
import { useGameContext } from '@/context/GameContext';
import MusicToggle from '@/components/MusicToggle';

const gifts = [
  { 
    id: 1, 
    name: '最佳老婆锦旗', 
    icon: '🏆', 
    description: '永远的第一名' 
  },
  { 
    id: 2, 
    name: '爱的贺卡', 
    icon: '💌', 
    description: '情话永不过时' 
  },
  { 
    id: 3, 
    name: '莓果紫口红', 
    icon: '💄', 
    description: '为你的美丽加分' 
  },
  { 
    id: 4, 
    name: '挂烫机', 
    icon: '👔', 
    description: '熨平生活小皱褶' 
  },
  { 
    id: 5, 
    name: '弹力袜', 
    icon: '🧦', 
    description: '轻盈每一步' 
  },
  { 
    id: 6, 
    name: '柔软睡衣', 
    icon: '👚', 
    description: '甜蜜入梦' 
  },
  { 
    id: 7, 
    name: 'iPad', 
    icon: '📱', 
    description: '记录我们的故事' 
  },
];

export default function Final() {
  const router = useRouter();
  const { completedLevels, resetGame } = useGameContext();
  
  const handleRestart = () => {
    resetGame();
    router.replace('/welcome');
  };
  
  const handleShare = () => {
    // In a real app, implement share functionality
    alert('分享功能在实际应用中会调用系统分享');
  };
  
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <LinearGradient
        colors={['#FFD6E0', '#FFFAF0', '#E6E6FA']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <MusicToggle />
      
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(800)}
      >
        <Text style={styles.title}>恭喜通关！</Text>
        <Text style={styles.subtitle}>你成功解锁了所有的爱的礼物</Text>
      </Animated.View>
      
      <Animated.View 
        style={styles.giftsContainer}
        entering={FadeIn.duration(1000).delay(300)}
      >
        {gifts.map((gift) => (
          <GiftItem 
            key={gift.id}
            gift={gift}
            unlocked={completedLevels.includes(gift.id)}
          />
        ))}
      </Animated.View>
      
      <Animated.View 
        style={styles.messageContainer}
        entering={FadeInDown.duration(800).delay(600)}
      >
        <Text style={styles.message}>
          亲爱的，这七份礼物承载着我对你无尽的爱意。每一份都代表了我们生活中的一个片段，一段回忆，一份情感。愿我们的爱情故事继续书写，创造更多美好的回忆。
        </Text>
        <Text style={styles.signature}>爱你的丈夫</Text>
      </Animated.View>
      
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={handleRestart}>
          <RefreshCw size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>重新体验</Text>
        </Pressable>
        
        <Pressable style={[styles.button, styles.shareButton]} onPress={handleShare}>
          <Share2 size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>分享给朋友</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function GiftItem({ gift, unlocked }) {
  const scale = useSharedValue(1);
  
  const handlePress = () => {
    if (unlocked) {
      scale.value = withSpring(1.1, {}, () => {
        scale.value = withSpring(1);
      });
    }
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  return (
    <Pressable onPress={handlePress} disabled={!unlocked}>
      <Animated.View 
        style={[
          styles.giftItem,
          !unlocked && styles.lockedGift,
          animatedStyle
        ]}
      >
        <View style={styles.giftIconContainer}>
          <Text style={styles.giftIcon}>{gift.icon}</Text>
        </View>
        <Text style={styles.giftName}>{gift.name}</Text>
        <Text style={styles.giftDescription}>{gift.description}</Text>
        
        {!unlocked && (
          <View style={styles.lockOverlay}>
            <Gift size={24} color="#FFFFFF" />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  giftsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  giftItem: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  lockedGift: {
    opacity: 0.7,
  },
  giftIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  giftIcon: {
    fontSize: 24,
  },
  giftName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  giftDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  signature: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF69B4',
    alignSelf: 'flex-end',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFB6C1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flex: 1,
    marginHorizontal: 8,
  },
  shareButton: {
    backgroundColor: '#9370DB',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});