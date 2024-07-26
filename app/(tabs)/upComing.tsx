import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { getUpcomingMovies } from "@/lib/themoviedb";
import { Screen } from "@/components/Screen";
import { AnimatedMovieCard } from "@/components/movieCard";

export default function UpComing() {
  const [upComingMovies, setUpComingMovies] = useState([]);
  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setUpComingMovies(movies);
    });
  }, []);

  return (
    <Screen>
      {upComingMovies.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
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
