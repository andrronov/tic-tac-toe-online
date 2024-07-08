import { defineStore } from "pinia";

export const useTicTacStore = defineStore('tictac', {
   state: () => ({
      moveIndex: 1,
      matrix: [
         '', '', '',
         '', '', '',
         '', '', '',
         ],
   }),

   actions: {
      incrementIndex(){
         this.moveIndex ++
      },
      setMatrix(index, symbol){
         this.matrix[index] = symbol
      },
      setWholeMatrix(mat){
         this.matrix = mat
      },
      setMoveIndex(index){
         this.moveIndex = index
      },
   }
})