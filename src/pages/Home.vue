<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { Button } from "@/components";

const router = useRouter();
const userStore = useUserStore();

const isModal = ref(false);
const usernameInput = ref("");

function handleUsername() {
  userStore.logIn(usernameInput.value);
  router.push("/lobby");
}

function openModal() {
  if (userStore.user) router.push("/lobby");
  else isModal.value = true;
}
</script>

<template>
  <div
    v-if="isModal"
    class="w-full z-40 max-w-7xl mx-auto h-screen flex justify-center items-center flex-col text-white"
  >
    <label for="username" class="text-xl mb-5">Enter your username:</label>
    <input
      @keydown.enter="handleUsername"
      v-model="usernameInput"
      type="text"
      name="username"
      placeholder="username:"
      class="p-1.5 mb-3 border-none text-black"
    />
    <Button @click="handleUsername"> Confirm </Button>
  </div>
  <div
    v-else
    class="w-full max-w-7xl mx-auto h-screen flex justify-center items-center flex-col text-white"
  >
    <h1 class="mb-8 text-2xl">Select game mode:</h1>
    <Button @click="router.push({ name: 'local' })"> Local game </Button>
    <Button @click="openModal" class="mt-2"> Multiplayer </Button>
  </div>
</template>

<style></style>
