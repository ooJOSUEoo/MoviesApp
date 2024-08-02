import { useEffect, useRef, useState } from "react";
import { View, Image, Animated, Pressable } from "react-native";
import { Score } from "./Score";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { getImageURL } from "@/lib/themoviedb";
import { MI } from "./Icons";
import React from "react";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { env } from "@/env/env";
import { storage } from "@/lib/storage";
const StyledPressable = styled(Pressable);
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : env.interstitialAdUnitId;
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});
export function MovieCard({ movie }: any) {
  const [loaded, setLoaded] = useState(false);
  const numProb = Math.random();
  const showAds = storage((s: any) => s.ui.showAds);
  useEffect(() => {
    if (numProb < 0.4 && showAds) {
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          setLoaded(true);
        },
      );
      interstitial.load();
      return unsubscribe;
    }
  }, [numProb, showAds]);
  return (
    <Link
      href={`/movie/${movie.id}`}
      onPress={() => {
        if (numProb < 0.4 && showAds) {
          console.log("interstitial", numProb);
          try {
            interstitial.show();
          } catch (error) {
            console.log(error);
          }
        }
      }}
      asChild
      className="p-1"
    >
      <StyledPressable className="active:opacity-70 mb-2 rounded-xl">
        <View className="relative">
          <Image
            className="w-24 h-36"
            source={{ uri: getImageURL(movie.poster_path as any) }}
          />
          <Score
            cN="absolute top-0 right-0"
            score={movie.vote_average}
            maxScore={10}
          />
          {movie.adult && (
            <View className="absolute top-0 left-0">
              <MI name="18-up-rating" color="red" />
            </View>
          )}
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedMovieCard({ movie, index }: any) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: 1 * 20,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <MovieCard movie={movie} />
    </Animated.View>
  );
}
