import { ActivityIndicator, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Screen } from "../../components/Screen";
import { useEffect, useState } from "react";
import { getSearchMovie } from "@/lib/themoviedb";
import { AnimatedMovieCard } from "@/components/movieCard";

export default function Search() {
  const { search } = useLocalSearchParams();
  const [moviesSearch, setMoviesSearch] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (search) {
      getSearchMovie(search as string, page).then((data) =>
        setMoviesSearch([...moviesSearch, ...data]),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => null,
          headerTitle: (search as string) ?? "...",
          headerRight: () => null,
        }}
      />
      {moviesSearch.length === 0 ? (
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
          data={moviesSearch}
          keyExtractor={(movie: any, index) => index.toString()}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard movie={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
