import { router, Stack } from "expo-router";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { FA6 } from "../components/Icons";
import { useState } from "react";
import { getSearchMovie } from "@/lib/themoviedb";
import { AnimatedSearchCard } from "@/components/searchCard";

export default function Layout() {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchMovies, setSearchMovies] = useState<any>([]);
  return (
    <View className="relative flex-1 bg-black">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "yellow" },
          statusBarColor: "black",
          headerTintColor: "yellow",
          headerTitle: "",
          headerLeft: () => (
            <View className="flex-row items-center gap-1">
              {!isSearch && (
                <>
                  <FA6 name="film" color="black" />
                  <Text className="text-black">Movies App</Text>
                </>
              )}
            </View>
          ),
          headerRight: () => (
            <>
              {isSearch ? (
                <View className="flex-row items-center gap-3 z-20">
                  <SafeAreaView className="w-10/12">
                    <TextInput
                      focusable
                      autoFocus
                      className="flex-1 border border-gray-400 rounded-full bg-gray-100 p-2 text-gray-600"
                      onChangeText={(text) => {
                        setSearch(text);
                        if (text.length > 2) {
                          getSearchMovie(text).then(setSearchMovies);
                        }
                      }}
                      placeholder="Star wars"
                      onSubmitEditing={() => {
                        setIsSearch(false);
                        setSearch("");
                        router.push(`/search/${search}`);
                      }}
                    />
                  </SafeAreaView>
                  <Pressable
                    className="active:opacity-80"
                    onPress={() => setIsSearch(false)}
                  >
                    <FA6 name="x" color="black" />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => {
                    setIsSearch(true);
                    setSearch("");
                  }}
                >
                  <FA6 name="magnifying-glass" color="black" />
                </Pressable>
              )}
            </>
          ),
        }}
      />
      {search && isSearch && (
        <View className="absolute top-[60px] pt-4 pb-[100px] left-0 z-10 bg-black/90 w-full h-full px-6">
          <FlatList
            data={searchMovies}
            keyExtractor={(movie) => movie.id}
            renderItem={({ item, index }) => (
              <AnimatedSearchCard
                search={item}
                index={index}
                callback={(click: boolean) => {
                  if (click) {
                    setIsSearch(false);
                    setSearch("");
                    setSearchMovies([]);
                  }
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
