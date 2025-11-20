import { ref, computed } from "vue";
import { MATRIX_INIT, WINNING_IDXS } from "@/data";

export const useGame = () => {
  const matrix = ref([...MATRIX_INIT]);
  const moveCount = ref(0);

  const calculateWinner = (cell) => {
    for (let i = 0; i < WINNING_IDXS.length; i++) {
      const [a, b, c] = WINNING_IDXS[i];
      if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
        return cell[a];
      }
    }
    return null;
  };

  const isMatrixFull = computed(
    () => !matrix.value.some((cell) => cell.length < 1),
  );
  const isWin = computed(() => calculateWinner(matrix.value));
  const gameOver = computed(() => isWin.value || isMatrixFull.value);

  const makeMove = (idx) => {
    if (idx == null) return;
    matrix.value[idx] = moveCount.value % 2 === 0 ? "X" : "O";
    moveCount.value += 1;
  };

  const resetGame = () => {
    matrix.value = [...MATRIX_INIT];
    moveCount.value = 0;
  };

  return {
    matrix,
    moveCount,
    calculateWinner,
    isMatrixFull,
    isWin,
    gameOver,
    makeMove,
    resetGame,
  };
};
