<template>
   <div class="max-w-7xl mx-auto h-screen w-full flex flex-col">
      <div class="flex flex-col w-full h-full items-center gap-4">
         <div v-for="(row, row_index) in matrix" :key="row_index" class="flex flex-row w-full h-20 items-center justify-between bg-gray-400">
            <div v-for="(col, col_index) in row" :key="col_index" class="bg-red-500 w-20 h-20 p-4 text-center text-3xl" @click="userMove(row_index, col_index)">{{ col[0] }}</div>
         </div>
      </div>
   </div>
</template>
<script setup>
import {ref} from 'vue'

const winningLines = [
   
]

const matrix = ref([
   [[], [], []],
   [[], [], []],
   [[], [], []],
   ])

const moveIdx = ref(1)
function incrementMoveIdx(){
   moveIdx.value ++
}
function userMove(row, col){
   if(moveIdx.value % 2 == 0){
      matrix.value[row][col] = '0'
      incrementMoveIdx()
   } else {
      matrix.value[row][col] = 'x'
      incrementMoveIdx()
   }
}
</script>
