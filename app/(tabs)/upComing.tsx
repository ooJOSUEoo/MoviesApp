import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  RefreshControl,
} from "react-native";
import { getUpcomingMovies } from "@/lib/themoviedb";
import { Screen } from "@/components/Screen";
import { AnimatedMovieCard } from "@/components/movieCard";
import React from "react";
import {
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
} from "react-native-google-mobile-ads";
import { env } from "./../../env/env";

const adUnitId = __DEV__ ? TestIds.BANNER : env.androidAppId;
const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

export default function UpComing() {
  // const [loaded, setLoaded] = useState(false);
  AppOpenAd.createForAdRequest(adUnitId, {
    keywords: ["fashion", "clothing"],
  });
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        // setLoaded(true);
      },
    );

    interstitial.load();
    return unsubscribe;
  }, []);
  const flatListRef = React.useRef<FlatList>(null);
  const [scrollFlatList, setScrollFlatList] = useState(0);
  const [upComingMovies, setUpComingMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await getUpcomingMovies(page);
        setUpComingMovies((prevMovies: any) => [...prevMovies, ...movies]);
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
    setUpComingMovies([]);
    setTimeout(() => {
      setScrollFlatList(0);
      getUpcomingMovies(1).then((movies) => setUpComingMovies(movies));
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
        data={upComingMovies}
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
