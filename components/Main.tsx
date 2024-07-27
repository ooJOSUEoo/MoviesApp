import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { getNowPlaying } from "@/lib/themoviedb";
import { AnimatedMovieCard } from "./movieCard";
import { Screen } from "./Screen";

export function Main() {
  const [nowMovies, setNowMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getNowPlaying(page).then((movies) => {
      setNowMovies([...nowMovies, ...movies]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Screen>
      {nowMovies.length === 0 ? (
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
          data={nowMovies}
          keyExtractor={(movie: any) => movie.id}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard movie={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
