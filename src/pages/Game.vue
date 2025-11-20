<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "@/store/game";
import {
  Button,
  Matrix,
  Cell,
  Waiting,
  GameInfo,
  RootGame,
} from "@/components";

const router = useRouter();
const gameStore = useGameStore();

onMounted(() => {
  gameStore.setConnection();
});

onBeforeUnmount(() => {
  gameStore.leave();
  gameStore.resetGameStore();
});
</script>

<template>
  <Waiting v-if="gameStore.users?.length < 2" />

  <RootGame>
    <template #info>
      <GameInfo :users="gameStore.users" :count="gameStore.moveCount" />
    </template>
    <template #matrix>
      <Matrix>
        <Cell
          :cells="gameStore.matrix"
          :can-move="gameStore.canMove"
          @user-move="(id) => gameStore.userMove(id)"
        />
      </Matrix>
    </template>
    <template #result>
      <Button v-if="gameStore.gameOver" @click="gameStore.restartGame">
        {{ gameStore.isWin ? `Winner is ${gameStore.isWin}` : "Draw" }} <br />
        Restart?
      </Button>
    </template>
    <template #actions>
      <Button
        v-if="!gameStore.gameOver"
        @click="gameStore.restartGame"
        class="mt-2"
      >
        Restart
      </Button>
      <Button @click="router.push({ name: 'lobby' })" class="mt-2">
        Back to lobby
      </Button>
    </template>
  </RootGame>
</template>
