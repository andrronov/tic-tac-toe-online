<template>
   <div class="w-full max-w-7xl mx-auto h-screen flex justify-between py-2 items-center flex-col text-white">
      <h1>Opened lobbies</h1>
      <table class="table-auto w-full border-2 text-center">
         <thead>
            <tr>
               <th class="px-4 py-2">Host</th>
               <th class="px-4 py-2">Players</th>
               <th class="px-4 py-2"></th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(row, index) in data" :key="index">
               <td class="border px-4 py-2">{{row[0]}}</td>
               <td class="border px-4 py-2">{{row.length}} / 2</td>
               <td @click="playGame(index)" class="border px-4 py-2 hover:bg-white hover:text-black cursor-pointer">Enter</td>
            </tr>
         </tbody>
      </table>

      <div class="flex flex-col items-center gap-3">
         <button @click="router.push('/')" class="p-2 text-white border-2 text-xl border-white hover:bg-gray-800">Start new game</button>
         <button @click="router.push('/')" class="p-1 text-white border border-white hover:bg-gray-800">Back to menu</button>
      </div>
   </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import socket from '../socket/main';

const router = useRouter()
const data = ref(null)

function playGame(index){
   router.push(`/game/${index}`)
}

watchEffect(() => {
   console.log('opened');
   socket.onopen = () => {
      socket.send(JSON.stringify({
         method: 'rooms'
      }))
   }
})

onMounted(() => {
   console.log('mounted');
   socket.onmessage = (event) => {
      let msg = JSON.parse(event.data)
      switch(msg.method){
         case 'rooms':
            console.log(msg);
            data.value = msg.lobby
         break;
      }
   }
})

onBeforeUnmount(() => {
   console.log('closed');
   socket.close()
})
</script>

<style>

</style>