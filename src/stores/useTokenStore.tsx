import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { saveLocal } from "@_/storage/saveLocal";

interface TokenState {
  token: string;
  setToken: (token: string) => void;
  auth: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const tokenStore = (
  set: (
    partialState:
      | Partial<TokenState>
      | ((state: TokenState) => Partial<TokenState>)
  ) => void
): TokenState => ({
  token: "",
  setToken: (token: string) => set(() => ({ token })),
  auth: false,
  setAuthenticated: (auth: boolean) => set(() => ({ auth })),
});

export const useTokenStore = create<TokenState>()(
  devtools(
    persist(tokenStore, {
      name: "Token",
      storage: createJSONStorage(() => saveLocal),
    })
  )
);
