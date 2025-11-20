import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWebSocket } from "@vueuse/core";
import { useUserStore } from "@/store/user";
import { defineStore } from "pinia";
import { useGame } from "@/composables/use-game";
import { WINNING_IDXS, MATRIX_INIT } from "@/data";

export const useGameStore = defineStore("game", () => {
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  const { matrix, moveCount, makeMove, resetGame, gameOver, isWin } = useGame();

  const rooms = ref([]);
  const users = ref([]);

  const canMove = computed(() => {
    if (gameOver.value) return false;

    if (userStore.user === users.value[0]) {
      return moveCount.value % 2 == 0;
    } else return moveCount.value % 2 !== 0;
  });

  const getRooms = () => {
    send(
      JSON.stringify({
        method: "rooms",
      }),
    );
  };

  const setConnection = () => {
    send(
      JSON.stringify({
        id: route.params.id,
        username: userStore.user,
        method: "connection",
      }),
    );
  };
  const leave = () => {
    send(
      JSON.stringify({
        method: "leave",
        username: userStore.user,
      }),
    );
  };

  const { send } = useWebSocket(import.meta.env.VITE_SOCKET_URL, {
    heartbeat: {
      interval: 10000,
      message: "ping",
    },
    onConnected: () => console.log("Connected to socket successfully"),
    onMessage: (event, msg) => {
      if (msg.data === "pong") {
        return;
      }

      const parsedData = JSON.parse(msg.data);
      switch (parsedData.method) {
        case "rooms":
          rooms.value = parsedData.lobby;
          break;

        case "connection":
        case "disconnection":
          users.value = parsedData.clients;
          break;

        case "move":
          matrix.value = parsedData.matrix;
          moveCount.value = parsedData.index;
          break;

        case "abort":
          router.push("/");
          break;

        default:
          break;
      }
    },
  });

  const userMove = (idx) => {
    makeMove(idx);
    send(
      JSON.stringify({
        method: "move",
        matrix: matrix.value,
        index: moveCount.value,
        id: route.params.id,
      }),
    );
  };

  const restartGame = () => {
    resetGame();
    userMove();
  };

  const resetGameStore = () => {
    rooms.value = [];
    users.value = [];
    moveCount.value = 1;
    matrix.value = MATRIX_INIT;
  };

  return {
    rooms,
    users,
    moveCount,
    matrix,
    getRooms,
    send,
    setConnection,
    leave,
    resetGameStore,
    restartGame,
    canMove,
    userMove,
    gameOver,
    isWin,
  };
});
