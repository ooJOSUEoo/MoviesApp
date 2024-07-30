import { storage as appStore } from "@/lib/storage";
import { useState } from "react";
import translate from "translate";
import * as Localization from "expo-localization";

export async function translateText(text: string, from = "es") {
  const lang = Localization.getLocales()[0].languageCode || "es";

  translate.engine = "google";
  const resp = await translate(text, { from: from, to: lang });
  if (text === text.toUpperCase()) {
    return resp.toUpperCase();
  } else if (text === text.toLowerCase()) {
    return resp.toLowerCase();
  } else if (
    text[0] === text[0].toUpperCase() &&
    text.slice(1) === text.slice(1).toLowerCase()
  ) {
    return resp.slice(0, 1).toUpperCase() + resp.slice(1).toLowerCase();
  } else {
    return resp;
  }
}

export function useTranslateText(text: string, from = "es") {
  const [resp, setResp] = useState("");
  const lang = Localization.getLocales()[0].languageCode || "en";
  translate.engine = "google";
  translate(text, { from: from, to: lang }).then((res) => {
    setResp(res);
  });
  if (text === text.toUpperCase()) {
    return resp.toUpperCase();
  } else if (text === text.toLowerCase()) {
    return resp.toLowerCase();
  } else if (
    text[0] === text[0].toUpperCase() &&
    text.slice(1) === text.slice(1).toLowerCase()
  ) {
    return resp.slice(0, 1).toUpperCase() + resp.slice(1).toLowerCase();
  } else {
    return resp;
  }
}
