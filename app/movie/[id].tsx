import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "../../components/Screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getMovieDetails, getImageURL, getMovieCast } from "@/lib/themoviedb";
import { Score } from "../../components/Score";
import { FA, MI } from "@/components/Icons";
import { AnimatedCastCard } from "@/components/castCard";
import ImageZoom from "@/components/ImageZoom";
import VideoScreen from "@/components/Video";
import React from "react";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [movieInfo, setMovieInfo] = useState<any>(null);
  const [movieCast, setMovieCast] = useState<any>([]);

  useEffect(() => {
    if (id) {
      getMovieDetails(id as unknown as number).then(setMovieInfo);
    }
  }, [id]);
  useEffect(() => {
    if (movieInfo) {
      getMovieCast(id as unknown as number).then(setMovieCast);
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
              <Text className="text-white/70 text-left mb-3 text-base font-bold">
                {movieInfo.title}{" "}
                {movieInfo.adult && <MI name="18-up-rating" color="red" />}
              </Text>
              <Text className="text-white/70 text-left mb-3 text-base">
                <FA name="calendar" /> {movieInfo.release_date}
              </Text>
              <View className="mb-3 flex-1 flex-row flex-wrap justify-around gap-2">
                {movieInfo.genres.map((genre: any, index: number) => (
                  <Text
                    key={index}
                    className=" text-white/70 bg-gray-500 rounded px-2"
                  >
                    {genre.name}
                  </Text>
                ))}
              </View>
              <Text className="text-white/70 text-justify mb-3 px-3 text-base">
                {movieInfo.overview}
              </Text>
              <FlatList
                horizontal
                className=""
                data={movieCast}
                keyExtractor={(cast: any, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <AnimatedCastCard cast={item} index={index} />
                )}
              />
              <View className="w-full h-[1px] bg-gray-500"></View>
              <Text className="text-white/70 text-left mb-3 w-full text-base font-bold">
                Similares
              </Text>
              <View className="w-full h-10 bg-transparent"></View>
              {/* <VideoScreen /> */}
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}
