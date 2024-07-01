<template>
   <div class="w-full max-w-7xl mx-auto h-screen flex justify-center items-center flex-col">
      <div class="grid grid-cols-3 gap-2 w-full max-w-7xl mx-auto h-full justify-center">
         <div v-for="(item, index) in matrix" :key="index" @click="item.length < 1 ? userMove(index) : ''" class="place-self-center w-24 h-24 cursor-pointer text-2xl flex items-center justify-center bg-gray-400">
            {{ item }}
         </div>
      </div>
      <div v-if="isWin" @click="restartGame" class="p-2 border border-white text-white text-xl text-center w-60 cursor-pointer hover:bg-white hover:text-black">
         <p>Winner: {{ isWin }}</p>
         <p>Restart?</p>
      </div>
      <div v-if="isMatrixFull && !isWin" @click="restartGame" class="p-2 border border-white text-white text-xl text-center w-60 cursor-pointer hover:bg-white hover:text-black">
         <p>Draw</p>
         <p>Restart?</p>
      </div>
      
      <button v-if="!isMatrixFull && !isWin" @click="restartGame" class="mt-2 p-1 text-white border border-white hover:bg-gray-800">Restart</button>
   </div>
</template>
<script setup>
import {computed, ref, watch, watchEffect} from 'vue'

const matrix = ref([
   '', '', '',
   '', '', '',
   '', '', '',
   ])
const moveIdx = ref(1)
const arrX = ref([])
const arrO = ref([])

function incrementMoveIdx(){
   moveIdx.value ++
}

function userMove(idx){
   if(moveIdx.value % 2 == 0){
      matrix.value[idx] = '0'
      arrO.value.push(idx)
      incrementMoveIdx()
   } else {
      matrix.value[idx] = 'X'
      arrX.value.push(idx)
      incrementMoveIdx()
   }
}

function calculateWinner(cell){
   const WINNING_IDXS = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
   ]
   for(let i = 0; i < WINNING_IDXS.length; i++){
      const [a, b, c] = WINNING_IDXS[i]
      if(cell[a] && cell[a] === cell[b] && cell[a] === cell[c]){
         return cell[a]
      }
   }
   return null
}

function restartGame(){
   for(let i = 0; i < matrix.value.length; i++) matrix.value[i] = ''
   arrO.value = [], arrX.value = [], moveIdx.value = 1
}

const isWin = computed(() => calculateWinner(matrix.value))
const isMatrixFull = computed(() => {
   for(let i = 0; i < matrix.value.length; i++){
      if(matrix.value[i].length < 1){
         return false
      }
   }
   return true
})
</script>
