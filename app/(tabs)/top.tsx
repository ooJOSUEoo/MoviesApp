import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { getTopRatedMovies } from "@/lib/themoviedb";
import { Screen } from "@/components/Screen";
import { AnimatedMovieCard } from "@/components/movieCard";

export default function Top() {
  const [topMovies, setTopMovies] = useState([]);
  useEffect(() => {
    getTopRatedMovies().then((movies) => {
      setTopMovies(movies);
    });
  }, []);

  return (
    <Screen>
      {topMovies.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          contentContainerStyle={{
            alignItems: "center",
          }}
          className="px-3 pb-3"
          numColumns={3}
          data={topMovies}
          keyExtractor={(movie: any) => movie.id}
          renderItem={({ item, index }) => (
            <AnimatedMovieCard movie={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
