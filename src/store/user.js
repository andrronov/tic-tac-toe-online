import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const user = useSessionStorage("user", null);

  const logIn = (data) => {
    user.value = data;
  };
  const logOut = () => {
    user.value = null;
  };

  return {
    user,
    logIn,
    logOut,
  };
});
