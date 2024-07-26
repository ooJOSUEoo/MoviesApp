import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { getNowPlaying } from "@/lib/themoviedb";
import { AnimatedMovieCard } from "./movieCard";
import { Screen } from "./Screen";

export function Main() {
  const [nowMovies, setNowMovies] = useState([]);
  useEffect(() => {
    getNowPlaying().then((movies) => {
      setNowMovies(movies);
    });
  }, []);

  return (
    <Screen>
      {nowMovies.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
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
