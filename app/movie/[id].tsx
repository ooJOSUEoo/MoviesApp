import {
  ActivityIndicator,
  Clipboard,
  FlatList,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Screen } from "../../components/Screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  getMovieDetails,
  getImageURL,
  getMovieCast,
  getMovieVideos,
  getSimilarMovies,
} from "@/lib/themoviedb";
import { Score } from "../../components/Score";
import { FA, MI } from "@/components/Icons";
import { AnimatedCastCard } from "@/components/castCard";
import ImageZoom from "@/components/ImageZoom";
import React from "react";
import { AnimatedMovieCard } from "@/components/movieCard";
import { VideoYT } from "@/components/Video";

export default function Detail() {
  const { id }: any = useLocalSearchParams();
  const [movieInfo, setMovieInfo] = useState<any>(null);
  const [movieCast, setMovieCast] = useState<any>(null);
  const [movieVideos, setMovieVideos] = useState<any>(null);
  const [movieSimilars, setMovieSimilars] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getMovieDetails(id as unknown as number).then(setMovieInfo);
    }
  }, [id]);
  useEffect(() => {
    if (movieInfo && id) {
      getMovieCast(id).then(setMovieCast);
      getSimilarMovies(id).then(setMovieSimilars);
      getMovieVideos(id).then(setMovieVideos);
    }
  }, [id, movieInfo]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => null,
          headerTitle: movieInfo?.title ?? "...",
          headerRight: () => null,
        }}
      />
      <View>
        {movieInfo === null ? (
          <ActivityIndicator color={"#fff"} size={"large"} />
        ) : (
          <ScrollView>
            <View className="relative justify-center items-center text-center">
              <ImageZoom
                cN="mb-4 rounded"
                url={getImageURL(movieInfo.backdrop_path)}
                w={`${100}%`}
                h={180}
              />
              <ImageZoom
                cN="rounded -mt-20"
                url={getImageURL(movieInfo.poster_path)}
                w={100}
                h={150}
              />
              <Score cN="" score={movieInfo.vote_average} maxScore={10} />
              <Text
                onLongPress={() => {
                  Clipboard.setString(movieInfo.title);
                  ToastAndroid.show("Copiado", ToastAndroid.SHORT);
                }}
                className="text-white/70 text-left mb-3 text-base font-bold"
              >
                {movieInfo.title}{" "}
                {movieInfo.adult && <MI name="18-up-rating" color="red" />}
              </Text>
              <Text className="text-white/70 text-left mb-3 text-base">
                <FA name="calendar" /> {movieInfo.release_date}
              </Text>
              <View className="mb-3 flex-1 flex-row flex-wrap justify-around gap-2">
                {movieInfo.genres.map((genre: any, index: number) => (
                  <Link
                    key={index}
                    href={`/movie/genre/${genre.id}?name=${genre.name}`}
                    className=" text-white/70 bg-gray-500 rounded px-2"
                  >
                    {genre.name}
                  </Link>
                ))}
              </View>
              <Text
                onLongPress={() => {
                  Clipboard.setString(movieInfo.overview);
                  ToastAndroid.show("Copiado", ToastAndroid.SHORT);
                }}
                className="text-white/70 text-justify mb-3 px-3 text-base"
              >
                {movieInfo.overview}
              </Text>
              <Text className="text-white/70 text-left mb-3 w-full text-base font-bold">
                Videos
              </Text>
              {/* <VideoYT key="" /> */}
              {movieVideos === null ? (
                <ActivityIndicator color={"#fff"} size={"large"} />
              ) : (
                <FlatList
                  horizontal
                  className=""
                  data={movieVideos}
                  keyExtractor={(video: any, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View className="border-[1px] border-r-gray-500 px-1">
                      <VideoYT keyYT={item.key ?? ""} />
                    </View>
                  )}
                />
              )}
              <Text className="text-white/70 text-left mb-3 w-full text-base font-bold">
                Reparto
              </Text>
              {movieCast === null ? (
                <ActivityIndicator color={"#fff"} size={"large"} />
              ) : (
                <FlatList
                  horizontal
                  className=""
                  data={movieCast}
                  keyExtractor={(cast: any, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <AnimatedCastCard cast={item} index={index} />
                  )}
                />
              )}
              <View className="w-full h-[1px] bg-gray-500"></View>
              <Text className="text-white/70 text-left mb-3 w-full text-base font-bold">
                Similares
              </Text>
              {movieSimilars === null ? (
                <ActivityIndicator color={"#fff"} size={"large"} />
              ) : (
                <FlatList
                  horizontal
                  className=""
                  data={movieSimilars}
                  keyExtractor={(movie: any, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <AnimatedMovieCard movie={item} index={index} />
                  )}
                />
              )}
              <View className="w-full h-10 bg-transparent"></View>
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}
