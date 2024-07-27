import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { getPopularMovies } from "@/lib/themoviedb";
import { Screen } from "@/components/Screen";
import { AnimatedMovieCard } from "@/components/movieCard";

export default function Popular() {
  const [popularMovies, setPopularMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPopularMovies(page).then((movies) => {
      setPopularMovies([...popularMovies, ...movies]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Screen>
      {popularMovies.length === 0 ? (
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
          data={popularMovies}
          keyExtractor={(movie: any) => movie.id}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard movie={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
