import { styled } from "nativewind";
import { useState } from "react";
import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  ToastAndroid,
  View,
} from "react-native";
import { MI } from "./Icons";
import React from "react";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";
import { shareAsync } from "expo-sharing";

export default function ImageZoom({ url, w, h, cN, scrollViewRef }: any) {
  const StyledPressable = styled(Pressable);
  const [isClicked, setIsClicked] = useState(false);

  const download = async () => {
    try {
      ToastAndroid.show("Loading...", ToastAndroid.SHORT);
      const name = url.split("/").pop();
      const result = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + name,
      );
      console.log(result);
      save(result.uri, name, result.headers["content-type"]);
      // if (localUri) {
      //   ToastAndroid.show("Downloaded", ToastAndroid.SHORT);

      //   const contentUri = await FileSystem.getContentUriAsync(localUri);
      //   Linking.openURL(contentUri);
      //   console.log(contentUri);
      // }
    } catch (error) {
      console.error("Error downloading or opening the file:", error);
      ToastAndroid.show("Error sharing file", ToastAndroid.SHORT);
    }
  };
  const save = async (uri: string, name: string, type: string) => {
    try {
      // if (Platform.OS === "android") {
      //   const granted = await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //     {
      //       title: "Movie App",
      //       message: "Movie App needs access to your storage ",
      //       buttonNeutral: "Ask Me Later",
      //       buttonNegative: "Cancel",
      //       buttonPositive: "OK",
      //     },
      //   );
      //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //     const downloadsDir = FileSystem.cacheDirectory + "Download/";
      //     await FileSystem.makeDirectoryAsync(downloadsDir, {
      //       intermediates: true,
      //     });
      //     const newUri = downloadsDir + name;
      //     await FileSystem.copyAsync({
      //       from: uri,
      //       to: newUri,
      //     });
      //     // ToastAndroid.show("File saved to Downloads", ToastAndroid.SHORT);
      //     shareAsync(uri);
      //   } else {
      //     console.log("Permission to access storage was denied");
      //     shareAsync(uri);
      //   }
      // } else {
      //   shareAsync(uri);
      // }
      shareAsync(uri);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StyledPressable
        className="active:opacity-70"
        style={{ width: w, height: h }}
        onPress={() => {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
          setIsClicked(true);
        }}
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
          <View>
            <Pressable
              className="absolute top-0 left-1/2 z-10 p-3"
              onPress={download}
            >
              <MI name="share" color="white" size={30} />
            </Pressable>
            <Pressable
              className="absolute top-0 right-0 z-10 p-3"
              onPress={() => setIsClicked(false)}
            >
              <MI name="close" color="white" size={30} />
            </Pressable>
          </View>
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
