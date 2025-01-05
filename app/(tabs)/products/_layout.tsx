import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import React from "react";
import GlobalHeader from "@/components/headers/GlobalHeader";
// import LoginScreen from './LoginScreen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      {/* Use string for the name of the screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      {/* <Stack.Screen name="edit" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
