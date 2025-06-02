import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import LevelTitle from '@/components/LevelTitle';
import ProgressBar from '@/components/ProgressBar';
import GiftReveal from '@/components/GiftReveal';
import MusicToggle from '@/components/MusicToggle';

const lipsticks = [
  { id: 1, name: '珊瑚粉', color: '#FF7F70', image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg' },
  { id: 2, name: '玫瑰红', color: '#DB2058', image: 'https://images.pexels.com/photos/2693644/pexels-photo-2693644.jpeg' },
  { id: 3, name: '莓果紫', color: '#9E5E84', image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg' },
  { id: 4, name: '奶茶棕', color: '#C39B8F', image: 'https://images.pexels.com/photos/3736397/pexels-photo-3736397.jpeg' },
  { id: 5, name: '朱砂红', color: '#BE002F', image: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg' },
];

export default function Level3() {
  const [selectedLipstick, setSelectedLipstick] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showGift, setShowGift] = useState(false);
  
  const scale = useSharedValue(1);
  
  const handleSelectLipstick = (id: number) => {
    setSelectedLipstick(id);
    scale.value = withSpring(1.1, {}, () => {
      scale.value = withSpring(1);
    });
    
    // Correct answer is "莓果紫" (id: 3)
    if (id === 3) {
      setTimeout(() => {
        setShowGift(true);
      }, 1500);
    }
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <MusicToggle />
      <ProgressBar />
      
      <LevelTitle number={3} title="颜色密码" />
      
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <View style={styles.dressingTable}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/205316/pexels-photo-205316.png' }}
            style={styles.dressingTableImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          
          <Text style={styles.question}>我最喜欢的口红色号是？</Text>
          
          <Pressable style={styles.hintButton} onPress={() => setShowHint(!showHint)}>
            <Text style={styles.hintButtonText}>{showHint ? '隐藏提示' : '查看提示'}</Text>
          </Pressable>
          
          {showHint && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>
                记得我们第一次约会时，我涂的口红让你赞不绝口，说它很衬我的气质...
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.lipsticksContainer}>
          {lipsticks.map((lipstick) => (
            <Animated.View 
              key={lipstick.id}
              style={[
                styles.lipstickItem,
                selectedLipstick === lipstick.id && styles.selectedLipstick,
                selectedLipstick === lipstick.id && lipstick.id === 3 && styles.correctLipstick,
                selectedLipstick === lipstick.id ? animatedStyle : {}
              ]}
              entering={FadeInRight.duration(500).delay(lipstick.id * 100)}
            >
              <Pressable 
                style={styles.lipstickContent}
                onPress={() => handleSelectLipstick(lipstick.id)}
                disabled={selectedLipstick !== null}
              >
                <View style={[styles.colorSwatch, { backgroundColor: lipstick.color }]} />
                <Image
                  source={{ uri: lipstick.image }}
                  style={styles.lipstickImage}
                  resizeMode="cover"
                />
                <Text style={styles.lipstickName}>{lipstick.name}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </Animated.View>
      
      {showGift && (
        <GiftReveal
          level={3}
          giftName="莓果紫口红"
          giftDescription="这是属于你的专属色彩，为你的笑容增添一抹独特的风采。"
          nextLevel="/level4"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  content: {
    padding: 16,
  },
  dressingTable: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dressingTableImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,250,240,0.4)',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  hintButton: {
    backgroundColor: '#FFB6C1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  hintContainer: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  lipsticksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lipstickItem: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedLipstick: {
    borderWidth: 2,
    borderColor: '#FFB6C1',
  },
  correctLipstick: {
    borderColor: '#4CAF50',
  },
  lipstickContent: {
    position: 'relative',
    height: 150,
  },
  colorSwatch: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    zIndex: 10,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  lipstickImage: {
    width: '100%',
    height: '100%',
  },
  lipstickName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});