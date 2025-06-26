import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { saveLocal } from "@_/storage/saveLocal";

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: (darkMode: boolean) => void;
}

const darkModeStore = (
  set: (
    partialState:
      | Partial<DarkModeState>
      | ((state: DarkModeState) => Partial<DarkModeState>)
  ) => void
): DarkModeState => ({
  isDarkMode: false,
  toggleDarkMode: (darkMode: boolean) => set(() => ({ isDarkMode: darkMode })),
});


export const useDarkMode = create<DarkModeState>()(
    devtools(
        persist(
            darkModeStore,{
                name: 'Dark_Mode',
                storage: createJSONStorage(()=> saveLocal )
            }
        )
    )
)
