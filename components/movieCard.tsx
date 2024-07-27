import { useEffect, useRef } from "react";
import { View, Image, Animated, Pressable } from "react-native";
import { Score } from "./Score";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { getImageURL } from "@/lib/themoviedb";

const StyledPressable = styled(Pressable);

export function MovieCard({ movie }: any) {
  return (
    <Link href={`/movie/${movie.id}`} asChild className="p-1">
      <StyledPressable className="active:opacity-70 mb-2 rounded-xl">
        <View className="relative">
          <Image
            className="w-24 h-36"
            source={{ uri: getImageURL(movie.poster_path as any) }}
          />
          <Score
            cN="absolute top-0 right-0"
            score={movie.vote_average}
            maxScore={10}
          />
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedMovieCard({ movie, index }: any) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <MovieCard movie={movie} />
    </Animated.View>
  );
}
