import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Music, Music as MusicOff } from 'lucide-react-native';
import { useGameContext } from '@/context/GameContext';

export default function MusicToggle() {
  const { backgroundMusic, toggleBackgroundMusic } = useGameContext();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={toggleBackgroundMusic}
      accessibilityLabel={backgroundMusic ? '关闭音乐' : '开启音乐'}
    >
      {backgroundMusic ? (
        <Music size={24} color="#FFB6C1" />
      ) : (
        <MusicOff size={24} color="#FFB6C1" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});