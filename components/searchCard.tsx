import { useEffect, useRef } from "react";
import { View, Image, Animated, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { getImageURL } from "@/lib/themoviedb";
import { MA } from "./Icons";

const StyledPressable = styled(Pressable);

export function SearchCard({ search, callback }: any) {
  return (
    <Link
      href={`/movie/${search.id}`}
      onPress={() => {
        callback(true);
      }}
      asChild
      className="p-1"
    >
      <StyledPressable className="active:opacity-70 mb-2 rounded-xl">
        <View className="flex-row gap-5 justify-between items-center px-5">
          <Image
            className="w-16 h-24"
            source={{ uri: getImageURL(search.poster_path as any) }}
          />
          <Text className="text-white">
            {search.title} {search.adult && <MA name="18-up-rating" />}
          </Text>
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedSearchCard({ search, index, callback }: any) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <SearchCard search={search} callback={callback} />
    </Animated.View>
  );
}
