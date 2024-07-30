import { useEffect, useRef } from "react";
import { View, Image, Animated, Pressable, Text } from "react-native";
import { getImageURL } from "@/lib/themoviedb";
import React from "react";

export function ReviewCard({ review }: any) {
  return (
    <View className="bg-amber-300 flex-row gap-5 justify-between items-start px-5 mb-3">
      <View>
        <Image
          className="w-16 h-16 rounded-full"
          source={{
            uri: getImageURL(review.author_details.avatar_path as any),
          }}
        />
        <Text className="text-gray-600 text-left mb-3 text-base">
          {review.created_at.slice(0, 10)}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-black text-left mb-3 text-base font-bold">
          {review.author}
        </Text>
        <Text className="text-black/70 mb-3 text-justify">
          {review.content}
        </Text>
      </View>
    </View>
  );
}

export function AnimatedReviewCard({ review, index, callback }: any) {
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
      <ReviewCard review={review} />
    </Animated.View>
  );
}
