import { defineStore } from "pinia";

export const useTicTacStore = defineStore('tictac', {
   state: () => ({
      moveIndex: 1
   }),

   actions: {}
})