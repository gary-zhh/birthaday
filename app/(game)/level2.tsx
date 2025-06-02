import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  runOnJS,
  FadeIn
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LevelTitle from '@/components/LevelTitle';
import ProgressBar from '@/components/ProgressBar';
import GiftReveal from '@/components/GiftReveal';
import MusicToggle from '@/components/MusicToggle';

const { width } = Dimensions.get('window');
const PUZZLE_SIZE = 3;
const TILE_SIZE = (width - 48) / PUZZLE_SIZE;
// Replace with your local image file (e.g., card_image.jpg)
const CARD_IMAGE = require('@/assets/images/card_image.jpg');

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  targetPosition: number;
}

export default function Level2() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showingCard, setShowingCard] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const initialPieces: PuzzlePiece[] = [];
    const positions = Array.from({ length: PUZZLE_SIZE * PUZZLE_SIZE }, (_, i) => i);
    
    // Fisher-Yates shuffle
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Create puzzle pieces with shuffled positions
    for (let i = 0; i < PUZZLE_SIZE * PUZZLE_SIZE; i++) {
      initialPieces.push({
        id: i,
        currentPosition: positions[i],
        targetPosition: i
      });
    }

    setPieces(initialPieces);
  };

  const checkCompletion = () => {
    const allCorrect = pieces.every(piece => piece.currentPosition === piece.targetPosition);
    console.log('Puzzle completion check:', allCorrect, pieces);
    
    if (allCorrect && !showingCard) {
      console.log('Puzzle completed! Showing card...');
      setIsComplete(true);
      setTimeout(() => {
        setShowingCard(true);
        setTimeout(() => {
          setShowGift(true);
        }, 2000);
      }, 1000);
    }
  };

  if (imageError) {
    return (
      <View style={styles.container}>
        <MusicToggle />
        <ProgressBar />
        <LevelTitle number={2} title="记忆拼图" />
        <View style={styles.content}>
          <Text style={styles.instructions}>图片加载失败，请检查卡片图片文件</Text>
        </View>
      </View>
    );
  }
  
  // Debug view - shows current positions vs target positions
  const renderDebugInfo = () => (
    <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,255,255,0.7)', padding: 5 }}>
      {pieces.map(piece => (
        <Text key={piece.id} style={{ fontSize: 10 }}>
          {piece.id}: C:{piece.currentPosition} T:{piece.targetPosition}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <MusicToggle />
      <ProgressBar />
      
      <LevelTitle number={2} title="记忆拼图" />
      
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <Text style={styles.instructions}>
          {isComplete 
            ? "拼图完成！让我们看看这张特别的贺卡..."
            : "重组这张贺卡，发现我想对你说的话..."}
        </Text>
        
        <View style={styles.puzzleContainer}>
          {!showingCard ? (
            <View style={styles.puzzleGrid}>
              {pieces.map((piece) => (
                <PuzzlePiece
                  key={piece.id}
                  piece={piece}
                  pieces={pieces}
                  setPieces={setPieces}
                  onComplete={checkCompletion}
                />
              ))}
              {renderDebugInfo()}
            </View>
          ) : (
            <Animated.View 
              style={styles.completedCard}
              entering={FadeIn.duration(1000)}
            >
        <Image 
          source={CARD_IMAGE}
          style={styles.cardImage}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>亲爱的老婆</Text>
                <Text style={styles.cardMessage}>
                  每一天与你在一起，都让我感到无比幸福。你的笑容是我最珍贵的宝藏，
                  你的爱是我生命中最美好的礼物。愿我们的爱情，如这张贺卡一般，
                  永远完整而美丽。
                </Text>
                <Text style={styles.cardSignature}>永远爱你的老公</Text>
              </View>
            </Animated.View>
          )}
        </View>
      </Animated.View>
      
      {showGift && (
        <GiftReveal
          level={2}
          giftName="爱的贺卡"
          giftDescription="一封手写情书，记录着我对你说不完的情话，是时光的见证。"
          nextLevel="level3"
        />
      )}
    </View>
  );
}

function PuzzlePiece({ 
  piece, 
  pieces, 
  setPieces, 
  onComplete 
}: { 
  piece: PuzzlePiece;
  pieces: PuzzlePiece[];
  setPieces: React.Dispatch<React.SetStateAction<PuzzlePiece[]>>;
  onComplete: () => void;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(1);

  const row = Math.floor(piece.currentPosition / PUZZLE_SIZE);
  const col = piece.currentPosition % PUZZLE_SIZE;
  const originalX = col * TILE_SIZE;
  const originalY = row * TILE_SIZE;

  const targetRow = Math.floor(piece.targetPosition / PUZZLE_SIZE);
  const targetCol = piece.targetPosition % PUZZLE_SIZE;

  const gesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.1);
      zIndex.value = 100;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const newRow = Math.floor((originalY + event.translationY + TILE_SIZE / 2) / TILE_SIZE);
      const newCol = Math.floor((originalX + event.translationX + TILE_SIZE / 2) / TILE_SIZE);
      
      if (
        newRow >= 0 && 
        newRow < PUZZLE_SIZE && 
        newCol >= 0 && 
        newCol < PUZZLE_SIZE
      ) {
        const newPosition = newRow * PUZZLE_SIZE + newCol;
        const pieceAtNewPosition = pieces.find(p => p.currentPosition === newPosition);
        
        if (pieceAtNewPosition) {
          setPieces(currentPieces => {
            return currentPieces.map(p => {
              if (p.id === piece.id) {
                return { ...p, currentPosition: newPosition };
              }
              if (p.id === pieceAtNewPosition.id) {
                return { ...p, currentPosition: piece.currentPosition };
              }
              return p;
            });
          });
        }
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      zIndex.value = 1;

      // Check completion after animation
      setTimeout(() => {
        runOnJS(onComplete)();
      }, 300);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    zIndex: zIndex.value,
  }));

  const imageStyle = {
    width: TILE_SIZE * PUZZLE_SIZE,
    height: TILE_SIZE * PUZZLE_SIZE,
    top: -targetRow * TILE_SIZE,
    left: -targetCol * TILE_SIZE,
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.piece,
          {
            width: TILE_SIZE - 2,
            height: TILE_SIZE - 2,
            left: col * TILE_SIZE,
            top: row * TILE_SIZE,
          },
          animatedStyle
        ]}
      >
        <Image
          source={CARD_IMAGE}
          style={[styles.pieceImage, imageStyle]}
          onError={() => console.log("Piece image failed to load")}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
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
  puzzleContainer: {
    width: width - 32,
    height: width - 32,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  puzzleGrid: {
    width: TILE_SIZE * PUZZLE_SIZE,
    height: TILE_SIZE * PUZZLE_SIZE,
    position: 'relative',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  piece: {
    position: 'absolute',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
  },
  pieceImage: {
    position: 'absolute',
  },
  completedCard: {
    width: '90%',
    height: '90%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardImage: {
    width: '100%',
    height: '50%',
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 16,
  },
  cardMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  cardSignature: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-end',
    marginRight: 16,
  },
});
