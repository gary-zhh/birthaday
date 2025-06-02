import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import Animated, { FadeIn, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import LevelTitle from '@/components/LevelTitle';
import ProgressBar from '@/components/ProgressBar';
import GiftReveal from '@/components/GiftReveal';
import MusicToggle from '@/components/MusicToggle';

const questions = [
  {
    id: 1,
    question: '我们第一次约会是在哪里？',
    options: ['咖啡厅', '电影院', '公园', '餐厅'],
    correctAnswer: 1, // 0-based index
  },
  {
    id: 2,
    question: '我最喜欢的食物是什么？',
    options: ['火锅', '寿司', '意大利面', '披萨'],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: '我们的结婚纪念日是几月几号？',
    options: ['5月20日', '6月18日', '7月7日', '8月8日'],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: '我们共同养的宠物叫什么名字？',
    options: ['豆豆', '奇奇', '球球', '毛毛'],
    correctAnswer: 3,
  },
];

export default function Level4() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showGift, setShowGift] = useState(false);
  
  const progress = useSharedValue(0);
  
  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    
    // Check if answer is correct
    if (index === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
      progress.value = withTiming((correctAnswers + 1) / questions.length, { duration: 800 });
    }
    
    // Move to next question or finish
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Game completed
        if (correctAnswers + (index === questions[currentQuestion].correctAnswer ? 1 : 0) >= 3) {
          setShowGift(true);
        }
      }
    }, 1000);
  };
  
  const shirtStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progress.value > 0 ? 1 : 0.3),
      transform: [
        { scale: withTiming(0.8 + (0.2 * progress.value)) }
      ],
    };
  });
  
  const wrinklesStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1 - progress.value),
    };
  });
  
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <MusicToggle />
      <ProgressBar />
      
      <LevelTitle number={4} title="熨平回忆" />
      
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <View style={styles.shirtContainer}>
          <Animated.View style={[styles.shirt, shirtStyle]}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2069294/pexels-photo-2069294.jpeg' }}
              style={styles.shirtImage}
              resizeMode="cover"
            />
            <Animated.View style={[styles.wrinkles, wrinklesStyle]}>
              <View style={styles.wrinkle1} />
              <View style={styles.wrinkle2} />
              <View style={styles.wrinkle3} />
              <View style={styles.wrinkle4} />
            </Animated.View>
          </Animated.View>
          
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>
              熨平进度: {Math.round(progress.value * 100)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {questions[currentQuestion].question}
          </Text>
          
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <Pressable
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === index && (
                    index === questions[currentQuestion].correctAnswer
                      ? styles.correctOption
                      : styles.incorrectOption
                  )
                ]}
                onPress={() => handleSelectOption(index)}
                disabled={selectedOption !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
          
          <Text style={styles.questionCounter}>
            问题 {currentQuestion + 1}/{questions.length}
          </Text>
        </View>
      </Animated.View>
      
      {showGift && (
        <GiftReveal
          level={4}
          giftName="挂烫机"
          giftDescription="用来熨平生活中的小皱褶，让我们的每一天都平整舒适。"
          nextLevel="/level5"
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
  shirtContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  shirt: {
    width: 200,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  shirtImage: {
    width: '100%',
    height: '100%',
  },
  wrinkles: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  wrinkle1: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '40%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
    transform: [{ rotate: '15deg' }],
  },
  wrinkle2: {
    position: 'absolute',
    top: '40%',
    right: '15%',
    width: '35%',
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    transform: [{ rotate: '-10deg' }],
  },
  wrinkle3: {
    position: 'absolute',
    bottom: '30%',
    left: '20%',
    width: '50%',
    height: 7,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3.5,
    transform: [{ rotate: '5deg' }],
  },
  wrinkle4: {
    position: 'absolute',
    bottom: '15%',
    right: '25%',
    width: '30%',
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2.5,
    transform: [{ rotate: '-20deg' }],
  },
  progressTextContainer: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  correctOption: {
    backgroundColor: '#E1F5E1',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  questionCounter: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});