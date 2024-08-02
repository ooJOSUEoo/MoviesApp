import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  RefreshControl,
} from "react-native";
import { getTopRatedMovies } from "@/lib/themoviedb";
import { Screen } from "@/components/Screen";
import { AnimatedMovieCard } from "@/components/movieCard";
import React from "react";
import {
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { env } from "./../../env/env";

const adUnitId = __DEV__ ? TestIds.BANNER : env.androidAppId;
export default function Top() {
  const flatListRef = React.useRef<FlatList>(null);
  const [scrollFlatList, setScrollFlatList] = useState(0);
  const [topMovies, setTopMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await getTopRatedMovies(page);
        setTopMovies((prevMovies: any) => [...prevMovies, ...movies]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const onRefresh = useCallback(() => {
    setPage(1);
    setTopMovies([]);
    setTimeout(() => {
      setScrollFlatList(0);
      getTopRatedMovies(1).then((movies) => setTopMovies(movies));
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
        data={topMovies}
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
      <View className="-ml-9">
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </Screen>
  );
}
