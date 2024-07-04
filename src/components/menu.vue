<template>
   <div v-if="isModal" class="w-full z-40 max-w-7xl mx-auto h-screen flex justify-center items-center flex-col text-white">
      <label for="username" class="text-xl mb-5">Enter your username:</label>
      <input @keydown.enter="handleUsername" v-model="usernameInput" type="text" name="username" id="username" placeholder="username:" class="p-1.5 mb-3 border-none text-black">
      <button @click="handleUsername"
         class="text-xl p-2 border border-white hover:bg-white hover:text-black">Confirm</button>
   </div>
   <div v-else class="w-full max-w-7xl mx-auto h-screen flex justify-center items-center flex-col text-white">
      <h1 class="mb-8 text-2xl">Select game mode:</h1>
      <button @click="router.push('/local')" class="text-xl p-2 border-2 border-white hover:bg-white hover:text-black mb-3">Local game</button>
      <button @click="openModal" class="text-xl p-2 border-2 border-white hover:bg-white hover:text-black">Multiplayer</button>
   </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()

const isModal = ref(false)
const usernameInput = ref('')

function handleUsername(){
   localStorage.setItem('username', usernameInput.value)
   router.push(`/game/${(+new Date()).toString(16)+Math.random()}`)
}

function openModal(){
   const localUsername = localStorage.getItem('username')
   if(localUsername) router.push(`/game/${(+new Date()).toString(16)+Math.random()}`)
   else isModal.value = true
}
</script>

<style>

</style>