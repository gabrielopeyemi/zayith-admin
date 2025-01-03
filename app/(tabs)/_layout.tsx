import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "dashboard",
            tabBarIcon: ({ color, focused }) => (
              <Octicons
                name={focused ? "home" : "home"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "products",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name="production-quantity-limits"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "orders",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="rocket1" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "settings",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="setting" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="subscription"
          options={{
            title: "subscription",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
