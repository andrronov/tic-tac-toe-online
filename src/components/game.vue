<template>
   <div class="w-full max-w-7xl mx-auto h-screen flex justify-between py-2 items-center flex-col">
      <div class="w-full flex flex-row items-center justify-around">
         <p class="text-white" v-for="(user, index) in users" :key="index">{{user}}</p>
      </div>
      <p class="text-white">{{ store.moveIndex }}</p>
      <div class="grid grid-cols-3 gap-2 w-full s:w-1/3 max-w-7xl mx-auto h-1/2 justify-center">
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

      <div class="flex flex-col items-center gap-3">
         <button v-if="!isMatrixFull && !isWin" @click="restartGame" class="mt-2 p-1 text-white border border-white hover:bg-gray-800">Restart</button>
         <button @click="router.push('/')" class="mt-2 p-1 text-white border border-white hover:bg-gray-800">Back to menu</button>
      </div>
   </div>
</template>
<script setup>
import {computed, onBeforeUnmount, ref, watch, watchEffect} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useTicTacStore } from '../store/store.js'
import socket from '../socket/main.js'

const route = useRoute()
const router = useRouter()
const store = useTicTacStore()

const users = ref([])
const matrix = ref(store.matrix)
const arrX = ref(store.arrX)
const arrO = ref(store.arrO)
const messages = ref([])

function incrementMoveIdx(){
   store.incrementIndex()
}
function userMoveSocket(){
   // console.log(store.matrix);
   socket.send(JSON.stringify({
         method: 'move',
         matrix: store.matrix,
         index: store.moveIndex,
         id: route.params.id
      }))
}

function userMove(idx){
   const moveIdx = store.moveIndex
   if(moveIdx % 2 == 0){
      store.setMatrix(idx, 'O')
      store.oArrayPush(idx)
      incrementMoveIdx()
      userMoveSocket()
      
   } else {
      store.setMatrix(idx, 'X')
      store.xArrayPush(idx)
      incrementMoveIdx()
      userMoveSocket()
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

watchEffect(() => {
   const localUsername = localStorage.getItem('username')
   if(!localUsername) throw Error('error')
   socket.onopen = () => {
      socket.send(JSON.stringify({
         id: route.params.id,
         username: localUsername,
         method: 'connection'
      }))
   }

   socket.onmessage = (event) => {
      let msg = JSON.parse(event.data)
      console.log(msg);
      switch (msg.method) {
         case 'connection':
            console.log(`User ${msg.username} connected`);
            users.value = msg.clients
            break;
      
         case 'disconnection':
            console.log(`User ${msg.username} disconnected`);
            users.value = msg.clients
            break;

         case 'move':
            store.setWholeMatrix(msg.matrix)
            store.setMoveIndex(msg.index)
            break;

         default:
            break;
      }
   }
})

onBeforeUnmount(() => {
   socket.close()
   // socket.send(JSON.stringify({
   //    method: 'disconnection',
   //    username: localStorage.getItem('username'),
   //    id: route.params.id
   // }))
})
</script>
