import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export function VideoYT({ keyYT }: { keyYT: string }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    // if (state === "ended") {
    //   setPlaying(false);
    //   Alert.alert("video has finished playing!");
    // }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View className="">
      <YoutubePlayer
        height={180}
        width={300}
        play={playing}
        videoId={keyYT}
        onChangeState={onStateChange}
        onError={(e) => console.log(e)}
      />
      {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
    </View>
  );
}
