import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import { getPopularMovies } from "@/lib/themoviedb";
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

export default function Popular() {
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
      <View className="-ml-2">
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
