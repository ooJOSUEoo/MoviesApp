import React, { useCallback } from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export function VideoYT({ keyYT }: { keyYT: string }) {
  const onStateChange = useCallback((state: any) => {
    // if (state === "ended") {
    //   setPlaying(false);
    //   Alert.alert("video has finished playing!");
    // }
  }, []);

  return (
    <View className="">
      <YoutubePlayer
        height={180}
        width={300}
        play={false}
        videoId={keyYT}
        onChangeState={onStateChange}
        onError={(e) => console.log(e)}
      />
    </View>
  );
}
