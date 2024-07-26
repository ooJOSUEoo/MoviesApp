import { Tabs } from "expo-router";

import { FA } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recientes",
          tabBarIcon: ({ color }) => <FA name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="popular"
        options={{
          title: "Populares",
          tabBarIcon: ({ color }) => <FA name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="top"
        options={{
          title: "Top",
          tabBarIcon: ({ color }) => <FA name="trophy" color={color} />,
        }}
      />
      <Tabs.Screen
        name="upComing"
        options={{
          title: "Proximamente",
          tabBarIcon: ({ color }) => <FA name="clock-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Info",
          tabBarIcon: ({ color }) => <FA name="info" color={color} />,
        }}
      />
    </Tabs>
  );
}
