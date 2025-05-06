import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Storage from '@/hooks/handleStorage';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Appearance } from 'react-native';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayouxt() {
  const colorScheme = useColorScheme();
  const { user, fetchUser } = Storage()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    fetchUser();
    if (loaded && user.id) {
      SplashScreen.hideAsync();
      Appearance.setColorScheme(user.lightTheme ? 'light' : 'dark');
    }
  }, [loaded, user]);

  if (!loaded) {
    return null;
  }

  return (

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
        screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="(auth)"/>
          <Stack.Screen name="(tabs)"/>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}
