import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInRight, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import LevelTitle from '@/components/LevelTitle';
import ProgressBar from '@/components/ProgressBar';
import GiftReveal from '@/components/GiftReveal';
import MusicToggle from '@/components/MusicToggle';

const { width } = Dimensions.get('window');

const futureChapters = [
  {
    id: 1,
    title: '环游世界',
    description: '与你一起探索未知的土地，留下我们的足迹。',
    image: 'https://images.pexels.com/photos/1851481/pexels-photo-1851481.jpeg',
  },
  {
    id: 2,
    title: '温馨小窝',
    description: '一起装饰我们的理想家，创造属于我们的温馨空间。',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  },
  {
    id: 3,
    title: '养只宠物',
    description: '一起照顾一个毛茸茸的小生命，让家更有活力。',
    image: 'https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg',
  },
  {
    id: 4,
    title: '浪漫纪念日',
    description: '庆祝我们的每一个重要时刻，创造更多美好回忆。',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
  },
  {
    id: 5,
    title: '烹饪时光',
    description: '一起下厨，品尝彼此精心烹制的美食。',
    image: 'https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg',
  },
];

export default function Level7() {
  const router = useRouter();
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [bookOpen, setBookOpen] = useState(true);
  const [showGift, setShowGift] = useState(false);
  
  const bookRotation = useSharedValue(0);
  const bookScale = useSharedValue(1);
  
  const handleSelectChapter = (id: number) => {
    if (selectedChapters.includes(id)) {
      setSelectedChapters(selectedChapters.filter(chapterId => chapterId !== id));
    } else if (selectedChapters.length < 3) {
      setSelectedChapters([...selectedChapters, id]);
    }
  };
  
  const handleConfirm = () => {
    if (selectedChapters.length === 3) {
      // Close the book animation
      bookRotation.value = withTiming(180, { duration: 1000 });
      setBookOpen(false);
      
      setTimeout(() => {
        // Transform to iPad
        bookScale.value = withTiming(1.2, { duration: 800 });
        
        setTimeout(() => {
          setShowGift(true);
        }, 1000);
      }, 1200);
    }
  };
  
  const bookStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${bookRotation.value}deg` },
        { scale: bookScale.value }
      ],
    };
  });
  
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <MusicToggle />
      <ProgressBar />
      
      <LevelTitle number={7} title="未来之书" />
      
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <Text style={styles.instructions}>
          {bookOpen 
            ? "请选择3个你希望我们未来一起实现的梦想章节" 
            : "翻开新的篇章，开启我们的未来"}
        </Text>
        
        <Animated.View style={[styles.bookContainer, bookStyle]}>
          {bookOpen ? (
            <View style={styles.openBook}>
              <View style={styles.bookPage}>
                <Text style={styles.bookTitle}>我们的未来故事</Text>
                
                <View style={styles.chaptersContainer}>
                  {futureChapters.map((chapter) => (
                    <Pressable
                      key={chapter.id}
                      style={[
                        styles.chapterItem,
                        selectedChapters.includes(chapter.id) && styles.selectedChapter
                      ]}
                      onPress={() => handleSelectChapter(chapter.id)}
                    >
                      <Image
                        source={{ uri: chapter.image }}
                        style={styles.chapterImage}
                        resizeMode="cover"
                      />
                      <View style={styles.chapterContent}>
                        <Text style={styles.chapterTitle}>{chapter.title}</Text>
                        <Text style={styles.chapterDescription} numberOfLines={2}>
                          {chapter.description}
                        </Text>
                      </View>
                      {selectedChapters.includes(chapter.id) && (
                        <View style={styles.checkmark}>
                          <Text style={styles.checkmarkText}>✓</Text>
                        </View>
                      )}
                    </Pressable>
                  ))}
                </View>
                
                <Pressable 
                  style={[
                    styles.confirmButton,
                    selectedChapters.length < 3 && styles.disabledButton
                  ]}
                  onPress={handleConfirm}
                  disabled={selectedChapters.length < 3}
                >
                  <Text style={styles.confirmButtonText}>
                    确认选择 ({selectedChapters.length}/3)
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.ipadContainer}>
              <View style={styles.ipadScreen}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg' }}
                  style={styles.ipadScreenImage}
                  resizeMode="cover"
                />
                <View style={styles.ipadOverlay} />
                <Text style={styles.ipadText}>我们的故事将在这里继续...</Text>
              </View>
              <View style={styles.ipadHomeButton} />
            </View>
          )}
        </Animated.View>
      </Animated.View>
      
      {showGift && (
        <GiftReveal
          level={7}
          giftName="iPad"
          giftDescription="记录我们的爱情故事，创造未来美好回忆的神奇画布。"
          nextLevel="/final"
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
    alignItems: 'center',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  bookContainer: {
    width: width - 48,
    height: (width - 48) * 1.3,
    backgroundColor: '#8B4513',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  openBook: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: 16,
  },
  bookPage: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 24,
  },
  chaptersContainer: {
    flex: 1,
  },
  chapterItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedChapter: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  chapterImage: {
    width: 80,
    height: 80,
  },
  chapterContent: {
    flex: 1,
    padding: 8,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  chapterDescription: {
    fontSize: 14,
    color: '#666',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FFB6C1',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ipadContainer: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ipadScreen: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  ipadScreenImage: {
    width: '100%',
    height: '100%',
  },
  ipadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  ipadText: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ipadHomeButton: {
    position: 'absolute',
    bottom: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
});