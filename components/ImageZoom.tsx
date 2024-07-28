import { styled } from "nativewind";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { MI } from "./Icons";

export default function ImageZoom({ url, w, h, cN }: any) {
  const StyledPressable = styled(Pressable);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <StyledPressable
        className="active:opacity-70"
        style={{ width: w, height: h }}
        onPress={() => setIsClicked(true)}
      >
        <View>
          <Image
            className={cN}
            source={{ uri: url }}
            style={{ width: w, height: h }}
          />
        </View>
      </StyledPressable>
      {isClicked && (
        <View className="absolute top-0 left-0 z-10 w-full h-full bg-black/90">
          <Pressable
            className="absolute top-0 right-0 z-10 p-3"
            onPress={() => setIsClicked(false)}
          >
            <MI name="close" color="white" size={30} />
          </Pressable>
          <Image
            className={
              cN +
              "  absolute top-[20vh] left-0 transform -translate-x-1/2 -translate-y-1/2"
            }
            source={{ uri: url }}
            style={{ width: `${100}%`, aspectRatio: 1 }}
            resizeMode="contain"
          />
        </View>
      )}
    </>
  );
}
