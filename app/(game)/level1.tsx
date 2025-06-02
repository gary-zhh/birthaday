import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { Award } from 'lucide-react-native';
import LevelTitle from '@/components/LevelTitle';
import ProgressBar from '@/components/ProgressBar';
import GiftReveal from '@/components/GiftReveal';
import MusicToggle from '@/components/MusicToggle';

export default function Level1() {
  const [showingCards, setShowingCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showGift, setShowGift] = useState(false);
  
  const handleStartAward = () => {
    setShowingCards(true);
  };
  
  const handleSelectCard = (index: number) => {
    if (index === 1) { // Wife card is the correct one
      setSelectedCard(index);
      setTimeout(() => {
        setShowGift(true);
      }, 1500);
    } else {
      setSelectedCard(index);
      setTimeout(() => {
        setSelectedCard(null);
      }, 800);
    }
  };
  
  const nominees = [
    { name: '明星女神', image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg' },
    { name: '我亲爱的妻子', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
    { name: '邻家美女', image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' },
  ];

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <MusicToggle />
      <ProgressBar />
      
      <LevelTitle number={1} title="为你颁奖" />
      
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <View style={styles.stageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg' }}
            style={styles.stageImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          
          <View style={styles.awardIconContainer}>
            <Award size={50} color="#FFD700" />
          </View>
          
          {!showingCards ? (
            <Pressable style={styles.startButton} onPress={handleStartAward}>
              <Text style={styles.startButtonText}>开始颁奖</Text>
            </Pressable>
          ) : (
            <Text style={styles.promptText}>请选择"最佳老婆奖"的获得者</Text>
          )}
        </View>
        
        {showingCards && (
          <View style={styles.cardsContainer}>
            {nominees.map((nominee, index) => (
              <Animated.View 
                key={index}
                style={[
                  styles.card,
                  selectedCard === index && (index === 1 ? styles.correctCard : styles.incorrectCard)
                ]}
                entering={FadeInRight.duration(500).delay(index * 200)}
              >
                <Pressable
                  style={styles.cardContent}
                  onPress={() => handleSelectCard(index)}
                  disabled={selectedCard !== null}
                >
                  <Image
                    source={{ uri: nominee.image }}
                    style={styles.nomineeImage}
                    resizeMode="cover"
                  />
                  <View style={styles.cardOverlay} />
                  <Text style={styles.nomineeName}>{nominee.name}</Text>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        )}
      </Animated.View>
      
      {showGift && (
        <GiftReveal
          level={1}
          giftName="最佳老婆锦旗"
          giftDescription="将你最美好的形象永远定格，这枚锦旗是对你无与伦比的肯定和赞美。"
          nextLevel="/level2"
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
  stageContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  stageImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  awardIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#FFB6C1',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  promptText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 16,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    width: '31%',
    height: 150,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  correctCard: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  incorrectCard: {
    borderWidth: 3,
    borderColor: '#F44336',
  },
  cardContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  nomineeImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  nomineeName: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});