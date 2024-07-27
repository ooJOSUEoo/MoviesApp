import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { getUpcomingMovies } from "@/lib/themoviedb";
import { Screen } from "@/components/Screen";
import { AnimatedMovieCard } from "@/components/movieCard";

export default function UpComing() {
  const [upComingMovies, setUpComingMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getUpcomingMovies(page).then((movies) => {
      setUpComingMovies([...upComingMovies, ...movies]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Screen>
      {upComingMovies.length === 0 ? (
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
          data={upComingMovies}
          keyExtractor={(movie: any) => movie.id}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard movie={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
