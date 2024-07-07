import { defineStore } from "pinia";

export const useTicTacStore = defineStore('tictac', {
   state: () => ({
      moveIndex: 1,
      matrix: [
         '', '', '',
         '', '', '',
         '', '', '',
         ],
      arrX: [],
      arrO: []
   }),

   actions: {
      incrementIndex(){
         this.moveIndex ++
      },
      xArrayPush(index){
         this.arrX.push(index)
      },
      oArrayPush(index){
         this.arrO.push(index)
      },
      setMatrix(index, symbol){
         this.matrix[index] = symbol
      },
      setWholeMatrix(mat){
         this.matrix = mat
      },
      setMoveIndex(index){
         this.moveIndex = index
      }
   }
})