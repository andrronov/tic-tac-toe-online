<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "@/store/game";
import { Button, Table } from "@/components";

const router = useRouter();
const gameStore = useGameStore();

function playGame(index) {
  router.push(`/game/${index}`);
}
function startNewGame() {
  router.push(`/game/${(+new Date()).toString(16) + Math.random()}`);
}

onMounted(() => {
  gameStore.getRooms();
});
</script>

<template>
  <div
    class="w-full max-w-7xl mx-auto h-screen flex justify-between py-2 items-center flex-col text-white"
  >
    <h1>Opened lobbies</h1>
    <Table :rows="gameStore.rooms" @play-game="(id) => playGame(id)" />

    <Button @click="gameStore.getRooms()"> Reload </Button>

    <div class="flex flex-col items-center gap-3">
      <Button @click="startNewGame"> Start new game </Button>
      <Button @click="router.push('/')"> Back to menu </Button>
    </div>
  </div>
</template>
