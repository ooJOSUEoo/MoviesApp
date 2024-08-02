import { Link } from "expo-router";
import {
  ScrollView,
  Switch,
  Text,
  View,
  ToastAndroid,
  Alert,
} from "react-native";
import { FA6 } from "../../components/Icons";
import { Screen } from "../../components/Screen";
import React, { useEffect, useState } from "react";
import {
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { env } from "../../env/env";
import { TC } from "@/components/translate";
import { storage } from "@/lib/storage";
import DropDownPicker from "react-native-dropdown-picker";
import { translateText } from "@/helpers/translateText";

const adUnitId = __DEV__ ? TestIds.BANNER : env.bannerAdUnitId;
export default function Settings() {
  const isAdult = storage((s: any) => s.ui.isAdult);
  const lang = storage((s: any) => s.ui.lang);
  const showAds = storage((s: any) => s.ui.showAds);
  const setShowAds = storage((s: any) => s.setShowAds);
  const setIsAdult = storage((s: any) => s.setIsAdult);
  const setLang = storage((s: any) => s.setLang);
  const [open, setOpen] = useState(false);
  const [langValue, setLangValue] = useState(lang);
  useEffect(() => {
    console.log("langValue: ", langValue);
    setLang(langValue);
    const msg = async () => {
      ToastAndroid.show(
        await translateText("Idioma cambiado."),
        ToastAndroid.SHORT,
      );
    };
    msg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langValue]);
  return (
    <Screen>
      <ScrollView>
        <Text className={"text-white font-bold mb-8 text-2xl"}>
          <TC>Configuración</TC>
        </Text>
        <View>
          <Text className="text-white text-white/90 mb-4">
            <TC>Si es mayor de edad puede seleccionar:</TC>
          </Text>
          <Switch
            className="w-20"
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAdult ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(e) => {
              setIsAdult(e);
              if (!e) {
                setShowAds(true);
              }
            }}
            value={isAdult}
          />
          {/* {Platform.OS === "android" && (
            <>
              <Text className="text-white text-white/90 mb-4">
                <TC>Si acepta que la aplicación acceda a su multimedia:</TC>
              </Text>
              <Switch
                className="w-20"
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isAdult ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                // onValueChange={}
                value={PermissionsAndroid.RESULTS.GRANTED === "granted"}
              />
            </>
          )} */}
          <Text className="text-white text-white/90 mb-4">
            <TC>Idioma:</TC>
          </Text>
          <DropDownPicker
            open={open}
            value={langValue}
            items={[
              { label: "Español", value: "es-ES" },
              { label: "Ingles", value: "en-US" },
              { label: "Français", value: "fr-FR" },
              { label: "Deutsch", value: "de-DE" },
              { label: "日本語", value: "ja-JP" },
              { label: "हिन्दी", value: "hi-IN" },
              { label: "Portuguese", value: "pt-PT" },
              { label: "Русский", value: "ru-RU" },
              { label: "中文", value: "zh-CN" },
              { label: "한국어", value: "ko-KR" },
              { label: "Italiano", value: "it-IT" },
              { label: "Nederlands", value: "nl-NL" },
              { label: "Polski", value: "pl-PL" },
              { label: "Norsk", value: "nb-NO" },
              { label: "Norsk bokmål", value: "nb-NO" },
              { label: "Türkçe", value: "tr-TR" },
            ]}
            setOpen={setOpen}
            setValue={setLangValue}
          />
          <Text className="text-white text-white/90 mb-4">
            <TC>Mostrar anuncios:</TC>
          </Text>
          <Switch
            className="w-20"
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={showAds ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={async (e) => {
              if (e === false) {
                Alert.alert(
                  await translateText("¿Estas seguro?"),
                  await translateText("Tengo hambre 😥"),
                  [
                    {
                      text: await translateText("No"),
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: await translateText("Si"),
                      onPress: async () =>
                        Alert.alert(
                          await translateText("¿Deberas?"),
                          await translateText("😥😥😥😥😥😥😥😥😥😥😥😥😥😥😥"),
                          [
                            {
                              text: await translateText("No, es broma. 🤣"),
                              onPress: async () =>
                                ToastAndroid.show(
                                  await translateText("Gracias. 😊"),
                                  ToastAndroid.SHORT,
                                ),
                              style: "cancel",
                            },
                            {
                              text: await translateText("Si 😈"),
                              onPress: async () => {
                                setShowAds(false);
                                ToastAndroid.show(
                                  await translateText(
                                    "Anuncios molestos desactivados 😥, por lo menos te pido que dejes una buen valoration y comentario en la Play Store. 🙁",
                                  ),
                                  ToastAndroid.LONG,
                                );
                              },
                              style: "default",
                            },
                          ],
                        ),
                      style: "default",
                    },
                  ],
                );
              } else {
                setShowAds(true);
                ToastAndroid.show(
                  await translateText("Anuncios activados, gracias. 😀"),
                  ToastAndroid.SHORT,
                );
              }
            }}
            value={showAds}
          />
        </View>

        <Text className={"text-white font-bold mb-8 text-2xl"}>
          <TC>Sobre la aplicación</TC>
        </Text>

        <Text className="text-white text-white/90 mb-4">
          <TC>
            Esta es una aplicación para obtener las distintas variedades de
            peliculas traidas de la API de:
          </TC>{" "}
          <Link
            className="font-bold underline"
            href="https://www.themoviedb.org/"
          >
            TMDB
          </Link>
          .
        </Text>

        <Text className="text-white text-white/90 mb-4">
          <TC>
            Nota: Esta app no permite la descarga y visualización de peliculas
            por derechos legales.
          </TC>
        </Text>

        <Text className="text-white text-white/90 mb-4">
          <TC>Creada por:</TC>
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
