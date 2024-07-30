import { Tabs } from "expo-router";

import { FA } from "../../components/Icons";
import React from "react";
import { useTranslateText } from "@/helpers/translateText";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: { paddingBottom: 5 },
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: useTranslateText("Recientes"),
          tabBarIcon: ({ color }) => <FA name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="popular"
        options={{
          title: useTranslateText("Populares"),
          tabBarIcon: ({ color }) => <FA name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="top"
        options={{
          title: useTranslateText("Top"),
          tabBarIcon: ({ color }) => <FA name="trophy" color={color} />,
        }}
      />
      <Tabs.Screen
        name="upComing"
        options={{
          title: useTranslateText("Próximamente"),
          tabBarIcon: ({ color }) => <FA name="clock-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <FA name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
