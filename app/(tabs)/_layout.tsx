import { router, Tabs, usePathname } from "expo-router";
import { FA } from "../../components/Icons";
import React, { useEffect, useState } from "react";
import { translateText, useTranslateText } from "@/helpers/translateText";
import { Alert, BackHandler, ToastAndroid } from "react-native";

export default function TabsLayout() {
  const [path, setPath] = useState("");
  const location = usePathname();
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
  }, [path, location]);
  const handleBackButtonPress = () => {
    const dirLocation = location.split("/")[1];
    const alert = async () =>
      Alert.alert(
        await translateText("Si?"),
        await translateText("¿Deseas salir de la aplicación?"),
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
    if (dirLocation === path || dirLocation === "") alert();
    else router.back();
    return true;
  };
  return (
    <Tabs
      screenListeners={({ navigation }) => ({
        tabPress: (e) => {
          setPath(e.target?.split("-")[0] as string);
        },
      })}
      screenOptions={{
        tabBarItemStyle: { paddingBottom: 5 },
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: "/",
          title: useTranslateText("Recientes"),
          tabBarIcon: ({ color }) => <FA name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="popular"
        options={{
          href: "/popular",
          title: useTranslateText("Populares"),
          tabBarIcon: ({ color }) => <FA name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="top"
        options={{
          href: "/top",
          title: useTranslateText("Top"),
          tabBarIcon: ({ color }) => <FA name="trophy" color={color} />,
        }}
      />
      <Tabs.Screen
        name="upComing"
        options={{
          href: "/upComing",
          title: useTranslateText("Próximamente"),
          tabBarIcon: ({ color }) => <FA name="clock-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: "/settings",
          title: useTranslateText("Configuración"),
          tabBarIcon: ({ color }) => <FA name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
