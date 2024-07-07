import { defineStore } from "pinia";

export const useTicTacStore = defineStore('tictac', {
   state: () => ({
      users: []
   }),

   actions: {
      addUser(user){
         this.users.push(user)
      }
   }
})