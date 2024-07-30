import { router, Stack } from "expo-router";
import {
  Alert,
  BackHandler,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { FA6 } from "../components/Icons";
import { useEffect, useState } from "react";
import { getSearchMovie } from "@/lib/themoviedb";
import { AnimatedSearchCard } from "@/components/searchCard";
import * as Network from "expo-network";
import React from "react";
import { storage } from "@/lib/storage";
import { translateText } from "@/helpers/translateText";

export default function Layout() {
  const [isConnected, setIsConnected] = useState<any>(null);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchMovies, setSearchMovies] = useState<any>([]);
  const isAdult = storage((s: any) => s.ui.isAdult);
  const setIsAdult = storage((s: any) => s.setIsAdult);

  const message =
    "Actualmente tienes 18 años o más?, es posible que esta app muestre contenido adulto.";
  useEffect(() => {
    const checkNetworkStatus = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected);
    };

    checkNetworkStatus();

    Network.getNetworkStateAsync().then((state) => {
      setIsConnected(state.isConnected);

      if (!state.isConnected) {
        Alert.alert("Network Error", "No tiene conexión a Internet", [
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("Cancel Pressed"),
          //   style: "cancel",
          // },
          {
            text: "OK",
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
      }
    });
  }, []);
  useEffect(() => {
    const showAlert = async () => {
      const msg = await translateText(message);
      isAdult === null &&
        // eslint-disable-next-line react-hooks/rules-of-hooks
        Alert.alert("+18", msg, [
          {
            text: "No",
            style: "cancel",
            onPress: () => setIsAdult(false),
          },
          {
            text: "Si",
            style: "default",
            onPress: () => setIsAdult(true),
          },
        ]);
    };
    showAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdult]);

  return (
    <View className="relative flex-1 bg-black">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "yellow" },
          statusBarColor: "black",
          headerTintColor: "yellow",
          headerTitle: "",
          headerLeft: () => (
            <View className="flex-row items-center gap-1">
              {!isSearch && (
                <>
                  <FA6 name="film" color="black" />
                  <Text className="text-black">Movie App</Text>
                </>
              )}
            </View>
          ),
          headerRight: () => (
            <>
              {isSearch ? (
                <View className="flex-row items-center gap-3 z-20">
                  <SafeAreaView className="w-10/12">
                    <TextInput
                      focusable
                      autoFocus
                      className="flex-1 border border-gray-400 rounded-full bg-gray-100 p-2 text-gray-600"
                      onChangeText={(text) => {
                        const textTrim = text.trim();
                        setSearch(textTrim);
                        if (textTrim.length > 2) {
                          getSearchMovie(textTrim).then(setSearchMovies);
                        }
                      }}
                      placeholder="Star wars"
                      onSubmitEditing={() => {
                        setIsSearch(false);
                        setSearch("");
                        router.push(`/search/${search}`);
                      }}
                    />
                  </SafeAreaView>
                  <Pressable
                    className="active:opacity-80"
                    onPress={() => setIsSearch(false)}
                  >
                    <FA6 name="x" color="black" />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => {
                    setIsSearch(true);
                    setSearch("");
                  }}
                >
                  <FA6 name="magnifying-glass" color="black" />
                </Pressable>
              )}
            </>
          ),
        }}
      />
      {/* {isConnected === null ? (
        <></>
      ) : isConnected ? (
        <Text className="text-white">Connected</Text>
      ) : (
        <Text>No internet connection</Text>
      )} */}
      {search && isSearch && (
        <View className="absolute top-[60px] pt-4 pb-[100px] left-0 z-10 bg-black/90 w-full h-full px-6">
          <FlatList
            data={searchMovies}
            keyExtractor={(movie) => movie.id}
            renderItem={({ item, index }) => (
              <AnimatedSearchCard
                search={item}
                index={index}
                callback={(click: boolean) => {
                  if (click) {
                    setIsSearch(false);
                    setSearch("");
                    setSearchMovies([]);
                  }
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
