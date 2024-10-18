import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StoreProvider } from '@/store/context';

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ir: require('../assets/fonts/Inter/static/Inter-Regular.ttf'),
    im: require('../assets/fonts/Inter/static/Inter-Medium.ttf'),
    ib: require('../assets/fonts/Inter/static/Inter-Bold.ttf'),
    isb: require('../assets/fonts/Inter/static/Inter-SemiBold.ttf'),
    // sr: require('../assets/fonts/sf-pro/SFPRODISPLAYREGULAR.OTF'),
    // sr: require('../assets/fonts/sf-pro/SFPRODISPLAYBLACKITALIC.OTF'),
    // sm: require('../assets/fonts/sf-pro/SFPRODISPLAYMEDIUM.OTF'),
    // sb: require('../assets/fonts/sf-pro/SFPRODISPLAYBOLD.OTF'),
    // ssb: require('../assets/fonts/sf-pro/SFPRODISPLAYSEMIBOLDITALIC.OTF'),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || !loaded) {
    return <SplashScreen />;
  }

  return (
    <StoreProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="protected" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </StoreProvider>
  );
}
