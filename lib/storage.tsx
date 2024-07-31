import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval"; // can use anything: IndexedDB, Ionic Storage, etc.
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

// Custom storage object
const s: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    const data = (await AsyncStorage.getItem(name)) || null;

    console.log("data: ", data);
    return data;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await AsyncStorage.removeItem(name);
  },
};

export const storage = create(
  persist(
    (set, get) => ({
      ui: {
        isAdult: null,
        lang: Localization.getLocales()[0].languageTag || "es-ES",
      },

      setIsAdult: (value: boolean) => {
        set((state: any) => ({
          ...state,
          ui: { ...state.ui, isAdult: value },
        }));
      },
      setLang: (value: string) => {
        set((state: any) => ({
          ...state,
          ui: { ...state.ui, lang: value },
        }));
      },
    }),
    {
      name: "food-storage", // unique name
      storage: createJSONStorage(() => s),
    },
  ),
);
