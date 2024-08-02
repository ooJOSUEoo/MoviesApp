import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  View,
} from "react-native";
import { getNowPlaying } from "@/lib/themoviedb";
import { AnimatedMovieCard } from "./movieCard";
import { Screen } from "./Screen";
import React from "react";

export function Main() {
  const [nowMovies, setNowMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  const flatListRef = React.useRef<FlatList>(null);
  const [scrollFlatList, setScrollFlatList] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await getNowPlaying(page);
        setNowMovies((prevMovies: any) => [...prevMovies, ...movies]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onRefresh = useCallback(() => {
    setPage(1);
    setNowMovies([]);
    setTimeout(() => {
      setScrollFlatList(0);
      getNowPlaying(1).then((movies) => setNowMovies(movies));
    }, 1000);
  }, []);

  return (
    <Screen>
      <FlatList
        onScroll={(event) => {
          setScrollFlatList(event.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
        ref={flatListRef}
        refreshControl={
          <RefreshControl
            colors={["#ffee00"]}
            progressBackgroundColor={"#000"}
            refreshing={false}
            onRefresh={onRefresh}
          />
        }
        onEndReached={() => {
          setPage(page + 1);
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        className="px-3 pb-3"
        numColumns={3}
        data={nowMovies}
        keyExtractor={(movie: any, index) => index.toString()}
        renderItem={({ item, index }) => (
          <AnimatedMovieCard movie={item} index={index} />
        )}
        ListFooterComponent={
          loading ? (
            <View>
              <ActivityIndicator color={"#fff"} size={"large"} />
            </View>
          ) : null
        }
      />
    </Screen>
  );
}
