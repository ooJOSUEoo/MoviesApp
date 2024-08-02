import { ActivityIndicator, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { useEffect, useState } from "react";
import { getMoviesGenres } from "@/lib/themoviedb";
import { AnimatedMovieCard } from "@/components/movieCard";
import React from "react";

export default function Genres() {
  const { data, name } = useLocalSearchParams<{
    data: string[];
    name: string;
  }>();
  const [moviesGenres, setMoviesGenres] = useState<any>([]);
  const [page, setPage] = useState(1);
  const id = data?.[0];

  useEffect(() => {
    if (id) {
      getMoviesGenres(id as any, page).then((data) =>
        setMoviesGenres([...moviesGenres, ...data]),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => null,
          headerTitle: (name as string) ?? "...",
          headerRight: () => null,
        }}
      />
      {moviesGenres.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          onEndReached={() => {
            setPage(page + 1);
          }}
          contentContainerStyle={{
            alignItems: "center",
          }}
          className="px-3 pb-3"
          numColumns={3}
          data={moviesGenres}
          keyExtractor={(movie: any, index) => index.toString()}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard movie={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
