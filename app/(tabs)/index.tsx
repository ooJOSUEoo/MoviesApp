import React from "react";
import { Main } from "../../components/Main";
import {
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { env } from "./../../env/env";

const adUnitId = __DEV__ ? TestIds.BANNER : env.androidAppId;
export default function Index() {
  return (
    <>
      <Main />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </>
  );
}
