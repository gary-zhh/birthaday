import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GameContextProvider } from '@/context/GameContext';

export default function GameLayout() {
  useFrameworkReady();

  return (
    <GameContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#FFFAF0' },
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="level1" />
        <Stack.Screen name="level2" />
        <Stack.Screen name="level3" />
        <Stack.Screen name="level4" />
        <Stack.Screen name="level5" />
        <Stack.Screen name="level6" />
        <Stack.Screen name="level7" />
        <Stack.Screen name="final" />
      </Stack>
      <StatusBar style="auto" />
    </GameContextProvider>
  );
}