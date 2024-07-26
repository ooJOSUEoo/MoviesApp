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
          headerLeft: () => <Text className="text-white">Movies App</Text>,
          headerRight: () => (
            <Link asChild href="/about">
              <Pressable>
                <FA6 name="circle-info" />
              </Pressable>
            </Link>
          ),
        }}
      />
    </View>
  );
}
