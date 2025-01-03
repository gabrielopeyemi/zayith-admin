import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import GlobalHeader from "@/components/GlobalHeader";
// import LoginScreen from './LoginScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={({ route }) => ({
        header: () => (
          <GlobalHeader
            title={route.name === "index" ? "Home" : route.name}
            isRoot={route.name === "index"}
          />
        ),
      })}
    >
      {/* Use string for the name of the screen */}
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]"  />
    </Stack>
  );
}
