import { Link, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { FA6 } from "../components/Icons";

export default function Layout() {
  return (
    <View className="flex-1 bg-black">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "yellow",
          headerTitle: "",
          headerLeft: () => (
            <View className="flex-row items-center gap-1">
              <FA6 name="film" />
              <Text className="text-white">Movies App</Text>
            </View>
          ),
          headerRight: () => (
            <Link asChild href="/about">
              <Pressable>
                <FA6 name="magnifying-glass" />
              </Pressable>
            </Link>
          ),
        }}
      />
    </View>
  );
}
