import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "../../components/Screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  getCastDetails,
  getImageURL,
  getMoviesFromCast,
} from "@/lib/themoviedb";
import { FA, MCI, MI } from "@/components/Icons";
import { AnimatedMovieCard } from "@/components/movieCard";
import ImageZoom from "@/components/ImageZoom";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [castInfo, setCastInfo] = useState<any>(null);
  const [moviesCast, setMoviesCast] = useState<any>([]);

  useEffect(() => {
    if (id) {
      getCastDetails(id as unknown as number).then(setCastInfo);
    }
  }, [id]);
  useEffect(() => {
    if (castInfo) {
      getMoviesFromCast(id as unknown as number).then(setMoviesCast);
    }
  }, [id, castInfo]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => null,
          headerTitle: castInfo?.name ?? "...",
          headerRight: () => null,
        }}
      />
      <View>
        {castInfo === null ? (
          <ActivityIndicator color={"#fff"} size={"large"} />
        ) : (
          <ScrollView>
            <View className="relative justify-center items-center text-center">
              <ImageZoom
                cN="rounded"
                url={getImageURL(castInfo.profile_path)}
                w={100}
                h={150}
              />
              <Text className="text-white/70 text-left mb-3 text-base font-bold">
                {castInfo.name}{" "}
                {castInfo.adult && <MI name="18-up-rating" color="red" />}
              </Text>
              <Text className="text-white/70 text-left mb-3 text-base">
                <FA name="calendar" /> {castInfo.birthday}
              </Text>
              {castInfo.deathday && (
                <Text className="text-white/70 text-left mb-3 text-base">
                  <MCI name="grave-stone" /> {castInfo.deathday}
                </Text>
              )}
              <Text className="text-white/70 text-justify mb-3 px-3 text-base">
                {castInfo.biography}
              </Text>
              <FlatList
                horizontal
                className=" pb-5"
                data={moviesCast}
                keyExtractor={(movie: any, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <AnimatedMovieCard movie={item} index={index} />
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}
