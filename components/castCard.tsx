import { useEffect, useRef } from "react";
import { View, Image, Animated, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { getImageURL } from "@/lib/themoviedb";

const StyledPressable = styled(Pressable);

export function CastCard({ cast }: any) {
  return (
    <Link href={`/cast/${cast.id}`} asChild className="p-1">
      <StyledPressable className="active:opacity-70 mb-2 rounded-xl">
        <View className="">
          <Image
            className="w-24 h-36"
            source={{ uri: getImageURL(cast.profile_path as any) }}
          />
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
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <CastCard cast={cast} />
    </Animated.View>
  );
}
