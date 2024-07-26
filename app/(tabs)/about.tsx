import { Link } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { FA, FA6 } from "../../components/Icons";

import { styled } from "nativewind";
import { Screen } from "../../components/Screen";

const StyledPressable = styled(Pressable);

export default function About() {
  return (
    <Screen>
      <ScrollView>
        {/* <Link asChild href="/">
          <StyledPressable className={`active:opacity-80`}>
            <FA name="home" />
          </StyledPressable>
        </Link> */}

        <Text className={"text-white font-bold mb-8 text-2xl"}>
          Sobre la aplicación
        </Text>

        <Text className="text-white text-white/90 mb-4">
          Esta es una aplicación para obtener distanta variedad de peliculas
          traidas de la API de:{" "}
          <Link
            className="font-bold underline"
            href="https://www.themoviedb.org/"
          >
            TMDB
          </Link>
          .
        </Text>

        <Text className="text-white text-white/90 mb-4">
          Creada por:
          <Link
            className="underline"
            asChild
            href="https://github.com/ooJOSUEoo"
          >
            <Text className="text-white font-bold">
              {" "}
              <FA6 name="github" size={24} color="white" /> ooJOSUEoo
            </Text>
          </Link>
        </Text>
      </ScrollView>
    </Screen>
  );
}
