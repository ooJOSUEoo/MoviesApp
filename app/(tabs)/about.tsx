import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { FA6 } from "../../components/Icons";

import { styled } from "nativewind";
import { Screen } from "../../components/Screen";
import React, { useEffect, useState } from "react";
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

const StyledPressable = styled(Pressable);
export default function About() {
  const [loaded, setLoaded] = useState(false);
  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    keywords: ["fashion", "clothing"],
  });
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    interstitial.load();
    return unsubscribe;
  }, []);
  return (
    <Screen>
      <ScrollView>
        {/* <Link asChild href="/">
          <StyledPressable className={`active:opacity-80`}>
            <FA name="home" />
          </StyledPressable>
        </Link> */}

        <Text className={"text-white font-bold mb-8 text-2xl"}>
          Sobre la aplicación
        </Text>

        <Text className="text-white text-white/90 mb-4">
          Esta es una aplicación para obtener las distintas variedades de
          peliculas traidas de la API de:{" "}
          <Link
            className="font-bold underline"
            href="https://www.themoviedb.org/"
          >
            TMDB
          </Link>
          .
        </Text>

        <Text className="text-white text-white/90 mb-4">
          Creada por:
          <Link
            className="underline"
            asChild
            href="https://github.com/ooJOSUEoo"
          >
            <Text className="text-white font-bold">
              {" "}
              <FA6 name="github" size={24} color="white" /> ooJOSUEoo
            </Text>
          </Link>
        </Text>
      </ScrollView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </Screen>
  );
}
