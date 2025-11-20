<script setup>
import { onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useGame } from "@/composables/use-game";
import { Button, Matrix, Cell, RootGame, GameInfo } from "@/components";

const router = useRouter();

const { matrix, moveCount, makeMove, resetGame, gameOver, isWin } = useGame();

onBeforeUnmount(() => {
  resetGame();
});
</script>

<template>
  <RootGame>
    <template #info>
      <GameInfo :count="moveCount" />
    </template>
    <template #matrix>
      <Matrix>
        <Cell
          :cells="matrix"
          :can-move="!gameOver"
          @user-move="(idx) => makeMove(idx)"
        />
      </Matrix>
    </template>
    <template #result>
      <Button v-if="gameOver" @click="resetGame">
        {{ isWin ? `Winner is ${isWin}` : "Draw" }} <br />
        Restart?
      </Button>
    </template>
    <template #actions>
      <Button v-if="!gameOver" @click="resetGame" class="mt-2">
        Restart
      </Button>
      <Button @click="router.push({ name: 'main' })" class="mt-2">
        Back to menu
      </Button>
    </template>
  </RootGame>
</template>
