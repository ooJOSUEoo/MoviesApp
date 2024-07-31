import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  Alert,
  ToastAndroid,
} from "react-native";
import { getNowPlaying } from "@/lib/themoviedb";
import { AnimatedMovieCard } from "./movieCard";
import { Screen } from "./Screen";
import React from "react";
import { translateText, useTranslateText } from "@/helpers/translateText";

export function Main() {
  const [nowMovies, setNowMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getNowPlaying(page).then((movies) => {
      setNowMovies([...nowMovies, ...movies]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const flatListRef = React.useRef<FlatList>(null);
  const [scrollFlatList, setScrollFlatList] = useState(0);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return handleBackButtonPress();
      },
    );
    return () => {
      backHandler.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollFlatList]);
  const onRefresh = useCallback(() => {
    setPage(1);
    setNowMovies([]);
    setTimeout(() => {
      setScrollFlatList(0);
      getNowPlaying(1).then((movies) => setNowMovies(movies));
    }, 1000);
  }, []);
  const handleBackButtonPress = () => {
    if (scrollFlatList > 0) {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      setTimeout(() => {
        onRefresh();
      }, 400);
      return true;
    } else {
      const alert = async () =>
        Alert.alert(
          await translateText("Si?"),
          await translateText("¿Deseas cerrar la aplicación?"),
          [
            {
              text: await translateText("No"),
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: await translateText("Si"),
              style: "default",
              onPress: async () => {
                ToastAndroid.show(
                  await translateText("Adios"),
                  ToastAndroid.SHORT,
                );
                BackHandler.exitApp();
              },
            },
          ],
        );
      alert();
      return true;
    }
  };

  return (
    <Screen>
      {nowMovies.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          onScroll={(event) => {
            setScrollFlatList(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          ref={flatListRef}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
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
        />
      )}
    </Screen>
  );
}
