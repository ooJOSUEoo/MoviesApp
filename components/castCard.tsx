import { useEffect, useRef, useState } from "react";
import { View, Image, Animated, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { getImageURL } from "@/lib/themoviedb";
import React from "react";
import { MI } from "./Icons";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { env } from "@/env/env";
import { storage } from "@/lib/storage";
const StyledPressable = styled(Pressable);
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : env.androidAppId;
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});
export function CastCard({ cast }: any) {
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
      href={`/cast/${cast?.id}`}
      onPress={() => {
        if (numProb < 0.4 && showAds) {
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
        <View className="">
          <Image
            className="w-24 h-36"
            source={{ uri: getImageURL(cast.profile_path as any) }}
          />
          {cast.adult && (
            <View className="absolute top-0 left-0">
              <MI name="18-up-rating" color="red" />
            </View>
          )}
          <Text className="text-white w-24">{cast.name}</Text>
          <Text className="text-white/50 w-24">{cast.character}</Text>
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedCastCard({ cast, index }: any) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <CastCard cast={cast} />
    </Animated.View>
  );
}
